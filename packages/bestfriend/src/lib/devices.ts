import { site } from './site';

export type FaqItem = { q: string; a: string };

export type Device = {
	slug: string;
	name: string;
	sub: string;
	/** 'EP-133 K.O. II' — the form people actually search for. */
	full: string;
	/** Shown on the device page under the h1, and as the meta description. */
	description: string;
	intro: string;
	/** Device-specific first. These are what stop the page being a copy of the others. */
	highlights: readonly { title: string; body: string }[];
	faq: readonly FaqItem[];
};

// Shared answers. Repeated verbatim across devices on purpose: each device page has to
// stand alone as an answer to "what cable do I need for my EP-40", and a crawler that
// only ever sees one of these pages should still get the whole answer.
const cableAnswer = (full: string) =>
	`Use a USB-C to USB-C data cable to connect your ${full} to an iPhone, iPad, or Mac. Charge-only cables will not work. On a Lightning iPhone or iPad, use an MFi-certified Lightning to USB adapter together with a USB-IF certified USB-A to USB-C cable.`;

const backupAnswer = (full: string) =>
	`Yes. Best Friend can take a Bank Snapshot of a single bank, back up the project you are working on, or back up the entire system on your ${full}. Every backup is named and dated, and any of them can be loaded back in one tap.`;

const osAnswer = (full: string) =>
	`Best Friend requires iOS ${site.minOs}, iPadOS ${site.minOs}, or macOS ${site.minOs} or later, and a Mac needs Apple silicon (M1 or later). Your ${full} itself needs no update — the app talks to it over USB.`;

