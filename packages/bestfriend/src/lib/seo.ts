import { site, platforms } from './site';
import { featureGroups } from './features';
import { devices, faq, type Device, type FaqItem } from './devices';

export const seo = {
	// Leads with the brand, then the query people actually type. Long enough to truncate
	// in a SERP, but the visible head is the part that matters.
	title: `${site.name} — Companion App for Teenage Engineering EP-133, EP-40 & EP-1320`,
	description:
		'The unrivalled companion app for Teenage Engineering EP-133, EP-40 and EP-1320 samplers. Edit samples, split stems, manage pads, back up projects. iPhone, iPad and Mac.',
	image: `${site.domain}/og-image.png`,
	imageAlt: `${site.name} running on iPhone next to a Teenage Engineering EP-Series sampler pad editor`,
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

/**
 * The app itself. This is the block AI answer engines and Google both read to decide
 * what Best Friend *is*, so it carries the full feature list rather than a summary.
 */
const application = {
	'@type': 'SoftwareApplication',
	'@id': url('/#app'),
	name: site.storeName,
	alternateName: [site.name, `${site.name} for Teenage Engineering EP-Series`],
	description: seo.description,
	url: url('/'),
	applicationCategory: 'MultimediaApplication',
	applicationSubCategory: 'Music',
	operatingSystem: `iOS ${site.minOs}, iPadOS ${site.minOs}, macOS ${site.minOs}`,
	softwareRequirements: `iOS ${site.minOs}, iPadOS ${site.minOs}, or macOS ${site.minOs} or later. Mac requires Apple silicon (M1 or later). Requires a Teenage Engineering EP-133 K.O. II, EP-40 Riddim, or EP-1320 Medieval connected by USB-C data cable.`,
	availableOnDevice: platforms.join(', '),
	image: seo.image,
	screenshot: [
		url('/screenshot-pads.png'),
		url('/screenshot-bank.png'),
		url('/screenshot-edit.png'),
	],
	featureList: featureGroups.flatMap((group) => group.items),
	author: { '@id': url('/#developer') },
	publisher: { '@id': url('/#developer') },
	downloadUrl: site.appStoreUrl,
	installUrl: site.appStoreUrl,
	// No aggregateRating: the App Store has too few ratings for one to mean anything yet.
	offers: {
		'@type': 'Offer',
		price: site.price,
		priceCurrency: site.priceCurrency,
		availability: 'https://schema.org/InStock',
		url: site.appStoreUrl,
		category: 'One-time purchase, universal across iPhone, iPad, and Mac',
	},
	sameAs: [site.appStoreUrl, site.instagramUrl, site.substackUrl],
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

// Google requires uploadDate for video rich results, so the block is omitted until
// site.youtubeUploadDate is filled in rather than shipped invalid.
const video = () =>
	site.youtubeUploadDate
		? [
				{
					'@type': 'VideoObject',
					'@id': url('/#video'),
					name: site.youtubeTitle,
					description: seo.description,
					uploadDate: site.youtubeUploadDate,
					thumbnailUrl: `https://i.ytimg.com/vi/${site.youtubeId}/maxresdefault.jpg`,
					embedUrl: `https://www.youtube-nocookie.com/embed/${site.youtubeId}`,
					contentUrl: `https://www.youtube.com/watch?v=${site.youtubeId}`,
					publisher: { '@id': url('/#developer') },
				},
			]
		: [];

export const homeSchema = () => ({
	'@context': 'https://schema.org',
	'@graph': [
		person,
		website,
		application,
		faqPage(url('/#faq'), faq),
		...video(),
		{
			'@type': 'ItemList',
			'@id': url('/#devices'),
			name: 'Supported Teenage Engineering samplers',
			itemListElement: devices.map((device, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: device.full,
				url: url(`/${device.slug}`),
			})),
		},
	],
});

export const deviceSchema = (device: Device) => ({
	'@context': 'https://schema.org',
	'@graph': [
		person,
		website,
		{
			'@type': 'WebPage',
			'@id': url(`/${device.slug}#page`),
			url: url(`/${device.slug}`),
			name: deviceTitle(device),
			description: device.description,
			isPartOf: { '@id': url('/#website') },
			about: { '@id': url('/#app') },
			primaryImageOfPage: seo.image,
		},
		{
			'@type': 'BreadcrumbList',
			'@id': url(`/${device.slug}#breadcrumb`),
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: site.name, item: url('/') },
				{ '@type': 'ListItem', position: 2, name: device.full, item: url(`/${device.slug}`) },
			],
		},
		application,
		faqPage(url(`/${device.slug}#faq`), device.faq),
	],
});

export const deviceTitle = (device: Device) =>
	`${site.name} — Teenage Engineering ${device.full} Companion App`;

/**
 * Renders a complete ld+json script tag. Built here rather than in the component because
 * a literal closing script tag inside a .svelte file confuses the template parser.
 * Escaping `<` also stops a stray closing tag in future copy breaking out of the block.
 */
export const ldJsonTag = (schema: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
