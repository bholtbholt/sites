import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Sampler } from './Sampler';
import { PAD_COUNT, MUTE_GROUP_COUNT, type PadConfig } from './types';
import type { AudioEngine } from './AudioEngine';

// Create a mock AudioEngine
function createMockAudioEngine(): AudioEngine {
	return {
		getContext: vi.fn(),
		resume: vi.fn().mockResolvedValue(undefined),
		currentTime: 0.5,
		loadSample: vi.fn().mockResolvedValue({ id: 'test', buffer: {}, name: 'test' }),
		loadSamples: vi.fn().mockResolvedValue([]),
		hasSample: vi.fn().mockReturnValue(true),
		getSample: vi.fn(),
		playSample: vi.fn().mockReturnValue({
			padIndex: 0,
			source: { stop: vi.fn(), onended: null },
			gainNode: { gain: { value: 1 } },
			startTime: 0,
		}),
		stopPad: vi.fn(),
		stopAll: vi.fn(),
		isPadPlaying: vi.fn().mockReturnValue(false),
		dispose: vi.fn(),
	} as unknown as AudioEngine;
}

describe('Sampler', () => {
	let sampler: Sampler;
	let mockEngine: AudioEngine;

	beforeEach(() => {
		mockEngine = createMockAudioEngine();
		sampler = new Sampler(mockEngine);
	});

	describe('constructor', () => {
		it('should create 16 default pads', () => {
			const pads = sampler.getPads();
			expect(pads.length).toBe(PAD_COUNT);
		});

		it('should initialize pads with default values', () => {
			const pad = sampler.getPad(0);
			expect(pad?.sampleId).toBeNull();
			expect(pad?.pitch).toBe(0);
			expect(pad?.volume).toBe(1);
			expect(pad?.muteGroup).toBe(0);
		});
	});

	describe('init', () => {
		it('should resume the audio engine', async () => {
			await sampler.init();
			expect(mockEngine.resume).toHaveBeenCalled();
		});
	});

	describe('currentTime', () => {
		it('should return engine currentTime', () => {
			expect(sampler.currentTime).toBe(0.5);
		});
	});

	describe('getPads', () => {
		it('should return readonly array of pads', () => {
			const pads = sampler.getPads();
			expect(pads.length).toBe(PAD_COUNT);
		});
	});

	describe('getPad', () => {
		it('should return pad at valid index', () => {
			const pad = sampler.getPad(0);
			expect(pad).toBeDefined();
		});

		it('should return undefined for invalid index', () => {
			expect(sampler.getPad(-1)).toBeUndefined();
			expect(sampler.getPad(16)).toBeUndefined();
		});
	});

	describe('setPad', () => {
		it('should update pad configuration', () => {
			sampler.setPad(0, { sampleId: 'test-sample' });
			expect(sampler.getPad(0)?.sampleId).toBe('test-sample');
		});

		it('should merge with existing config', () => {
			sampler.setPad(0, { sampleId: 'test' });
			sampler.setPad(0, { pitch: 5 });

			const pad = sampler.getPad(0);
			expect(pad?.sampleId).toBe('test');
			expect(pad?.pitch).toBe(5);
		});

		it('should ignore invalid index', () => {
			expect(() => sampler.setPad(-1, { sampleId: 'test' })).not.toThrow();
			expect(() => sampler.setPad(16, { sampleId: 'test' })).not.toThrow();
		});
	});

	describe('setPads', () => {
		it('should set all pad configurations', () => {
			const configs: PadConfig[] = Array.from({ length: PAD_COUNT }, (_, i) => ({
				sampleId: `sample-${i}`,
				pitch: i,
				volume: 1,
				muteGroup: 0,
			}));

			sampler.setPads(configs);

			expect(sampler.getPad(0)?.sampleId).toBe('sample-0');
			expect(sampler.getPad(5)?.sampleId).toBe('sample-5');
			expect(sampler.getPad(5)?.pitch).toBe(5);
		});

		it('should handle fewer configs than PAD_COUNT', () => {
			const configs: PadConfig[] = [{ sampleId: 'only-one', pitch: 0, volume: 1, muteGroup: 0 }];

			sampler.setPads(configs);

			expect(sampler.getPad(0)?.sampleId).toBe('only-one');
			// Other pads should remain unchanged (default values)
		});
	});

	describe('assignSample', () => {
		it('should assign sample to pad', () => {
			sampler.assignSample(0, 'my-sample');
			expect(sampler.getPad(0)?.sampleId).toBe('my-sample');
		});

		it('should assign null to clear sample', () => {
			sampler.assignSample(0, 'my-sample');
			sampler.assignSample(0, null);
			expect(sampler.getPad(0)?.sampleId).toBeNull();
		});
	});

	describe('setPitch', () => {
		it('should set pitch for pad', () => {
			sampler.setPitch(0, 5);
			expect(sampler.getPad(0)?.pitch).toBe(5);
		});

		it('should clamp pitch to -12', () => {
			sampler.setPitch(0, -20);
			expect(sampler.getPad(0)?.pitch).toBe(-12);
		});

		it('should clamp pitch to +12', () => {
			sampler.setPitch(0, 20);
			expect(sampler.getPad(0)?.pitch).toBe(12);
		});
	});

	describe('setVolume', () => {
		it('should set volume for pad', () => {
			sampler.setVolume(0, 0.5);
			expect(sampler.getPad(0)?.volume).toBe(0.5);
		});

		it('should clamp volume to 0', () => {
			sampler.setVolume(0, -0.5);
			expect(sampler.getPad(0)?.volume).toBe(0);
		});

		it('should clamp volume to 1', () => {
			sampler.setVolume(0, 1.5);
			expect(sampler.getPad(0)?.volume).toBe(1);
		});
	});

	describe('setMuteGroup', () => {
		it('should set mute group for pad', () => {
			sampler.setMuteGroup(0, 2);
			expect(sampler.getPad(0)?.muteGroup).toBe(2);
		});

		it('should clamp mute group to 0', () => {
			sampler.setMuteGroup(0, -1);
			expect(sampler.getPad(0)?.muteGroup).toBe(0);
		});

		it('should clamp mute group to MUTE_GROUP_COUNT', () => {
			sampler.setMuteGroup(0, 10);
			expect(sampler.getPad(0)?.muteGroup).toBe(MUTE_GROUP_COUNT);
		});
	});

	describe('trigger', () => {
		it('should return null for pad without sample', () => {
			const voice = sampler.trigger(0);
			expect(voice).toBeNull();
		});

		it('should play sample via engine', () => {
			sampler.assignSample(0, 'test-sample');
			sampler.trigger(0);

			expect(mockEngine.playSample).toHaveBeenCalledWith('test-sample', 0, 0, 1, undefined);
		});

		it('should pass pitch and volume to engine', () => {
			sampler.assignSample(0, 'test-sample');
			sampler.setPitch(0, 5);
			sampler.setVolume(0, 0.7);
			sampler.trigger(0);

			expect(mockEngine.playSample).toHaveBeenCalledWith('test-sample', 0, 5, 0.7, undefined);
		});

		it('should pass scheduled time to engine', () => {
			sampler.assignSample(0, 'test-sample');
			sampler.trigger(0, 1.5);

			expect(mockEngine.playSample).toHaveBeenCalledWith('test-sample', 0, 0, 1, 1.5);
		});

		it('should notify trigger callbacks', () => {
			const callback = vi.fn();
			sampler.onTrigger(callback);
			sampler.assignSample(0, 'test-sample');
			sampler.trigger(0);

			expect(callback).toHaveBeenCalledWith(0);
		});

		it('should stop existing voice in same mute group', () => {
			// Set up two pads in the same mute group
			sampler.assignSample(0, 'sample-a');
			sampler.assignSample(1, 'sample-b');
			sampler.setMuteGroup(0, 1);
			sampler.setMuteGroup(1, 1);

			// Trigger first pad
			const voice1 = sampler.trigger(0);

			// Trigger second pad - should stop first
			sampler.trigger(1);

			expect(voice1?.source.stop).toHaveBeenCalled();
		});
	});

	describe('onTrigger', () => {
		it('should register callback', () => {
			const callback = vi.fn();
			sampler.onTrigger(callback);
			sampler.assignSample(0, 'test');
			sampler.trigger(0);

			expect(callback).toHaveBeenCalledWith(0);
		});

		it('should return unsubscribe function', () => {
			const callback = vi.fn();
			const unsubscribe = sampler.onTrigger(callback);

			unsubscribe();

			sampler.assignSample(0, 'test');
			sampler.trigger(0);

			expect(callback).not.toHaveBeenCalled();
		});

		it('should support multiple callbacks', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();

			sampler.onTrigger(callback1);
			sampler.onTrigger(callback2);
			sampler.assignSample(0, 'test');
			sampler.trigger(0);

			expect(callback1).toHaveBeenCalled();
			expect(callback2).toHaveBeenCalled();
		});
	});

	describe('stop', () => {
		it('should delegate to engine stopPad', () => {
			sampler.stop(5);
			expect(mockEngine.stopPad).toHaveBeenCalledWith(5);
		});
	});

	describe('stopAll', () => {
		it('should delegate to engine stopAll', () => {
			sampler.stopAll();
			expect(mockEngine.stopAll).toHaveBeenCalled();
		});
	});

	describe('hasSample', () => {
		it('should delegate to engine hasSample', () => {
			sampler.hasSample('test-sample');
			expect(mockEngine.hasSample).toHaveBeenCalledWith('test-sample');
		});
	});

	describe('loadSample', () => {
		it('should delegate to engine loadSample', async () => {
			await sampler.loadSample('id', 'http://example.com/sample.wav');
			expect(mockEngine.loadSample).toHaveBeenCalledWith('id', 'http://example.com/sample.wav');
		});
	});

	describe('loadSamples', () => {
		it('should delegate to engine loadSamples', async () => {
			const samples = [{ id: 'a', url: 'a.wav' }];
			await sampler.loadSamples(samples);
			expect(mockEngine.loadSamples).toHaveBeenCalledWith(samples);
		});
	});

	describe('padCount', () => {
		it('should return PAD_COUNT', () => {
			expect(sampler.padCount).toBe(PAD_COUNT);
		});
	});

	describe('dispose', () => {
		it('should stop all and clear callbacks', () => {
			const callback = vi.fn();
			sampler.onTrigger(callback);

			sampler.dispose();

			// Callbacks should be cleared - trigger shouldn't call them
			sampler.assignSample(0, 'test');
			sampler.trigger(0);
			expect(callback).not.toHaveBeenCalled();
		});
	});
});
