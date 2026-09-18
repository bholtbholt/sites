/**
 * Verbatim App Store reviews. Copy is quoted exactly as written, including the emoji and
 * the German ones — an edited review is not a review, and the schema.org `review` nodes
 * built from these in seo.ts have to match what the page shows.
 */
export type Review = {
	title: string;
	body: string;
	author: string;
	/** ISO, for <time datetime> and `datePublished`. */
	date: string;
	rating: number;
	/** Only set when the review is not in English. */
	lang?: string;
};

export const reviews: readonly Review[] = [
	{
		title: 'A must have for the K.O.II',
		body: "If you like your K.O.II, you will love this App!! It helps to unlock the full potential of the machine and gives you creative control of it's features. The App is so well made and the constant upgrades make it a big bang for the buck!! It doesn't track you data, but will elevate your workflow and creativity working with the K.O.II!! Get it - you'll never regret it!! :)",
		author: 'Patpuls',
		date: '2026-09-16',
		rating: 5,
	},
	{
		title: 'Exactly What We Needed',
		body: 'This app breathes new life into the ko ii. I already loved it but now this app has got me beat making nonstop. I especially love the chord production feature (which has always been my weakness). This app is definitely worth it!',
		author: '@bopgun28',
		date: '2026-09-13',
		rating: 5,
	},
	{
		title: 'Unbelievably easy to use',
		body: 'All things are thought out carefully and enormously helpful. This just became my favorite sampler of all time',
		author: 'MusicProf1234',
		date: '2026-09-12',
		rating: 5,
	},
	{
		title: 'Absolutely amazing!',
		body: 'This app is a game changer for the EP-133 K.O. II. It makes working with the device so much easier and more enjoyable. The chord builder alone is fantastic, but the whole app is incredibly well designed and thought out. You can really feel how much love and effort went into making this. Thank you so much to the developer for creating such an amazing companion for the K.O. II! If you own an EP-133, you absolutely need this app. Highly recommended! ❤️',
		author: 'Val-chachvadze',
		date: '2026-08-31',
		rating: 5,
	},
	{
		title: 'Very Good!',
		body: 'Amazing App, keeps getting better with every update!',
		author: 'HOTP1CKLE',
		date: '2026-09-04',
		rating: 5,
	},
	{
		title: 'Great app for my KO II',
		body: 'Fantastic app to help editing and managing samples on my KO II',
		author: 'kamrerekman',
		date: '2026-08-26',
		rating: 5,
	},
	{
		title: 'Amazing',
		body: 'Such a gift!',
		author: 'DanZaiMusic',
		date: '2026-09-11',
		rating: 5,
	},
	{
		title: 'Genial',
		body: "Tolles Tool für den EP-133. Das wertet das Gerät noch ein paar Stufen höher auf mit den vielen Funtionen. Kein Abo, braucht kein Internet, besser geht's nicht. (So etwas bräuchte ich auch für den OP-XY 😉) Dankeschön an Brian. 🙏",
		author: '100nano',
		date: '2026-08-13',
		rating: 5,
		lang: 'de',
	},
	{
		title: 'Amazing app!',
		body: 'This is gem for ep 133 owners. I love chopping and editing samples. And visuals of my samples!',
		author: 'White_Bear_6446',
		date: '2026-08-13',
		rating: 5,
	},
	{
		title: 'Works great!',
		body: 'Very happy to not have to have a laptop nearby to make adjustments to the ko2!',
		author: 'fuenciso_',
		date: '2026-07-08',
		rating: 5,
	},
	{
		title: 'Super!',
		body: 'Diese App verändert echt stark wie man mit den EPs umgeht und behebt viele Kopfzerbrechen.',
		author: 'Floeee101',
		date: '2026-09-03',
		rating: 5,
		lang: 'de',
	},
];
