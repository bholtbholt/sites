import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('$app/environment', () => ({
	browser: true,
}));

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

vi.mock('../shared/keyboardMap', () => ({
	createKeyboardHandler: vi.fn(() => vi.fn()),
}));

vi.mock('./urlSync.svelte', () => ({
	createUrlSync: vi.fn(() => ({
		initFromUrl: vi.fn(() => null),
		syncToUrl: vi.fn(),
		syncToUrlImmediate: vi.fn(),
		getShareUrl: vi.fn(() => 'http://localhost:3000/remix?s=abc'),
		copyShareUrl: vi.fn().mockResolvedValue(true),
		cleanup: vi.fn(),
	})),
}));

import { RemixStore } from './remixStore.svelte';

describe('RemixStore', () => {
	let store: RemixStore;
	let originalWindow: typeof globalThis.window;

	beforeEach(() => {
		originalWindow = globalThis.window;

		Object.defineProperty(globalThis, 'window', {
			value: {
				innerWidth: 1024,
				location: {
					href: 'http://localhost:3000/remix',
				},
				history: {
					replaceState: vi.fn(),
				},
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			},
			writable: true,
			configurable: true,
		});

		Object.defineProperty(globalThis, 'navigator', {
			value: {
				clipboard: {
					writeText: vi.fn().mockResolvedValue(undefined),
				},
			},
			writable: true,
			configurable: true,
		});

		store = new RemixStore();
	});

	afterEach(() => {
		store.dispose();
		Object.defineProperty(globalThis, 'window', {
			value: originalWindow,
			writable: true,
			configurable: true,
		});
		vi.restoreAllMocks();
	});

	describe('initialization', () => {
		it('should create child SamplerStore and SequencerStore', () => {
			expect(store.sampler).toBeDefined();
			expect(store.sequencer).toBeDefined();
		});

		it('should initialize with default UI state', () => {
			expect(store.selectedPadIndex).toBeNull();
			expect(store.isSamplePickerOpen).toBe(false);
			expect(store.isPadSettingsOpen).toBe(false);
			expect(store.shareMessage).toBeNull();
			expect(store.currentView).toBe('pads');
			expect(store.isReady).toBe(false);
		});

		it('should start as not playing', () => {
			expect(store.isPlaying).toBe(false);
		});
	});

	describe('lifecycle', () => {
		it('should set isReady after init', async () => {
			await store.init();
			expect(store.isReady).toBe(true);
		});
	});

	describe('pad actions', () => {
		it('should trigger pad and init audio', () => {
			store.triggerPad(3);
			expect(store.sampler.isInitialized).toBe(true);
		});

		it('should select pad and open settings', () => {
			store.selectPad(5);
			expect(store.selectedPadIndex).toBe(5);
			expect(store.isPadSettingsOpen).toBe(true);
		});
	});

	describe('sample picker', () => {
		it('should open sample picker and close pad settings', () => {
			store.selectPad(0);
			store.openSamplePicker();
			expect(store.isSamplePickerOpen).toBe(true);
			expect(store.isPadSettingsOpen).toBe(false);
		});

		it('should select sample and return to pad settings', () => {
			store.selectPad(0);
			store.openSamplePicker();
			store.selectSample('ark-kick');
			expect(store.isSamplePickerOpen).toBe(false);
			expect(store.isPadSettingsOpen).toBe(true);
			expect(store.sampler.pads[0].sampleId).toBe('ark-kick');
		});

		it('should close sample picker', () => {
			store.openSamplePicker();
			store.closeSamplePicker();
			expect(store.isSamplePickerOpen).toBe(false);
		});

		it('should not assign sample when no pad is selected', () => {
			const padsBefore = [...store.sampler.pads];
			store.selectSample('ark-kick');
			expect(store.sampler.pads).toEqual(padsBefore);
		});
	});

	describe('pad settings', () => {
		it('should set pitch for selected pad', () => {
			store.selectPad(2);
			store.setPitch(5);
			expect(store.sampler.pads[2].pitch).toBe(5);
		});

		it('should set volume for selected pad', () => {
			store.selectPad(2);
			store.setVolume(0.7);
			expect(store.sampler.pads[2].volume).toBe(0.7);
		});

		it('should set mute group for selected pad', () => {
			store.selectPad(2);
			store.setMuteGroup(3);
			expect(store.sampler.pads[2].muteGroup).toBe(3);
		});

		it('should not set pitch when no pad is selected', () => {
			store.setPitch(5);
			expect(store.sampler.pads.every((p) => p.pitch === 0)).toBe(true);
		});

		it('should close pad settings', () => {
			store.selectPad(0);
			store.closePadSettings();
			expect(store.isPadSettingsOpen).toBe(false);
		});
	});

	describe('transport', () => {
		it('should play and init audio', () => {
			store.play();
			expect(store.sampler.isInitialized).toBe(true);
			expect(store.sequencer.playState).toBe('playing');
		});

		it('should stop playback', () => {
			store.play();
			store.stop();
			expect(store.sequencer.playState).toBe('stopped');
		});

		it('should set BPM', () => {
			store.setBpm(140);
			expect(store.sequencer.bpm).toBe(140);
		});

		it('should set step count', () => {
			store.setSteps(8);
			expect(store.sequencer.steps).toBe(8);
		});

		it('should clear pattern', () => {
			store.sequencer.setStep(0, 0, true);
			store.clearPattern();
			expect(store.sequencer.getStep(0, 0)).toBe(false);
		});
	});

	describe('share', () => {
		it('should set success message on share', async () => {
			vi.useFakeTimers();
			await store.share();
			expect(store.shareMessage).toBe('Link copied to clipboard!');
			vi.useRealTimers();
		});

		it('should clear share message after timeout', async () => {
			vi.useFakeTimers();
			await store.share();
			vi.advanceTimersByTime(3000);
			expect(store.shareMessage).toBeNull();
			vi.useRealTimers();
		});
	});

	describe('step grid', () => {
		it('should toggle step in pattern', () => {
			store.toggleStep(0, 0);
			expect(store.sequencer.getStep(0, 0)).toBe(true);
		});
	});

	describe('view toggle', () => {
		it('should set current view to sequencer', () => {
			store.setCurrentView('sequencer');
			expect(store.currentView).toBe('sequencer');
		});

		it('should set current view to pads', () => {
			store.setCurrentView('sequencer');
			store.setCurrentView('pads');
			expect(store.currentView).toBe('pads');
		});
	});

	describe('helpers', () => {
		it('should get sample name for pad index', () => {
			store.sampler.assignSample(0, 'ark-kick');
			const name = store.getSampleNameForPad(0);
			expect(name).toBe('Name(ark-kick)');
		});

		it('should get sample name by ID', () => {
			expect(store.getSampleName('ark-kick')).toBe('Name(ark-kick)');
		});

		it('should return Empty for null sample', () => {
			expect(store.getSampleName(null)).toBe('Empty');
		});
	});

	describe('encoded state', () => {
		it('should return current state for URL encoding', () => {
			const encoded = store.getEncodedState();
			expect(encoded.pads).toBeDefined();
			expect(encoded.pattern).toBeDefined();
			expect(encoded.pads.length).toBe(16);
			expect(encoded.pattern.grid.length).toBe(16);
		});

		it('should deep-copy pattern grid to prevent mutation', () => {
			const encoded = store.getEncodedState();
			const originalGrid = store.sequencer.pattern.grid;
			expect(encoded.pattern.grid).not.toBe(originalGrid);
			encoded.pattern.grid[0][0] = true;
			expect(store.sequencer.pattern.grid[0][0]).toBe(false);
		});
	});

	describe('dispose', () => {
		it('should dispose without errors', () => {
			expect(() => store.dispose()).not.toThrow();
		});
	});
});
