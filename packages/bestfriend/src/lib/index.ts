export { site, navLinks, platforms } from './site';
export { devices, deviceBySlug, faq, type Device, type FaqItem } from './devices';
export { featureGroups, type FeatureGroup } from './features';
export { reviews, type Review } from './reviews';
export { appRating, type Rating } from './rating';
export { companionApps, companionAppsSlug, type CompanionApp } from './companionApps';
export {
	seo,
	homeSchema,
	deviceSchema,
	deviceDocs,
	deviceTitle,
	docSchema,
	ldJsonTag,
} from './seo';
export {
	docs,
	docBySlug,
	docsBySection,
	docsForDevice,
	docSections,
	docTitle,
	type Doc,
	type DocSection,
} from './docs';

export { default as CallToAction } from './components/CallToAction.svelte';
export { default as Compatibility } from './components/Compatibility.svelte';
export { default as Faq } from './components/Faq.svelte';
export { default as FeatureBand } from './components/FeatureBand.svelte';
export { default as FeatureGrid } from './components/FeatureGrid.svelte';
export { default as DocsNav } from './components/DocsNav.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as PhoneFan } from './components/PhoneFan.svelte';
export { default as PhoneFrame } from './components/PhoneFrame.svelte';
export { default as PhoneShot } from './components/PhoneShot.svelte';
export { default as Platforms } from './components/Platforms.svelte';
export { default as Reviews } from './components/Reviews.svelte';
export { default as Seo } from './components/Seo.svelte';
export { default as StickyBar } from './components/StickyBar.svelte';
export { default as StoreBadges } from './components/StoreBadges.svelte';
export { default as VideoFacade } from './components/VideoFacade.svelte';