export const devices: readonly Device[] = [
	{
		slug: 'ep-133',
		name: 'EP-133',
		sub: 'K.O. II',
		full: 'EP-133 K.O. II',
		description:
			'Best Friend is the unrivalled companion app for the Teenage Engineering EP-133 K.O. II. Edit every pad setting, see a whole bank at once, split stems, and take Bank Snapshots from iPhone, iPad, or Mac.',
		intro:
			'The EP-133 K.O. II gives you twelve pads and a 3-char display. Best Friend gives you the rest of the screen: every pad setting laid out at once, a full sample editor, and backups you can actually recall.',
		highlights: [
			{
				title: 'Every EP-133 pad setting on one screen',
				body: 'Trim, attack and release, volume, pitch, pan, play mode, time-stretch, and MIDI channel — visible and editable together, with the waveform above them, all with hardware control. No menu diving on the hardware necessary.',
			},
			{
				title: 'See a whole EP-133 bank at once',
				body: 'Every pad in the group as a grid of waveforms and names, laid out the way the hardware is. Move through A, B, C, and D without losing your place.',
			},
			{
				title: 'Bank Snapshots',
				body: 'Arrange a bank on the EP-133, snapshot it, and recall it later — even on a different device. Project and system backups cover everything else.',
			},
			{
				title: 'Performance effects per pad',
				body: 'Toggle mute, pitch up, pitch down, and reverse on individual EP-133 pads while the whole bank stays in view.',
			},
			{
				title: 'A real sample editor',
				body: 'Crop, normalize, reverse, repitch, flatten stereo to mono, and change sample rate. Then stack three-band EQ, 1176-style compression, distortion and saturation, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.',
			},
			{
				title: 'Stems',
				body: 'Split any sample into isolated drums, bass, vocals, guitar, and instruments, then remix the levels or mute a track before it hits an EP-133 pad.',
			},
		],
		faq: [
			{
				q: 'Does Best Friend work with the Teenage Engineering EP-133 K.O. II?',
				a: 'Yes. The EP-133 K.O. II is fully supported, including the pad editor, whole-bank view, performance effects, sample library, stem splitting, and Bank Snapshots. Best Friend also ships an EP-133 theme in both light and dark mode.',
			},
			{
				q: 'What cable do I need to connect an EP-133 to an iPhone?',
				a: cableAnswer('EP-133 K.O. II'),
			},
			{ q: 'Can I back up my EP-133 K.O. II?', a: backupAnswer('EP-133 K.O. II') },
			{
				q: 'Can I get samples onto the EP-133 in bulk?',
				a: 'Yes. Import samples from Files or pull audio straight out of a video, then select as many as you like and move, share, or delete them in one pass. You can also drag and drop to reorder samples or reassign pads across the project.',
			},
			{
				q: 'Can I build multi-samples on the EP-133?',
				a: 'Multi-sample building and editing is available on the EP-40 and EP-1320. On the EP-133, Best Friend covers pad editing, the whole-bank view, the full sample editor, stems, and backups.',
			},
			{ q: 'What do I need to run Best Friend?', a: osAnswer('EP-133 K.O. II') },
		],
	},
	{
		slug: 'ep-40',
		name: 'EP-40',
		sub: 'Riddim',
		full: 'EP-40 Riddim',
		description:
			'Best Friend is the unrivalled companion app for the Teenage Engineering EP-40 Riddim. Build multi-samples, reach the Supertone settings, edit pads, and back up your projects from iPhone, iPad, or Mac.',
		intro:
			'The EP-40 Riddim has depth the hardware cannot show you all at once — Supertone, multi-samples, per-pad detail. Best Friend puts it all on screen and gives you a real editor to feed it.',
		highlights: [
			{
				title: 'Supertone settings, exposed',
				body: 'The EP-40 Supertone settings are surfaced directly in Best Friend, alongside the rest of the pad parameters instead of buried behind hardware menus.',
			},
			{
				title: 'Build and edit multi-samples',
				body: 'Layer samples into one playable instrument on the EP-40. Set the length, crop and loop each layer, preview it, then save the whole thing as a single waveform. Come back later and edit one layer without rebuilding the rest.',
			},
			{
				title: 'Every EP-40 pad setting on one screen',
				body: 'Trim, attack and release, volume, pitch, pan, play mode, time-stretch, and MIDI channel together with the waveform, plus hardware control over the trim window.',
			},
			{
				title: 'Bank Snapshots and backups',
				body: 'Snapshot a single EP-40 bank to recall later, back up the project you are working on, or back up the entire system — all named, dated, and one tap from being restored.',
			},
			{
				title: 'A real sample editor',
				body: 'Crop, normalize, reverse, repitch, flatten stereo to mono, and change sample rate, then add three-band EQ, 1176-style compression, distortion and saturation, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.',
			},
			{
				title: 'Stems',
				body: 'Split any sample into isolated drums, bass, vocals, guitar, and instruments, then remix or mute before sending it to an EP-40 pad.',
			},
		],
		faq: [
			{
				q: 'Does Best Friend work with the Teenage Engineering EP-40 Riddim?',
				a: 'Yes. The EP-40 Riddim is fully supported, including multi-sample building, the Supertone settings, the pad editor, whole-bank view, stem splitting, and backups. Best Friend also ships an EP-40 theme in both light and dark mode.',
			},
			{
				q: 'Can I build multi-samples on the EP-40?',
				a: 'Yes. Best Friend can build and edit multi-samples on the EP-40. Layer several samples together, set the length, crop and loop each layer, preview the result, then save it as a single waveform. Individual layers stay editable afterwards.',
			},
			{
				q: 'Can I edit the EP-40 Supertone settings in Best Friend?',
				a: 'Yes. Supertone settings are available on EP-40 pads alongside the other pad parameters.',
			},
			{
				q: 'What cable do I need to connect an EP-40 to an iPhone?',
				a: cableAnswer('EP-40 Riddim'),
			},
			{ q: 'Can I back up my EP-40 Riddim?', a: backupAnswer('EP-40 Riddim') },
			{ q: 'What do I need to run Best Friend?', a: osAnswer('EP-40 Riddim') },
		],
	},
	{
		slug: 'ep-1320',
		name: 'EP-1320',
		sub: 'Medieval',
		full: 'EP-1320 Medieval',
		description:
			'Best Friend is the unrivalled companion app for the Teenage Engineering EP-1320 Medieval. Build multi-samples, edit every pad setting, split stems, and back up your projects from iPhone, iPad, or Mac.',
		intro:
			'The EP-1320 Medieval ships with a library worth rearranging. Best Friend lets you build your own multi-samples for it, edit any sample properly before it lands on a pad, and snapshot a bank you want back later.',
		highlights: [
			{
				title: 'Build and edit multi-samples',
				body: 'Layer samples into one playable instrument on the EP-1320. Set the length, crop and loop each layer, preview it, then save the whole thing as a single waveform — and edit a single layer later without starting over.',
			},
			{
				title: 'Every EP-1320 pad setting on one screen',
				body: 'Trim, attack and release, volume, pitch, pan, play mode, time-stretch, and MIDI channel, with the waveform above them and hardware control over the trim window.',
			},
			{
				title: 'See a whole EP-1320 bank at once',
				body: 'Every pad in the group as a grid of waveforms and names. Toggle mute, pitch up, pitch down, and reverse on individual pads without leaving the view.',
			},
			{
				title: 'Bank Snapshots and backups',
				body: 'Snapshot a single EP-1320 bank to recall later, back up the current project, or back up the entire system. Everything is named, dated, and restorable in one tap.',
			},
			{
				title: 'A real sample editor',
				body: 'Crop, normalize, reverse, repitch, flatten stereo to mono, and change sample rate, then stack three-band EQ, 1176-style compression, distortion and saturation, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.',
			},
			{
				title: 'Stems',
				body: 'Split any sample into isolated drums, bass, vocals, guitar, and instruments, then remix the levels or mute a track entirely.',
			},
		],
		faq: [
			{
				q: 'Does Best Friend work with the Teenage Engineering EP-1320 Medieval?',
				a: 'Yes. The EP-1320 Medieval is fully supported, including multi-sample building, the pad editor, whole-bank view, performance effects, stem splitting, and backups. Best Friend also ships an EP-1320 theme in both light and dark mode.',
			},
			{
				q: 'Can I build multi-samples on the EP-1320?',
				a: 'Yes. Best Friend can build and edit multi-samples on the EP-1320. Layer several samples together, set the length, crop and loop each layer, preview the result, then save it as a single waveform. Individual layers stay editable afterwards.',
			},
			{
				q: 'What cable do I need to connect an EP-1320 to an iPhone?',
				a: cableAnswer('EP-1320 Medieval'),
			},
			{ q: 'Can I back up my EP-1320 Medieval?', a: backupAnswer('EP-1320 Medieval') },
			{
				q: 'Can I add my own samples to the EP-1320?',
				a: 'Yes. Import samples from Files or pull audio straight out of a video, edit them in Best Friend, then send them to any pad. Existing samples can be edited and replaced in place.',
			},
			{ q: 'What do I need to run Best Friend?', a: osAnswer('EP-1320 Medieval') },
		],
	},
] as const;

