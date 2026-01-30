/**
 * Configuration for a sample in the library
 */
export interface SampleConfig {
	id: string;
	url: string;
	name: string;
}

/**
 * Configuration for a pad
 */
export interface PadConfig {
	sampleId: string | null;
	pitch: number; // -12 to +12 semitones
	volume: number; // 0 to 1
	muteGroup: number; // 0 = none, 1-4 = group
}

/**
 * A loaded and decoded audio sample
 */
export interface LoadedSample {
	id: string;
	buffer: AudioBuffer;
	name: string;
}

/**
 * Represents an actively playing voice
 */
export interface PlayingVoice {
	padIndex: number;
	source: AudioBufferSourceNode;
	gainNode: GainNode;
	startTime: number;
}

/**
 * Default pad configuration
 */
export function createDefaultPadConfig(): PadConfig {
	return {
		sampleId: null,
		pitch: 0,
		volume: 1,
		muteGroup: 0,
	};
}

/**
 * Number of pads in the sampler
 */
export const PAD_COUNT = 16;

/**
 * Number of mute groups available
 */
export const MUTE_GROUP_COUNT = 4;
