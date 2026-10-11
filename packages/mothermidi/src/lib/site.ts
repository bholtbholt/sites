export const site = {
	name: 'Mother MIDI',
	// The App Store listing name. Kept separate so schema.org and the OG tags can follow the
	// listing if it ever picks up ASO keywords the display name does not carry.
	storeName: 'Mother MIDI',
	domain: 'https://mothermidi.app',
	// Shared with Best Friend: one developer, one inbox.
	email: 'feedback@epbf.app',
	bugs: 'bugs@epbf.app',
	developer: 'Brian Holt',
	developerUrl: 'https://brianholt.ca',
	appId: '6820820347',
	appStoreUrl: 'https://apps.apple.com/app/mother-midi/id6820820347',
	price: '6.99',
	priceCurrency: 'USD',
	minOs: '26',
	bestFriendName: 'Best Friend',
	bestFriendUrl: 'https://epbf.app',
} as const;

export const navLinks = [
	{ href: '/docs', label: 'Guides' },
	{ href: '/support', label: 'Support' },
	{ href: '/privacy', label: 'Privacy' },
] as const;

export const platforms = ['iPhone', 'iPad'] as const;
