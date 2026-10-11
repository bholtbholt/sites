/**
 * Fixes up links in markdown-rendered pages.
 *
 * mdsvex hardcodes `rehype-external-links` with `{ target: false, rel: ['nofollow'] }`, so
 * every external link comes out nofollowed and opening in the current tab. External links
 * here open in a new tab with `noopener noreferrer`, and `nofollow` is dropped for our own URLs.
 */

// Prefix-matched, not host-matched: `apps.apple.com` hosts everyone's listings, so only our
// own listing should lose the nofollow. Keep in step with src/lib/site.ts.
const OWN_URLS = [
	'https://apps.apple.com/app/mother-midi/',
	'https://epbf.app',
	'https://brianholt.ca',
];

const SITE = 'https://mothermidi.app';

const isExternal = (href) => /^https?:\/\//i.test(href) && !href.startsWith(SITE);

const isOurs = (href) => OWN_URLS.some((own) => href.startsWith(own));

function visit(node, onElement) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'element') onElement(node);
	for (const child of node.children ?? []) visit(child, onElement);
}

export function rehypeLinks() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.tagName !== 'a') return;

			const href = node.properties?.href;
			if (typeof href !== 'string') return;

			if (!isExternal(href)) return;

			// `external` matches what the Svelte components already hand-write, so every
			// external link on the site carries the same rel regardless of how it was authored.
			const rel = ['external', 'noopener', 'noreferrer'];
			if (!isOurs(href)) rel.push('nofollow');

			node.properties.target = '_blank';
			node.properties.rel = rel;
		});
	};
}
