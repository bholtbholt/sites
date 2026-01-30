import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDefaultPadAssignments } from './SamplerStore.svelte';

vi.mock('../sampler/AudioEngine', () => {
	const mockEngine = {
		getContext: vi.fn(() => ({ currentTime: 0 })),
		resume: vi.fn().mockResolvedValue(undefined),
		currentTime: 0,
		loadSample: vi.fn().mockResolvedValue({ id: 'test', buffer: {}, name: 'test' }),
		loadSamples: vi.fn().mockResolvedValue([]),
		hasSample: vi.fn().mockReturnValue(true),
		getSample: vi.fn(),
		playSample: vi.fn().mockReturnValue({
			padIndex: 0,
			source: { stop: vi.fn(), addEventListener: vi.fn() },
			gainNode: { gain: { value: 1 } },
			startTime: 0,
		}),
		stopPad: vi.fn(),
		stopAll: vi.fn(),
		isPadPlaying: vi.fn().mockReturnValue(false),
		dispose: vi.fn(),
	};
	return {
		getAudioEngine: vi.fn(() => mockEngine),
		AudioEngine: vi.fn(() => mockEngine),
	};
});

vi.mock('../shared', () => ({
	getAllSamplesForLoading: vi.fn(() => [{ id: 'test-sample', url: '/samples/test.wav' }]),
	getSampleName: vi.fn((id: string | null) => (id ? `Name(${id})` : 'Empty')),
}));

describe('getDefaultPadAssignments', () => {
	it('should return array of pad assignments', () => {
		const assignments = getDefaultPadAssignments();
		expect(Array.isArray(assignments)).toBe(true);
	});

	it('should return 16 assignments (one per pad)', () => {
		const assignments = getDefaultPadAssignments();
		expect(assignments.length).toBe(16);
	});

	it('should have padIndex from 0 to 15', () => {
		const assignments = getDefaultPadAssignments();
		const indices = assignments.map((a) => a.padIndex);

		for (let i = 0; i < 16; i++) {
			expect(indices).toContain(i);
		}
	});

	it('should have unique padIndex values', () => {
		const assignments = getDefaultPadAssignments();
		const indices = assignments.map((a) => a.padIndex);
		const uniqueIndices = new Set(indices);

		expect(uniqueIndices.size).toBe(16);
	});

	it('should have non-empty sampleId for each assignment', () => {
		const assignments = getDefaultPadAssignments();

		for (const assignment of assignments) {
			expect(assignment.sampleId).toBeTruthy();
			expect(typeof assignment.sampleId).toBe('string');
		}
	});

	it('should include expected sample types', () => {
		const assignments = getDefaultPadAssignments();
		const sampleIds = assignments.map((a) => a.sampleId);

		expect(sampleIds.some((id) => id.includes('kick'))).toBe(true);
		expect(sampleIds.some((id) => id.includes('sn'))).toBe(true);
		expect(sampleIds.some((id) => id.includes('hh'))).toBe(true);
		expect(sampleIds.some((id) => id.includes('bass'))).toBe(true);
	});

	it('should assign kicks to pads 0-1', () => {
		const assignments = getDefaultPadAssignments();
		const pad0 = assignments.find((a) => a.padIndex === 0);
		const pad1 = assignments.find((a) => a.padIndex === 1);

		expect(pad0?.sampleId).toContain('kick');
		expect(pad1?.sampleId).toContain('kick');
	});

	it('should assign snares to pads 2-3', () => {
		const assignments = getDefaultPadAssignments();
		const pad2 = assignments.find((a) => a.padIndex === 2);
		const pad3 = assignments.find((a) => a.padIndex === 3);

		expect(pad2?.sampleId).toContain('sn');
		expect(pad3?.sampleId).toContain('sn');
	});

	it('should assign hi-hats to pads 4-7', () => {
		const assignments = getDefaultPadAssignments();
		const pad4 = assignments.find((a) => a.padIndex === 4);
		const pad5 = assignments.find((a) => a.padIndex === 5);
		const pad6 = assignments.find((a) => a.padIndex === 6);

		expect(pad4?.sampleId).toMatch(/hh|oh/);
		expect(pad5?.sampleId).toMatch(/hh|oh/);
		expect(pad6?.sampleId).toMatch(/hh|oh/);
	});

	it('should have correct shape for each assignment', () => {
		const assignments = getDefaultPadAssignments();

		for (const assignment of assignments) {
			expect(assignment).toHaveProperty('padIndex');
			expect(assignment).toHaveProperty('sampleId');
			expect(typeof assignment.padIndex).toBe('number');
			expect(typeof assignment.sampleId).toBe('string');
		}
	});

	it('should return consistent results on multiple calls', () => {
		const first = getDefaultPadAssignments();
		const second = getDefaultPadAssignments();

		expect(first).toEqual(second);
	});
});

