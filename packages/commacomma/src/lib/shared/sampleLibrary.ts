import type { SampleConfig } from '../sampler/types';

/**
 * Available samples in the library.
 */
export const SAMPLE_LIBRARY: SampleConfig[] = [
	// Kicks
	{ id: 'ark-kick', url: '/samples/001 ark kick.wav', name: 'Ark Kick' },
	{ id: 'bam-kick', url: '/samples/002 bam kick.wav', name: 'Bam Kick' },
	{ id: 'close-kick', url: '/samples/003 close kick.wav', name: 'Close Kick' },
	{ id: 'collie-kick', url: '/samples/004 collie kick a.wav', name: 'Collie Kick' },

	// Snares
	{ id: 'shanty-sn', url: '/samples/100 shanty sn.wav', name: 'Shanty Snare' },
	{ id: 'shawty-sn', url: '/samples/101 shawty sn.wav', name: 'Shawty Snare' },
	{ id: 'smugl-sn', url: '/samples/102 smugl sn.wav', name: 'Smugl Snare' },
	{ id: 'spring-sn', url: '/samples/103 spring sn.wav', name: 'Spring Snare' },
	{ id: 'clangy-sn', url: '/samples/104 clangy sn.wav', name: 'Clangy Snare' },

	// Hi-Hats
	{ id: 'root-hh-a', url: '/samples/200 root hh a.wav', name: 'Root HH A' },
	{ id: 'root-hh-b', url: '/samples/201 root hh b.wav', name: 'Root HH B' },
	{ id: 'root-oh', url: '/samples/202 root oh.wav', name: 'Root Open HH' },
	{ id: 'smugl-hh', url: '/samples/203 smugl hh a.wav', name: 'Smugl HH' },

	// Bass
	{ id: 'alban-bass', url: '/samples/400 alban bass.wav', name: 'Alban Bass' },
	{ id: 'bell-bass', url: '/samples/401 bell bass.wav', name: 'Bell Bass' },
	{ id: 'cs-bass-a', url: '/samples/402 cs bass a.wav', name: 'CS Bass A' },
	{ id: 'cs-bass-b', url: '/samples/403 cs bass b.wav', name: 'CS Bass B' },

	// Baby G Drums (71 BPM)
	{ id: 'baby-g-drms-a', url: '/samples/800 baby g drms a 71.wav', name: 'Baby G Drums A' },
	{ id: 'baby-g-drms-b', url: '/samples/801 baby g drms b 71.wav', name: 'Baby G Drums B' },
	{ id: 'baby-g-drms-c', url: '/samples/802 baby g drms c 71.wav', name: 'Baby G Drums C' },

	// Baby G Fills (71 BPM)
	{ id: 'baby-g-fill-a', url: '/samples/803 baby g fill a 71.wav', name: 'Baby G Fill A' },
	{ id: 'baby-g-fill-b', url: '/samples/804 baby g fill b 71.wav', name: 'Baby G Fill B' },
	{ id: 'baby-g-fill-c', url: '/samples/805 baby g fill c 71.wav', name: 'Baby G Fill C' },

	// Baby G Bass (71 BPM)
	{ id: 'baby-g-bass-a', url: '/samples/806 baby g bass a 71.wav', name: 'Baby G Bass A' },
	{ id: 'baby-g-bass-b', url: '/samples/807 baby g bass b 71.wav', name: 'Baby G Bass B' },
	{ id: 'baby-g-bass-c', url: '/samples/808 baby g bass c 71.wav', name: 'Baby G Bass C' },

	// Baby G Melody (71 BPM)
	{ id: 'baby-g-mel-a', url: '/samples/809 baby g mel a 71.wav', name: 'Baby G Melody A' },
	{ id: 'baby-g-mel-b', url: '/samples/810 baby g mel b 71.wav', name: 'Baby G Melody B' },
	{ id: 'baby-g-mel-c', url: '/samples/811 baby g mel c 71.wav', name: 'Baby G Melody C' },
];

/**
 * Get a sample config by ID
 */
export function getSampleById(id: string): SampleConfig | undefined {
	return SAMPLE_LIBRARY.find((s) => s.id === id);
}

/**
 * Get sample name by ID
 */
export function getSampleName(id: string | null): string {
	if (!id) return 'Empty';
	const sample = getSampleById(id);
	return sample?.name ?? id;
}

/**
 * Get all samples as an array of {id, url} for loading
 */
export function getAllSamplesForLoading(): Array<{ id: string; url: string }> {
	return SAMPLE_LIBRARY.map((s) => ({ id: s.id, url: s.url }));
}

/**
 * Group samples by category
 */
export function getSamplesByCategory(): Record<string, SampleConfig[]> {
	const categories: Record<string, SampleConfig[]> = {
		Kicks: [],
		Snares: [],
		'Hi-Hats': [],
		Bass: [],
		'Drum Loops': [],
		Fills: [],
		'Bass Loops': [],
		Melody: [],
	};

	for (const sample of SAMPLE_LIBRARY) {
		if (sample.id.includes('kick')) {
			categories.Kicks.push(sample);
		} else if (sample.id.includes('-sn')) {
			categories.Snares.push(sample);
		} else if (sample.id.includes('-hh') || sample.id.includes('-oh')) {
			categories['Hi-Hats'].push(sample);
		} else if (
			sample.id === 'alban-bass' ||
			sample.id === 'bell-bass' ||
			sample.id.startsWith('cs-bass')
		) {
			categories.Bass.push(sample);
		} else if (sample.id.includes('-drms-')) {
			categories['Drum Loops'].push(sample);
		} else if (sample.id.includes('-fill-')) {
			categories.Fills.push(sample);
		} else if (sample.id.includes('baby-g-bass')) {
			categories['Bass Loops'].push(sample);
		} else if (sample.id.includes('-mel-')) {
			categories.Melody.push(sample);
		}
	}

	// Remove empty categories
	for (const key of Object.keys(categories)) {
		if (categories[key].length === 0) {
			delete categories[key];
		}
	}

	return categories;
}
