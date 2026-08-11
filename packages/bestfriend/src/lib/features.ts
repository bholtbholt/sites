export type FeatureGroup = {
	title: string;
	blurb: string;
	items: readonly string[];
};

export const featureGroups: readonly FeatureGroup[] = [
	{
		title: 'Device management',
		blurb: 'Manage your samples and backups.',
		items: [
			'Take Bank Snapshots to recall later',
			'Back up a Project or your entire System',
			'Bulk import samples from Files and Videos',
			'Bulk move, share, and delete samples',
			'Drag and drop to reorder samples',
			'Edit and replace samples in place',
			'Duplicate samples',
			'Search for samples',
			'Share anything',
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
		],
	},
	{
		title: 'Sample editing',
		blurb: 'A full editor with studio-grade effects.',
		items: [
			'Split stems out of any sample',
			'Zoom into waveforms',
			'Repitch to shrink file size',
			'EQ, compression, distortion, saturation, phaser, chorus, tremolo, delay, reverb',
			'Build and edit multi-samples on the EP-1320 and EP-40',
			'Permanent crop, normalize, reverse, stereo to mono',
			'Change sample rate',
			'Save default pad settings',
		],
	},
] as const;
