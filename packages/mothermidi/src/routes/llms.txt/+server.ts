import { docsBySection } from '$lib/docs';
import { faq } from '$lib/faq';
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

${site.name} is a MIDI chord controller for iPhone and iPad, built by ${site.developer}. Hold a chord button and touch one of twelve root keys, and it sends the whole chord — or an arpeggio of it, locked to incoming MIDI clock — to any connected synth, app, or DAW. It makes no sound of its own. It began as the chord controller inside ${site.bestFriendName} (${site.bestFriendUrl}), the companion app for Teenage Engineering EP-Series samplers. It is a one-time purchase of $${site.price} ${site.priceCurrency}, universal across iPhone and iPad.

## Platforms and requirements

- Runs on ${platforms.join(' and ')}. One App Store purchase covers both.
- Requires iOS ${site.minOs} or iPadOS ${site.minOs} or later.
- Sends MIDI only. Needs a MIDI instrument, app, or DAW to make sound.
- Connects to a Mac DAW over a cable with Inter-Device Audio and MIDI (IDAM), enabled in Audio MIDI Setup.
- Collects no personal data. Nothing is transmitted off the device except MIDI to destinations you connect.

## Features

${featureGroups
	.map(
		(group) =>
			`### ${group.title}\n\n${group.blurb}\n\n${group.items.map((item) => `- ${item}`).join('\n')}`,
	)
	.join('\n\n')}

## Guides

The full text of every guide is available at ${site.domain}/llms-full.txt.

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

- [Home](${site.domain}/): overview and screenshots
- [Guides](${site.domain}/docs): documentation
- [Full documentation text](${site.domain}/llms-full.txt): every guide in one file
- [Support](${site.domain}/support): contact and bug reports
- [Privacy](${site.domain}/privacy): privacy policy
- [App Store](${site.appStoreUrl}): download for iPhone and iPad
- [${site.bestFriendName}](${site.bestFriendUrl}): companion app for Teenage Engineering EP-Series samplers, by the same developer

## Contact

- General: ${site.email}
- Bugs: ${site.bugs}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
