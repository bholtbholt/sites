import { devices, faq } from '$lib/devices';
import { docsBySection } from '$lib/docs';
import { featureGroups } from '$lib/features';
import { site, platforms } from '$lib/site';
import { seo } from '$lib/seo';

export const prerender = true;

// Generated from the same data the pages render, so it can never drift out of sync
// with the site. Format follows the llms.txt convention: H1, summary blockquote,
// then linked sections.
export function GET() {
	const body = `# ${site.name}

> ${seo.description}

${site.name} (App Store listing: "${site.storeName}") is the unrivalled companion app for Teenage Engineering EP-Series hardware samplers, built by ${site.developer}. It connects to the sampler over a USB-C data cable and gives you a full-screen editor for pads and samples, a Scene and Song timeline with note and fader automation lanes, multi-track audio stem bouncing straight off the hardware, a MIDI controller keyboard with chords and an arpeggiator, stem splitting, multi-sample building, and a Library of backups, Bank Snapshots, and bounces, synced by iCloud on Apple devices. It is a one-time purchase of $${site.price} ${site.priceCurrency} per store: one App Store purchase covers iPhone, iPad, and Mac, and one Google Play purchase covers your Android devices. It is not affiliated with, endorsed by, or sponsored by Teenage Engineering.

## Supported hardware

${devices.map((device) => `- **${device.full}** (${site.domain}/${device.slug}): ${device.description}`).join('\n')}

## Platforms and requirements

- Runs on ${platforms.join(', ')}. One App Store purchase is universal across iPhone, iPad, and Mac; one Google Play purchase covers your Android devices. The two storefronts are separate purchases, and both support family sharing.
- Requires iOS ${site.minOs}, iPadOS ${site.minOs}, or macOS ${site.minOs} or later, or Android ${site.minAndroid} or later. Mac requires Apple silicon (M1 or later); Android requires USB OTG support.
- Requires a wired connection to the sampler: a USB-C to USB-C data cable. Charge-only cables do not work.
- On a Lightning iPhone or iPad, requires an MFi-certified Lightning to USB adapter with a USB-IF certified USB-A to USB-C cable.
- Collects no personal data. Nothing is transmitted off the device.

## Features

${featureGroups
	.map(
		(group) =>
			`### ${group.title}\n\n${group.blurb}\n\n${group.items.map((item) => `- ${item}`).join('\n')}`,
	)
	.join('\n\n')}

## Device-specific capabilities

${devices
	.map(
		(device) =>
			`### ${device.full}\n\n${device.highlights.map((h) => `- **${h.title}**: ${h.body}`).join('\n')}`,
	)
	.join('\n\n')}

## Guides

Task-based documentation. The full text of every guide is available at ${site.domain}/llms-full.txt.

${docsBySection()
	.map(
		(group) =>
			`### ${group.section}\n\n${group.items
				.map((doc) => `- [${doc.title}](${site.domain}/docs/${doc.slug}): ${doc.summary}`)
				.join('\n')}`,
	)
	.join('\n\n')}

## FAQ

${faq.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n')}

## Links

- [Home](${site.domain}/): overview, screenshots, and demo video
${devices.map((device) => `- [${device.full}](${site.domain}/${device.slug}): what ${site.name} does for the ${device.full}`).join('\n')}
- [Guides](${site.domain}/docs): task-based documentation
- [Full documentation text](${site.domain}/llms-full.txt): every guide in one file
- [Support](${site.domain}/support): contact and bug reports
- [Privacy](${site.domain}/privacy): privacy policy
- [App Store](${site.appStoreUrl}): download for iPhone, iPad, and Mac
- [Google Play](${site.playStoreUrl}): download for Android
- [Dev blog](${site.substackUrl}): development updates
- [Demo video](https://www.youtube.com/watch?v=${site.youtubeId}): ${site.youtubeTitle}

## Contact

- General: ${site.email}
- Bugs: ${site.bugs}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
