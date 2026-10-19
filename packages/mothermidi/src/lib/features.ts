export type FeatureGroup = {
	title: string;
	blurb: string;
	items: readonly string[];
};

export const featureGroups: readonly FeatureGroup[] = [
	{
		title: 'Chords',
		blurb: 'Full voicings from a single root key.',
		items: [
			'Four chord slots and four extension slots',
			'Hold a chord with any root key to play it',
			'Double-tap to latch a chord; tap another to move the latch',
			'Extensions stack — hold as many as you like',
			'Edit any slot: up to 5 notes across two octaves',
			'Suboctave of the root on a single toggle',
			'Pitch wheel, with the bend range set on your instrument',
		],
	},
	{
		title: 'Expression',
		blurb: 'Velocity, modulation, and chord voices.',
		items: [
			'Velocity sensitive from touch position, with a settable range',
			'Modulation from vertical drag on a held key',
			'Keyboard zones for root position, 1st and 2nd inversion',
			'Twelve keys, a sliding range, and an octave stepper',
			'Hardware keyboard play in the Musical Typing layout',
		],
	},
	{
		title: 'Arpeggiator & MIDI',
		blurb: 'Follows your clock, or sets its own, and sends where you choose.',
		items: [
			'Rates of 4, 8, 8T, 16, 16T and 32',
			'Up, Down, Up-Down and Down-Up patterns across 1–3 octaves',
			'Root +12 and double notes',
			'Follows incoming MIDI clock, or runs and sends its own tempo',
			'MIDI channel 1–16',
			'Send to every destination, or only the ones you pick',
		],
	},
] as const;
