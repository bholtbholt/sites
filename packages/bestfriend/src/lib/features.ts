export type FeatureGroup = {
	title: string;
	blurb: string;
	items: readonly string[];
};

export const featureGroups: readonly FeatureGroup[] = [
	{
		title: 'Scenes',
		blurb: 'See the whole arrangement, not three characters.',
		items: [
			'See every sequenced note across every bank in a Scene or Song',
			'See the fader automation lanes for each bank',
			'Follow the playhead through the timeline automatically',
			'Navigate a Scene or an entire Song',
		],
	},
	{
		title: 'Bounce and export',
		blurb: 'Real audio, built from the hardware.',
		items: [
			'Export real audio stems directly from your EP, without AI separation',
			'Isolate all 48 pads individually, in group mixdowns, or as a stereo mixdown',
			'Fader automation is included in the export',
			'Capture in real time to keep performances, Supertone, and effects, MIDI-synced to your DAW',
			'Export the MIDI data from a Scene or Song',
			'Bounce a Scene or the whole Song',
			'Take your bounces into the DAW of your choice',
		],
	},
	{
		title: 'MIDI Controller',
		blurb: 'Play your EP from a real keyboard.',
		items: [
			'Play a velocity-sensitive keyboard',
			'Build major, minor, suspended, or diminished triads with a button',
			'Add a 6th, 7th, or 9th for flavour',
			'Add the lower octave to any chord',
			'Save your own chords to any Chord or Extension button',
			'Split each key into 1-3 zones for alternate chord positions',
			'Arpeggiator with 4 modes, 6 rates, and 3 octaves synced to the hardware clock',
			'Add pitch bend or modulation to any chord',
			'Play chords from a Mac or iPad keyboard with Logic-style Musical Typing',
		],
	},
	{
		title: 'Sample editing',
		blurb: 'A full editor with studio-grade effects.',
		items: [
			'Split stems out of any sample',
			'Zoom into waveforms',
			'Repitch to shrink file size',
			'EQ, compression, distortion, saturation, octaver, phaser, chorus, tremolo, delay, and reverb effects',
			'Build and edit multi-samples on the EP-1320 and EP-40',
			'Convert any sample, recording, or video into a multi-sample, auto-split into notes',
			'Record audio straight into the app as a new sample',
			'Permanent crop, normalize, reverse, stereo to mono',
			'Change sample rate',
			'Automatically detect and set the key',
			'Save default pad settings',
		],
	},
	{
		title: 'Hardware management',
		blurb: 'Manage your samples and backups.',
		items: [
			'Take Bank Snapshots to recall later',
			'Build kits and Bank Snapshots without the hardware connected',
			'Back up a Project or your entire System',
			'Browse a backup to see and hear what it holds',
			'Restore part of a backup: a scene, a group, a pattern, or a few samples',
			'Extract a Project out of a System backup',
			'Preview or bounce a Project backup before you restore it',
			'Import a Project or System from the official EP Sample Tool',
			'Bulk import samples from Files and Videos',
			'Import and record MIDI files and patterns',
			'Bulk move, share, and delete samples',
			'Edit and replace samples in place',
			'Sync everything across your Apple devices with iCloud',
			'Search for, duplicate, reorder, and share anything',
		],
	},
	{
		title: 'Pads',
		blurb: 'See, edit, and perform with your pads.',
		items: [
			'Waveform, name, and length for every pad',
			'Set trim, attack, and release windows with hardware control',
			'Volume, pitch, pan, mute, play mode, time-stretch, MIDI channel',
			'Supertone settings on the EP-40',
			'See an entire bank of samples at once',
			'Mute and unmute individual pads',
			'Toggle performance effects to individual pads: mute, pitch up, pitch down, reverse',
			'Drag and drop to reassign pads across your project',
			'Change Pad Settings on several pads at once',
			'Copy a pad and its settings to another',
			'Chop a sample across pads in equal, transient, or lazy mode',
			'Tune a pad with the built-in tuner',
		],
	},
] as const;
