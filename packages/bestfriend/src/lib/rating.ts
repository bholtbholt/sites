import { site } from './site';

export type Rating = { value: number; count: number };

type LookupResult = { averageUserRating?: number; userRatingCount?: number };

/**
 * The App Store's aggregate rating, summed across the storefronts in `site.reviewStorefronts`.
 *
 * Apple only exposes ratings per country, so a worldwide figure would mean one request per
 * storefront — ~175 of them, during every build. We ask the top five instead and add
 * `site.ratingPadding` to stand in for the rest, so the total tracks App Store Connect.
 *
 * The homepage is prerendered, so this runs at build time and the result is baked into the
 * HTML. That keeps the visible number and the `aggregateRating` in the JSON-LD identical,
 * which is what makes the markup legitimate. Any failure falls back to `site.fallbackRating`
 * rather than throwing — a rate-limited Apple should not fail a deploy.
 */
export async function appRating(fetch: typeof globalThis.fetch): Promise<Rating> {
	const lookups = await Promise.allSettled(
		site.reviewStorefronts.map(async (country) => {
			const response = await fetch(
				`https://itunes.apple.com/lookup?id=${site.appId}&country=${country}`,
			);
			if (!response.ok) throw new Error(`${country}: HTTP ${response.status}`);
			const body: { results?: LookupResult[] } = await response.json();
			return body.results?.[0] ?? {};
		}),
	);

	let ratings = 0;
	let weighted = 0;

	for (const lookup of lookups) {
		if (lookup.status === 'rejected') {
			console.warn('[rating] storefront lookup failed:', lookup.reason);
			continue;
		}
		const { averageUserRating, userRatingCount } = lookup.value;
		if (!averageUserRating || !userRatingCount) continue;
		ratings += userRatingCount;
		weighted += averageUserRating * userRatingCount;
	}

	if (ratings === 0) {
		console.warn('[rating] no storefront returned ratings, using the fallback');
		return site.fallbackRating;
	}

	// The count is padded to stand in for the storefronts we don't ask; the average is not,
	// since it stays a real weighted mean of the ratings we actually read.
	return {
		value: Math.round((weighted / ratings) * 10) / 10,
		count: ratings + site.ratingPadding,
	};
}
