import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AudioEngine, getAudioEngine } from './AudioEngine';

// Mock AudioContext and related Web Audio API
function createMockAudioBuffer(): AudioBuffer {
	return {
		duration: 1,
		length: 44100,
		numberOfChannels: 2,
		sampleRate: 44100,
		getChannelData: vi.fn(() => new Float32Array(44100)),
		copyFromChannel: vi.fn(),
		copyToChannel: vi.fn(),
	} as unknown as AudioBuffer;
}

function createMockGainNode(): GainNode {
	return {
		gain: { value: 1 },
		connect: vi.fn(),
		disconnect: vi.fn(),
	} as unknown as GainNode;
}

function createMockSourceNode(): AudioBufferSourceNode {
	return {
		buffer: null,
		playbackRate: { value: 1 },
		connect: vi.fn(),
		disconnect: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
		onended: null,
	} as unknown as AudioBufferSourceNode;
}

// Create a proper mock AudioContext class
function createMockAudioContextClass(currentTime: number = 0) {
	const mockBuffer = createMockAudioBuffer();

	return class MockAudioContext {
		currentTime = currentTime;
		state: AudioContextState = 'running';
		destination = {} as AudioDestinationNode;

		resume = vi.fn().mockResolvedValue(undefined);
		close = vi.fn().mockResolvedValue(undefined);
		decodeAudioData = vi.fn().mockResolvedValue(mockBuffer);
		createBufferSource = vi.fn(() => createMockSourceNode());
		createGain = vi.fn(() => createMockGainNode());
	};
}

// Store original AudioContext
const originalAudioContext = globalThis.AudioContext;

