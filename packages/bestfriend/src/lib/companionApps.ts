import { site } from './site';

/**
 * The apps surveyed on /docs/ep-series-companion-apps, for the ItemList on that page.
 *
 * Deliberately only name, URL, and platform — the things that do not change month to month.
 * Features and prices live in the page's own table, where a human maintains them against a
 * dated "accurate as of" line. Asserting a competitor's feature set or price in structured
 * data is a claim we cannot keep current, so we do not make it.
 */
export type CompanionApp = {
	name: string;
	url: string;
	/** Omitted for Best Friend, which references the site's own app node instead. */
	self?: boolean;
};

// Same order as the page: ours first, then the others as the comparison table lists them.
export const companionApps: readonly CompanionApp[] = [
	{ name: site.storeName, url: site.appStoreUrl, self: true },
	{ name: 'EP Sample Tool', url: 'https://teenage.engineering/apps/ep-sample-tool' },
	{
		name: 'Cornerman for K.O. II',
		url: 'https://apps.apple.com/app/cornerman-for-k-o-ii/id6499280264',
	},
	{ name: 'EP-PatchStudio', url: 'https://apps.apple.com/app/ep-patchstudio/id6778625335' },
	{ name: 'PunchKit', url: 'https://apps.apple.com/app/id6785249847' },
] as const;

/** The doc whose ItemList this feeds. Keeps the slug in one place. */
export const companionAppsSlug = 'ep-series-companion-apps';
