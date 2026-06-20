export const site = {
	name: 'Best Friend',
	domain: 'https://epbf.app',
	email: 'hello@brianholt.ca',
	developer: 'Brian Holt',
	developerUrl: 'https://brianholt.ca',
	betaUrl: 'https://forms.gle/jvMsX5sYRAZZVqPu7',
	tagline: 'The companion app for Teenage Engineering EP-Series samplers.',
	disclaimer:
		'Best Friend is not affiliated with, endorsed by, or sponsored by Teenage Engineering. EP-133, EP-1320, EP-40, and related names are trademarks of their respective owners. This app does not include any copyrighted material from Teenage Engineering.',
	privacyUpdated: 'June 2026',
} as const;

export const navLinks = [
	{ href: '/support', label: 'Support' },
	{ href: '/privacy', label: 'Privacy' },
] as const;
