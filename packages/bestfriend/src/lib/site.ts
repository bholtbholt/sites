export const site = {
	name: 'Best Friend',
	domain: 'https://epbf.app',
	email: 'feedback@epbf.app',
	bugs: 'bugs@epbf.app',
	developer: 'Brian Holt',
	developerUrl: 'https://brianholt.ca',
	appStoreUrl: 'https://apps.apple.com/app/best-friend/id6782250723',
	substackUrl: 'https://epbf.substack.com',
	instagramUrl: 'https://www.instagram.com/badbadpower',
	betaFormUrl: 'https://forms.gle/jvMsX5sYRAZZVqPu7',
	youtubeId: 'X7Qb79Qyd0E',
	cableGuideUrl: 'https://www.instagram.com/reel/DawLuoiuV6X',
} as const;

export const navLinks = [
	{ href: '/support', label: 'Support' },
	{ href: '/privacy', label: 'Privacy' },
] as const;

export const devices = [
	{ name: 'EP-133', sub: 'K.O. II' },
	{ name: 'EP-40', sub: 'Riddim' },
	{ name: 'EP-1320', sub: 'Medieval' },
] as const;

export const platforms = ['iPhone', 'iPad', 'Mac'] as const;
