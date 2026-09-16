export const site = {
	name: 'Best Friend',
	// The App Store listing name. Differs from the display name and carries the ASO
	// keywords, so schema.org and the OG tags should use it rather than the short name.
	storeName: 'Best Friend for K.O. II',
	storeSubtitle: 'App for EP-133, EP-40, EP-1320',
	domain: 'https://epbf.app',
	email: 'feedback@epbf.app',
	bugs: 'bugs@epbf.app',
	developer: 'Brian Holt',
	developerUrl: 'https://brianholt.ca',
	appId: '6782250723',
	appStoreUrl: 'https://apps.apple.com/app/best-friend/id6782250723',
	androidPackage: 'com.studio133.bestfriend',
	playStoreUrl: 'https://play.google.com/store/apps/details?id=com.studio133.bestfriend',
	price: '9.99',
	priceCurrency: 'USD',
	// Minimum OS across the Apple platforms. Apple ships them in lockstep, so one number
	// covers iOS, iPadOS, and macOS. Android versions its own way, hence the separate number.
	minOs: '26',
	minAndroid: '12',
	substackUrl: 'https://epbf.substack.com',
	instagramUrl: 'https://www.instagram.com/badbadpower',
	youtubeUrl: 'https://www.youtube.com/@badbadpower',
	betaFormUrl: 'https://forms.gle/jvMsX5sYRAZZVqPu7',
	youtubeId: 'X7Qb79Qyd0E',
	youtubeTitle:
		'Introducing Best Friend: The Teenage Engineering EP-133, EP-40, and EP-1320 Companion App',
	youtubeUploadDate: '2026-08-02',
	cableGuideUrl: 'https://www.instagram.com/reel/DawLuoiuV6X',
} as const;

export const navLinks = [
	{ href: '/support', label: 'Support' },
	{ href: '/privacy', label: 'Privacy' },
] as const;

export const platforms = ['iPhone', 'iPad', 'Mac', 'Android'] as const;
