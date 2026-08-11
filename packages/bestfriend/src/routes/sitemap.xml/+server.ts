import { devices } from '$lib/devices';
import { site } from '$lib/site';

export const prerender = true;

// Prerendered, so lastmod is the build date — accurate for a static marketing site
// that only changes when it is redeployed.
const lastmod = new Date().toISOString().slice(0, 10);

const paths = [
	{ path: '', priority: '1.0' },
	...devices.map((device) => ({ path: `/${device.slug}`, priority: '0.8' })),
	{ path: '/support', priority: '0.5' },
	{ path: '/privacy', priority: '0.3' },
];

export function GET() {
	const urls = paths
		.map(
			({ path, priority }) =>
				`\t<url>\n\t\t<loc>${site.domain}${path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t\t<priority>${priority}</priority>\n\t</url>`,
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } },
	);
}