export const deviceBySlug = (slug: string) => devices.find((device) => device.slug === slug);

// Site-wide FAQ. Deliberately phrased as the questions people type, not as feature headings.
export const faq: readonly FaqItem[] = [
	{
		q: 'What is Best Friend?',
		a: `Best Friend is a companion app for Teenage Engineering EP-Series samplers. It connects to an EP-133 K.O. II, EP-40 Riddim, or EP-1320 Medieval over USB-C and gives you a full-screen editor for pads and samples, stem splitting, multi-sample building, and backups. It is made by ${site.developer} and is not affiliated with Teenage Engineering.`,
	},
	{
		q: 'Which Teenage Engineering samplers does Best Friend support?',
		a: 'Best Friend supports the EP-133 K.O. II, the EP-40 Riddim, and the EP-1320 Medieval, and includes a matching theme for each in light and dark mode.',
	},
	{
		q: 'What cable do I need to connect my sampler to an iPhone, iPad, or Mac?',
		a: 'Use a USB-C to USB-C data cable. Charge-only cables will not work. On a Lightning iPhone or iPad, use an MFi-certified Lightning to USB adapter together with a USB-IF certified USB-A to USB-C cable.',
	},
	{
		q: 'What does Best Friend cost?',
		a: `Best Friend is a one-time purchase of $${site.price} ${site.priceCurrency}. That single purchase covers iPhone, iPad, and Mac — there is no subscription.`,
	},
	{
		q: 'Do I have to buy Best Friend separately for iPhone, iPad, and Mac?',
		a: 'No. It is one universal purchase. Buy it once and run it on iPhone, iPad, and Mac, with the same editor and the same projects on each.',
	},
	{
		q: 'Is Best Friend coming to Android?',
		a: `Yes. An Android version is in active development and is expected to land by ${site.androidEta}. Today Best Friend runs on iPhone, iPad, and Mac.`,
	},
	{
		q: 'What are the system requirements for Best Friend?',
		a: `Best Friend requires iOS ${site.minOs}, iPadOS ${site.minOs}, or macOS ${site.minOs} or later. On Mac it requires Apple silicon (M1 or later). You also need one of the supported EP-Series samplers and a USB-C data cable.`,
	},
	{
		q: 'Does Best Friend work without the hardware connected?',
		a: `No. Best Friend is an extended display and management tool, so it needs a wired connection to the hardware while you work. Sample editing happens in the app, and changes are written to the device over the cable.`,
	},
	{
		q: 'Can I back up my EP-133, EP-40, or EP-1320?',
		a: 'Yes. Best Friend takes Bank Snapshots of a single bank, project backups of the set you are working on, and system backups of everything on the device. All of them are named and dated, and any of them is one tap from being loaded back.',
	},
	{
		q: 'Can Best Friend split a song into stems?',
		a: 'Yes. Any sample can be split into isolated drums, bass, vocals, guitar, and instruments. You can remix the levels or mute a track entirely, then send the result to a sample slot.',
	},
	{
		q: 'Can I build multi-samples?',
		a: 'Yes, on the EP-40 and EP-1320. Combine samples into one playable instrument, set the length, crop and loop each layer, preview it, then save it as a single waveform.',
	},
	{
		q: 'Can I import samples from a video?',
		a: 'Yes. Best Friend can pull audio straight out of a video, as well as bulk import from Files. Imported samples can be edited, renamed, reordered, and assigned to pads by drag and drop.',
	},
	{
		q: 'Does Best Friend collect any data?',
		a: 'No. Best Friend does not collect, store, or transmit personal data — everything stays on your device. This website is static, with no analytics, cookies, or tracking.',
	},
];
