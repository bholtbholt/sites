import { site, platforms } from './site';
import { featureGroups } from './features';
import { faq, type FaqItem } from './faq';
import type { Doc } from './docs';

export const seo = {
	title: `${site.name} — MIDI Chord Controller for iPhone & iPad`,
	description:
		'A MIDI chord controller for iPhone and iPad. Play chords, inversions and clock-synced arpeggios on any synth, app or DAW from one key. Velocity, modulation, custom chords.',
	image: `${site.domain}/og-image.png`,
	imageAlt: `${site.name} on iPad: a twelve-key keyboard with a major seventh chord held and chord buttons beside it`,
} as const;

const url = (path = '') => `${site.domain}${path}`;

const person = {
	'@type': 'Person',
	'@id': url('/#developer'),
	name: site.developer,
	url: site.developerUrl,
};

const website = {
	'@type': 'WebSite',
	'@id': url('/#website'),
	url: url('/'),
	name: site.name,
	description: seo.description,
	inLanguage: 'en',
	publisher: { '@id': url('/#developer') },
};

const bestFriend = {
	'@type': 'SoftwareApplication',
	'@id': `${site.bestFriendUrl}/#app`,
	name: site.bestFriendName,
	url: site.bestFriendUrl,
	applicationCategory: 'MultimediaApplication',
};

/** The block answer engines and Google read to decide what Mother MIDI *is*. */
const application = {
	'@type': 'SoftwareApplication',
	'@id': url('/#app'),
	name: site.storeName,
	// The unbranded phrasings people actually type before they know the name.
	alternateName: [
		'MIDI chord controller for iPhone',
		'iPad MIDI chord controller',
		'chord MIDI app',
	],
	description: seo.description,
	url: url('/'),
	applicationCategory: 'MultimediaApplication',
	applicationSubCategory: 'Music',
	operatingSystem: `iOS ${site.minOs}, iPadOS ${site.minOs}`,
	softwareRequirements: `iOS ${site.minOs} or iPadOS ${site.minOs} or later. Sends MIDI only; requires a MIDI instrument, app, or DAW to make sound.`,
	availableOnDevice: platforms.join(', '),
	image: seo.image,
	featureList: featureGroups.flatMap((group) => group.items),
	author: { '@id': url('/#developer') },
	publisher: { '@id': url('/#developer') },
	downloadUrl: site.appStoreUrl,
	installUrl: site.appStoreUrl,
	offers: {
		'@type': 'Offer',
		price: site.price,
		priceCurrency: site.priceCurrency,
		availability: 'https://schema.org/InStock',
		url: site.appStoreUrl,
		category: 'One-time purchase, universal across iPhone and iPad',
	},
	sameAs: [site.appStoreUrl],
	isRelatedTo: { '@id': bestFriend['@id'] },
};

const faqPage = (id: string, questions: readonly FaqItem[]) => ({
	'@type': 'FAQPage',
	'@id': id,
	mainEntity: questions.map((item) => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: { '@type': 'Answer', text: item.a },
	})),
});

export const homeSchema = () => ({
	'@context': 'https://schema.org',
	'@graph': [person, website, application, bestFriend, faqPage(url('/#faq'), faq)],
});

/**
 * Every doc is a TechArticle. Google retired HowTo rich results in 2023, and a HowTo
 * without a `step` array is incomplete markup, so it would validate worse for no gain.
 */
export const docSchema = (doc: Doc) => {
	const docUrl = url(`/docs/${doc.slug}`);

	return {
		'@context': 'https://schema.org',
		'@graph': [
			person,
			website,
			{
				'@type': 'TechArticle',
				'@id': `${docUrl}#article`,
				url: docUrl,
				name: doc.title,
				headline: doc.title,
				description: doc.summary,
				inLanguage: 'en',
				author: { '@id': url('/#developer') },
				publisher: { '@id': url('/#developer') },
				isPartOf: { '@id': url('/#website') },
				about: { '@id': url('/#app') },
				mainEntityOfPage: docUrl,
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${docUrl}#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: site.name, item: url('/') },
					{ '@type': 'ListItem', position: 2, name: 'Guides', item: url('/docs') },
					{ '@type': 'ListItem', position: 3, name: doc.title, item: docUrl },
				],
			},
			application,
		],
	};
};

/**
 * Renders a complete ld+json script tag. Built here rather than in the component because
 * a literal closing script tag inside a .svelte file confuses the template parser.
 * Escaping `<` also stops a stray closing tag in future copy breaking out of the block.
 */
export const ldJsonTag = (schema: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
