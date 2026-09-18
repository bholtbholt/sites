import { site, platforms } from './site';
import { featureGroups } from './features';
import { devices, faq, type Device, type FaqItem } from './devices';
import { docsForDevice, type Doc } from './docs';
import { companionApps, companionAppsSlug } from './companionApps';

export const seo = {
	// Leads with the brand, then the query people actually type. Long enough to truncate
	// in a SERP, but the visible head is the part that matters.
	title: `${site.name} — Companion App for Teenage Engineering EP-133, EP-40 & EP-1320`,
	description:
		'The unrivalled companion app for Teenage Engineering EP-133, EP-40 and EP-1320 samplers. See your Scenes, bounce real stems, edit samples, back up projects. iPhone, iPad, Mac, and Android.',
	image: `${site.domain}/og-image.png`,
	imageAlt: `${site.name} running on a phone next to a Teenage Engineering EP-Series sampler pad editor`,
} as const;

const url = (path = '') => `${site.domain}${path}`;

const person = {
	'@type': 'Person',
	'@id': url('/#developer'),
	name: site.developer,
	url: site.developerUrl,
};

/**
 * A node per sampler. The app node used to name the hardware only in prose, which left an
 * answer engine assembling "apps for the EP-133" with nothing structured to match against —
 * so it reached for App Store listings, which *are* modelled as products. These nodes, plus
 * `isAccessoryOrSparePartFor` on the app below, state the relationship outright.
 */
const hardware = devices.map((device) => ({
	'@type': 'Product',
	'@id': url(`/#${device.slug}`),
	name: device.full,
	alternateName: [device.name, `Teenage Engineering ${device.full}`],
	category: 'Sampler',
	brand: { '@type': 'Brand', name: 'Teenage Engineering' },
	sameAs: [device.productUrl],
}));

const hardwareRefs = devices.map((device) => ({ '@id': url(`/#${device.slug}`) }));

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
	// The unbranded phrasings people actually type. Someone searching "ep-133 app" is not
	// searching for us by name — they cannot, they do not know the name yet.
	alternateName: [
		site.name,
		`${site.name} for Teenage Engineering EP-Series`,
		'EP-133 app',
		'EP-133 K.O. II companion app',
		'EP-40 app',
		'EP-1320 app',
	],
	description: seo.description,
	url: url('/'),
	applicationCategory: 'MultimediaApplication',
	applicationSubCategory: 'Music',
	operatingSystem: `iOS ${site.minOs}, iPadOS ${site.minOs}, macOS ${site.minOs}, Android ${site.minAndroid}`,
	softwareRequirements: `iOS ${site.minOs}, iPadOS ${site.minOs}, or macOS ${site.minOs} or later, or Android ${site.minAndroid} or later. Mac requires Apple silicon (M1 or later); Android requires USB OTG support. Requires a Teenage Engineering EP-133 K.O. II, EP-40 Riddim, or EP-1320 Medieval connected by USB-C data cable.`,
	availableOnDevice: platforms.join(', '),
	image: seo.image,
	screenshot: [
		url('/screenshot-pads.png'),
		url('/screenshot-scenes.png'),
		url('/screenshot-bounce.png'),
	],
	featureList: featureGroups.flatMap((group) => group.items),
	author: { '@id': url('/#developer') },
	publisher: { '@id': url('/#developer') },
	downloadUrl: [site.appStoreUrl, site.playStoreUrl],
	installUrl: [site.appStoreUrl, site.playStoreUrl],
	// No aggregateRating: the stores have too few ratings for one to mean anything yet.
	offers: {
		'@type': 'Offer',
		price: site.price,
		priceCurrency: site.priceCurrency,
		availability: 'https://schema.org/InStock',
		url: [site.appStoreUrl, site.playStoreUrl],
		category:
			'One-time purchase per store, universal across iPhone, iPad, and Mac, and across your Android devices',
	},
	sameAs: [site.appStoreUrl, site.playStoreUrl, site.instagramUrl, site.substackUrl],
	isAccessoryOrSparePartFor: hardwareRefs,
	about: hardwareRefs,
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
		...hardware,
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
			mainEntity: { '@id': url(`/#${device.slug}`) },
			primaryImageOfPage: seo.image,
		},
		...hardware.filter((node) => node['@id'] === url(`/#${device.slug}`)),
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

/**
 * Every doc is a TechArticle. HowTo was the obvious alternative for the step-by-step pages,
 * but Google retired HowTo rich results in 2023, and a HowTo without a `step` array is
 * incomplete markup — so it would validate worse while gaining nothing. Each doc also gets
 * a breadcrumb and points at the app and the hardware, so the pages reinforce the same
 * entity relationships rather than floating free of them.
 */
export const docSchema = (doc: Doc) => {
	const docUrl = url(`/docs/${doc.slug}`);
	const mentioned = doc.devices.map((slug) => ({ '@id': url(`/#${slug}`) }));

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
				dateModified: doc.updated,
				author: { '@id': url('/#developer') },
				publisher: { '@id': url('/#developer') },
				isPartOf: { '@id': url('/#website') },
				about: { '@id': url('/#app') },
				mentions: mentioned,
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
			// The question the page answers, marked up as such. Docs are written around a
			// single searched question, so this is an honest FAQPage rather than padding.
			faqPage(`${docUrl}#faq`, [{ q: doc.question, a: doc.summary }]),
			application,
			...hardware.filter((node) => mentioned.some((ref) => ref['@id'] === node['@id'])),
			// The landscape page's whole purpose is to put Best Friend in the same set as the
			// other EP-Series apps, which is exactly what an ItemList states outright. Best
			// Friend points at the existing app node rather than being redefined here.
			...(doc.slug === companionAppsSlug
				? [
						{
							'@type': 'ItemList',
							'@id': `${docUrl}#apps`,
							name: 'Companion apps for the Teenage Engineering EP-Series',
							itemListOrder: 'https://schema.org/ItemListUnordered',
							itemListElement: companionApps.map((app, i) => ({
								'@type': 'ListItem',
								position: i + 1,
								item: app.self
									? { '@id': url('/#app') }
									: { '@type': 'SoftwareApplication', name: app.name, url: app.url },
							})),
						},
					]
				: []),
		],
	};
};

/** Docs relevant to a device page, for the "How to" block. */
export const deviceDocs = (device: Device) => docsForDevice(device.slug);

export const deviceTitle = (device: Device) =>
	`${site.name} — Teenage Engineering ${device.full} Companion App`;

/**
 * Renders a complete ld+json script tag. Built here rather than in the component because
 * a literal closing script tag inside a .svelte file confuses the template parser.
 * Escaping `<` also stops a stray closing tag in future copy breaking out of the block.
 */
export const ldJsonTag = (schema: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
