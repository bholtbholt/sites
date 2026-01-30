import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SequencerStore } from './SequencerStore.svelte';
import { DEFAULT_BPM, DEFAULT_STEPS, PAD_COUNT, createDefaultPattern } from '../sequencer/types';

vi.mock('../sampler/AudioEngine', () => ({
	getAudioEngine: vi.fn(() => ({
		getContext: vi.fn(() => ({ currentTime: 0 })),
	})),
}));

describe('SequencerStore', () => {
	let store: SequencerStore;

	beforeEach(() => {
		store = new SequencerStore();
	});

	afterEach(() => {
		store.dispose();
	});

	describe('constructor', () => {
		it('should create with default pattern', () => {
			expect(store.pattern.steps).toBe(DEFAULT_STEPS);
			expect(store.pattern.bpm).toBe(DEFAULT_BPM);
			expect(store.pattern.grid.length).toBe(PAD_COUNT);
		});

		it('should start in stopped state', () => {
			expect(store.playState).toBe('stopped');
			expect(store.isPlaying).toBe(false);
		});

		it('should start at step 0', () => {
			expect(store.currentStep).toBe(0);
		});

		it('should expose derived bpm and steps', () => {
			expect(store.bpm).toBe(DEFAULT_BPM);
			expect(store.steps).toBe(DEFAULT_STEPS);
		});
	});

	describe('play / stop / toggle', () => {
		it('should update playState on play', () => {
			store.play();
			expect(store.playState).toBe('playing');
			expect(store.isPlaying).toBe(true);
		});

		it('should update playState on stop', () => {
			store.play();
			store.stop();
			expect(store.playState).toBe('stopped');
			expect(store.isPlaying).toBe(false);
		});

		it('should toggle from stopped to playing', () => {
			store.toggle();
			expect(store.playState).toBe('playing');
		});

		it('should toggle from playing to stopped', () => {
			store.play();
			store.toggle();
			expect(store.playState).toBe('stopped');
		});
	});

	describe('toggleStep / setStep / getStep', () => {
		it('should toggle a step on', () => {
			store.toggleStep(0, 0);
			expect(store.getStep(0, 0)).toBe(true);
			expect(store.pattern.grid[0][0]).toBe(true);
		});

		it('should toggle a step off', () => {
			store.toggleStep(0, 0);
			store.toggleStep(0, 0);
			expect(store.getStep(0, 0)).toBe(false);
		});

		it('should set a step to a specific value', () => {
			store.setStep(3, 5, true);
			expect(store.getStep(3, 5)).toBe(true);

			store.setStep(3, 5, false);
			expect(store.getStep(3, 5)).toBe(false);
		});

		it('should deep-copy pattern on toggleStep to trigger reactivity', () => {
			const patternBefore = store.pattern;
			store.toggleStep(0, 0);
			expect(store.pattern).not.toBe(patternBefore);
			expect(store.pattern.grid).not.toBe(patternBefore.grid);
		});

		it('should deep-copy pattern on setStep to trigger reactivity', () => {
			const patternBefore = store.pattern;
			store.setStep(0, 0, true);
			expect(store.pattern).not.toBe(patternBefore);
		});
	});

	describe('setBpm', () => {
		it('should update bpm', () => {
			store.setBpm(140);
			expect(store.bpm).toBe(140);
			expect(store.pattern.bpm).toBe(140);
		});

		it('should deep-copy pattern on setBpm', () => {
			const patternBefore = store.pattern;
			store.setBpm(120);
			expect(store.pattern).not.toBe(patternBefore);
		});
	});

	describe('setSteps', () => {
		it('should update step count', () => {
			store.setSteps(8);
			expect(store.steps).toBe(8);
			expect(store.pattern.steps).toBe(8);
			expect(store.pattern.grid[0].length).toBe(8);
		});

		it('should preserve existing step data when resizing', () => {
			store.setStep(0, 0, true);
			store.setSteps(32);
			expect(store.getStep(0, 0)).toBe(true);
			expect(store.pattern.grid[0].length).toBe(32);
		});

		it('should deep-copy pattern on setSteps', () => {
			const patternBefore = store.pattern;
			store.setSteps(8);
			expect(store.pattern).not.toBe(patternBefore);
		});
	});

	describe('clearPattern', () => {
		it('should clear all steps', () => {
			store.setStep(0, 0, true);
			store.setStep(5, 5, true);
			store.clearPattern();
			expect(store.getStep(0, 0)).toBe(false);
			expect(store.getStep(5, 5)).toBe(false);
		});

		it('should preserve bpm and steps', () => {
			store.setBpm(140);
			store.setSteps(8);
			store.clearPattern();
			expect(store.bpm).toBe(140);
			expect(store.steps).toBe(8);
		});
	});

	describe('setPattern', () => {
		it('should replace the entire pattern', () => {
			const newPattern = createDefaultPattern(8, 140);
			newPattern.grid[0][0] = true;

			store.setPattern(newPattern);

			expect(store.pattern.steps).toBe(8);
			expect(store.pattern.bpm).toBe(140);
			expect(store.pattern.grid[0][0]).toBe(true);
		});

		it('should deep-copy pattern on setPattern', () => {
			const newPattern = createDefaultPattern(8, 140);
			store.setPattern(newPattern);
			expect(store.pattern).not.toBe(newPattern);
		});
	});

	describe('sequencerInstance', () => {
		it('should expose the underlying Sequencer', () => {
			expect(store.sequencerInstance).toBeDefined();
			expect(typeof store.sequencerInstance.play).toBe('function');
		});
	});

	describe('dispose', () => {
		it('should unsubscribe callbacks so further sequencer events are ignored', () => {
			store.dispose();
			// After dispose, playing the underlying sequencer should not update the store
			store.sequencerInstance.play();
			expect(store.playState).toBe('stopped');
		});
	});
});