describe('SamplerStore', () => {
	let SamplerStore: typeof import('./SamplerStore.svelte').SamplerStore;

	beforeEach(async () => {
		const module = await import('./SamplerStore.svelte');
		SamplerStore = module.SamplerStore;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('constructor', () => {
		it('should initialize with 16 pads', () => {
			const store = new SamplerStore();
			expect(store.pads.length).toBe(16);
			store.dispose();
		});

		it('should initialize pads with default config', () => {
			const store = new SamplerStore();
			const pad = store.pads[0];
			expect(pad.sampleId).toBeNull();
			expect(pad.pitch).toBe(0);
			expect(pad.volume).toBe(1);
			expect(pad.muteGroup).toBe(0);
			store.dispose();
		});

		it('should start with isLoading false and no error', () => {
			const store = new SamplerStore();
			expect(store.isLoading).toBe(false);
			expect(store.error).toBeNull();
			expect(store.isInitialized).toBe(false);
			store.dispose();
		});
	});

	describe('init', () => {
		it('should set isInitialized on first call', () => {
			const store = new SamplerStore();
			store.init();
			expect(store.isInitialized).toBe(true);
			store.dispose();
		});

		it('should be idempotent', () => {
			const store = new SamplerStore();
			store.init();
			store.init();
			expect(store.isInitialized).toBe(true);
			store.dispose();
		});
	});

	describe('assignSample', () => {
		it('should assign a sample to a pad', () => {
			const store = new SamplerStore();
			store.assignSample(0, 'test-sample');
			expect(store.pads[0].sampleId).toBe('test-sample');
			store.dispose();
		});

		it('should clear a sample with null', () => {
			const store = new SamplerStore();
			store.assignSample(0, 'test-sample');
			store.assignSample(0, null);
			expect(store.pads[0].sampleId).toBeNull();
			store.dispose();
		});

		it('should produce a new pads array reference', () => {
			const store = new SamplerStore();
			const padsBefore = store.pads;
			store.assignSample(0, 'test-sample');
			expect(store.pads).not.toBe(padsBefore);
			store.dispose();
		});
	});

	describe('setPitch', () => {
		it('should set pitch for a pad', () => {
			const store = new SamplerStore();
			store.setPitch(0, 5);
			expect(store.pads[0].pitch).toBe(5);
			store.dispose();
		});
	});

	describe('setVolume', () => {
		it('should set volume for a pad', () => {
			const store = new SamplerStore();
			store.setVolume(0, 0.5);
			expect(store.pads[0].volume).toBe(0.5);
			store.dispose();
		});
	});

	describe('setMuteGroup', () => {
		it('should set mute group for a pad', () => {
			const store = new SamplerStore();
			store.setMuteGroup(0, 2);
			expect(store.pads[0].muteGroup).toBe(2);
			store.dispose();
		});
	});

	describe('trigger', () => {
		it('should delegate to the underlying Sampler', () => {
			const store = new SamplerStore();
			store.assignSample(0, 'test-sample');
			store.trigger(0);
			expect(store.samplerInstance).toBeDefined();
			store.dispose();
		});
	});

	describe('loadSamples', () => {
		it('should set isLoading while loading', async () => {
			const store = new SamplerStore();
			store.init();
			const promise = store.loadSamples();
			expect(store.isLoading).toBe(true);
			await promise;
			expect(store.isLoading).toBe(false);
			store.dispose();
		});

		it('should clear error on start', async () => {
			const store = new SamplerStore();
			store.init();
			await store.loadSamples();
			expect(store.error).toBeNull();
			store.dispose();
		});
	});

	describe('setPads', () => {
		it('should replace all pad configurations', () => {
			const store = new SamplerStore();
			const newPads = Array.from({ length: 16 }, (_, i) => ({
				sampleId: `s-${i}`,
				pitch: 0,
				volume: 1,
				muteGroup: 0,
			}));
			store.setPads(newPads);
			expect(store.pads[0].sampleId).toBe('s-0');
			expect(store.pads[15].sampleId).toBe('s-15');
			store.dispose();
		});
	});

	describe('getSampleName', () => {
		it('should return a display name for a sample ID', () => {
			const store = new SamplerStore();
			expect(store.getSampleName('test-sample')).toBe('Name(test-sample)');
			store.dispose();
		});

		it('should return Empty for null', () => {
			const store = new SamplerStore();
			expect(store.getSampleName(null)).toBe('Empty');
			store.dispose();
		});
	});

	describe('dispose', () => {
		it('should clean up without errors', () => {
			const store = new SamplerStore();
			expect(() => store.dispose()).not.toThrow();
		});
	});
});
