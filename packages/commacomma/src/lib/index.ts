// Main entry point for the library

// Sampler exports
export {
	Sampler,
	getAudioEngine,
	AudioEngine,
	type SampleConfig,
	type PadConfig,
	type LoadedSample,
	type PlayingVoice,
	createDefaultPadConfig,
	PAD_COUNT,
	MUTE_GROUP_COUNT,
} from './sampler';

// Sequencer exports (excluding PAD_COUNT which is already exported from sampler)
export {
	Sequencer,
	Clock,
	type Pattern,
	type PlayState,
	type StepCallback,
	type PlayStateCallback,
	createDefaultPattern,
	resizePattern,
	DEFAULT_BPM,
	DEFAULT_STEPS,
	MIN_BPM,
	MAX_BPM,
	MIN_STEPS,
	MAX_STEPS,
} from './sequencer';

// Shared utilities
export * from './shared';

// Stores
export * from './stores';

// Context API
export { setRemixContext, getRemixContext } from './context';