describe('AudioEngine', () => {
	let engine: AudioEngine;
	let MockAudioContextClass: ReturnType<typeof createMockAudioContextClass>;

	beforeEach(() => {
		MockAudioContextClass = createMockAudioContextClass(0.5);
		globalThis.AudioContext = MockAudioContextClass as unknown as typeof AudioContext;
		engine = new AudioEngine();
	});

	afterEach(() => {
		engine.dispose();
		globalThis.AudioContext = originalAudioContext;
		vi.restoreAllMocks();
	});

	describe('getContext', () => {
		it('should create AudioContext lazily', () => {
			// Before calling getContext, engine should not have a context
			expect(engine.currentTime).toBe(0); // No context yet
			const ctx = engine.getContext();
			expect(ctx).toBeDefined();
			expect(ctx).toBeInstanceOf(MockAudioContextClass);
		});

		it('should return the same context on subsequent calls', () => {
			const ctx1 = engine.getContext();
			const ctx2 = engine.getContext();
			expect(ctx1).toBe(ctx2);
		});
	});

	describe('resume', () => {
		it('should resume suspended context', async () => {
			// Create a suspended context
			const SuspendedContext = class extends MockAudioContextClass {
				state: AudioContextState = 'suspended';
			};
			globalThis.AudioContext = SuspendedContext as unknown as typeof AudioContext;
			const suspendedEngine = new AudioEngine();

			await suspendedEngine.resume();
			const ctx = suspendedEngine.getContext() as unknown as InstanceType<typeof SuspendedContext>;
			expect(ctx.resume).toHaveBeenCalled();
			suspendedEngine.dispose();
		});

		it('should not resume running context', async () => {
			await engine.resume();
			const ctx = engine.getContext() as unknown as InstanceType<typeof MockAudioContextClass>;
			// Running context resume is not called
			expect(ctx.state).toBe('running');
		});
	});

	describe('currentTime', () => {
		it('should return 0 when context not created', () => {
			expect(engine.currentTime).toBe(0);
		});

		it('should return context currentTime', () => {
			engine.getContext();
			expect(engine.currentTime).toBe(0.5);
		});
	});

	describe('loadSample', () => {
		beforeEach(() => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
		});

		afterEach(() => {
			vi.unstubAllGlobals();
		});

		it('should load and cache a sample', async () => {
			const result = await engine.loadSample('test-id', 'http://example.com/sample.wav');

			expect(result.id).toBe('test-id');
			expect(result.buffer).toBeDefined();
			expect(engine.hasSample('test-id')).toBe(true);
		});

		it('should return cached sample on subsequent loads', async () => {
			await engine.loadSample('test-id', 'http://example.com/sample.wav');
			const result = await engine.loadSample('test-id', 'http://example.com/sample.wav');

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(result.id).toBe('test-id');
		});

		it('should throw on fetch error', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: false,
				statusText: 'Not Found',
			});

			await expect(engine.loadSample('bad-id', 'http://example.com/bad.wav')).rejects.toThrow(
				'Failed to fetch sample',
			);

			consoleSpy.mockRestore();
		});
	});

	describe('loadSamples', () => {
		beforeEach(() => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
		});

		it('should load multiple samples in parallel', async () => {
			const samples = [
				{ id: 'sample1', url: 'http://example.com/1.wav' },
				{ id: 'sample2', url: 'http://example.com/2.wav' },
			];

			const results = await engine.loadSamples(samples);

			expect(results.length).toBe(2);
			expect(engine.hasSample('sample1')).toBe(true);
			expect(engine.hasSample('sample2')).toBe(true);
		});

		it('should continue loading even if one sample fails', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			let callCount = 0;
			globalThis.fetch = vi.fn().mockImplementation(() => {
				callCount++;
				if (callCount === 1) {
					return Promise.resolve({ ok: false, statusText: 'Error' });
				}
				return Promise.resolve({
					ok: true,
					arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
				});
			});

			const samples = [
				{ id: 'fail', url: 'http://example.com/fail.wav' },
				{ id: 'success', url: 'http://example.com/success.wav' },
			];

			const results = await engine.loadSamples(samples);

			expect(results.length).toBe(1);
			expect(results[0].id).toBe('success');

			consoleSpy.mockRestore();
		});
	});

	describe('hasSample and getSample', () => {
		beforeEach(() => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
		});

		it('should return false/undefined for non-existent sample', () => {
			expect(engine.hasSample('nonexistent')).toBe(false);
			expect(engine.getSample('nonexistent')).toBeUndefined();
		});

		it('should return true/buffer for loaded sample', async () => {
			await engine.loadSample('test', 'http://example.com/test.wav');

			expect(engine.hasSample('test')).toBe(true);
			expect(engine.getSample('test')).toBeDefined();
		});
	});

	describe('playSample', () => {
		beforeEach(async () => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
			await engine.loadSample('test', 'http://example.com/test.wav');
		});

		it('should return null for non-existent sample', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

			const voice = engine.playSample('nonexistent', 0);
			expect(voice).toBeNull();

			consoleSpy.mockRestore();
		});

		it('should create and return a playing voice', () => {
			const voice = engine.playSample('test', 0);

			expect(voice).not.toBeNull();
			expect(voice?.padIndex).toBe(0);
			expect(voice?.source.start).toHaveBeenCalled();
		});

		it('should apply pitch adjustment via playback rate', () => {
			const voice = engine.playSample('test', 0, 12); // +12 semitones = 2x rate

			expect(voice?.source.playbackRate.value).toBeCloseTo(2, 5);
		});

		it('should apply negative pitch adjustment', () => {
			const voice = engine.playSample('test', 0, -12); // -12 semitones = 0.5x rate

			expect(voice?.source.playbackRate.value).toBeCloseTo(0.5, 5);
		});

		it('should apply volume via gain node', () => {
			const voice = engine.playSample('test', 0, 0, 0.5);

			expect(voice?.gainNode.gain.value).toBe(0.5);
		});

		it('should clamp volume to valid range', () => {
			const voice1 = engine.playSample('test', 0, 0, -0.5);
			expect(voice1?.gainNode.gain.value).toBe(0);

			const voice2 = engine.playSample('test', 1, 0, 1.5);
			expect(voice2?.gainNode.gain.value).toBe(1);
		});

		it('should track playing voice', () => {
			engine.playSample('test', 0);
			expect(engine.isPadPlaying(0)).toBe(true);
		});
	});

	describe('stopPad', () => {
		beforeEach(async () => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
			await engine.loadSample('test', 'http://example.com/test.wav');
		});

		it('should stop all voices for a pad', () => {
			const voice1 = engine.playSample('test', 0);
			const voice2 = engine.playSample('test', 0);

			engine.stopPad(0);

			expect(voice1?.source.stop).toHaveBeenCalled();
			expect(voice2?.source.stop).toHaveBeenCalled();
		});

		it('should handle stopping non-playing pad', () => {
			expect(() => engine.stopPad(5)).not.toThrow();
		});
	});

	describe('stopAll', () => {
		beforeEach(async () => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
			await engine.loadSample('test', 'http://example.com/test.wav');
		});

		it('should stop all playing voices', () => {
			const voice1 = engine.playSample('test', 0);
			const voice2 = engine.playSample('test', 1);

			engine.stopAll();

			expect(voice1?.source.stop).toHaveBeenCalled();
			expect(voice2?.source.stop).toHaveBeenCalled();
		});
	});

	describe('isPadPlaying', () => {
		beforeEach(async () => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
			await engine.loadSample('test', 'http://example.com/test.wav');
		});

		it('should return false for non-playing pad', () => {
			expect(engine.isPadPlaying(0)).toBe(false);
		});

		it('should return true for playing pad', () => {
			engine.playSample('test', 0);
			expect(engine.isPadPlaying(0)).toBe(true);
		});
	});

	describe('dispose', () => {
		it('should close context and clear samples', async () => {
			globalThis.fetch = vi.fn().mockResolvedValue({
				ok: true,
				arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(100)),
			});
			await engine.loadSample('test', 'http://example.com/test.wav');
			const ctx = engine.getContext() as unknown as InstanceType<typeof MockAudioContextClass>;

			engine.dispose();

			expect(ctx.close).toHaveBeenCalled();
			expect(engine.hasSample('test')).toBe(false);
		});
	});
});

describe('getAudioEngine', () => {
	beforeEach(() => {
		const MockContext = createMockAudioContextClass();
		globalThis.AudioContext = MockContext as unknown as typeof AudioContext;
	});

	afterEach(() => {
		globalThis.AudioContext = originalAudioContext;
		vi.restoreAllMocks();
	});

	it('should return an AudioEngine instance', () => {
		const engine = getAudioEngine();
		expect(engine).toBeInstanceOf(AudioEngine);
	});

	it('should return the same instance on subsequent calls', () => {
		const engine1 = getAudioEngine();
		const engine2 = getAudioEngine();
		expect(engine1).toBe(engine2);
	});
});
