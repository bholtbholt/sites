import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Sequencer } from './Sequencer';
import {
	createDefaultPattern,
	MIN_BPM,
	MAX_BPM,
	MIN_STEPS,
	MAX_STEPS,
	DEFAULT_BPM,
	DEFAULT_STEPS,
	PAD_COUNT,
} from './types';

describe('Sequencer', () => {
	let sequencer: Sequencer;

	beforeEach(() => {
		sequencer = new Sequencer();
	});

	afterEach(() => {
		sequencer.dispose();
	});

	describe('constructor', () => {
		it('should create with default pattern', () => {
			const pattern = sequencer.getPattern();
			expect(pattern.steps).toBe(DEFAULT_STEPS);
			expect(pattern.bpm).toBe(DEFAULT_BPM);
			expect(pattern.grid.length).toBe(PAD_COUNT);
		});

		it('should start in stopped state', () => {
			expect(sequencer.getPlayState()).toBe('stopped');
		});
	});

	describe('init', () => {
		it('should initialize with audio context', () => {
			const mockContext = {
				currentTime: 0,
			} as AudioContext;

			expect(() => sequencer.init(mockContext)).not.toThrow();
		});
	});

	describe('setOnPadTrigger', () => {
		it('should register pad trigger callback', () => {
			const callback = vi.fn();
			sequencer.setOnPadTrigger(callback);
			// Callback would be invoked when handleStep is called with active steps
		});
	});

	describe('getPattern / setPattern', () => {
		it('should return current pattern', () => {
			const pattern = sequencer.getPattern();
			expect(pattern).toBeDefined();
			expect(pattern.grid).toBeDefined();
		});

		it('should set entire pattern', () => {
			const newPattern = createDefaultPattern(8, 140);
			newPattern.grid[0][0] = true;

			sequencer.setPattern(newPattern);

			const retrieved = sequencer.getPattern();
			expect(retrieved.steps).toBe(8);
			expect(retrieved.bpm).toBe(140);
			expect(retrieved.grid[0][0]).toBe(true);
		});
	});

	describe('getCurrentStep', () => {
		it('should return current step from clock', () => {
			expect(sequencer.getCurrentStep()).toBe(0);
		});
	});

	describe('getPlayState', () => {
		it('should return stopped initially', () => {
			expect(sequencer.getPlayState()).toBe('stopped');
		});
	});

	describe('toggleStep', () => {
		it('should toggle step from false to true', () => {
			expect(sequencer.getStep(0, 0)).toBe(false);
			sequencer.toggleStep(0, 0);
			expect(sequencer.getStep(0, 0)).toBe(true);
		});

		it('should toggle step from true to false', () => {
			sequencer.setStep(0, 0, true);
			sequencer.toggleStep(0, 0);
			expect(sequencer.getStep(0, 0)).toBe(false);
		});

		it('should ignore invalid pad index', () => {
			expect(() => sequencer.toggleStep(-1, 0)).not.toThrow();
			expect(() => sequencer.toggleStep(16, 0)).not.toThrow();
		});

		it('should ignore invalid step index', () => {
			expect(() => sequencer.toggleStep(0, -1)).not.toThrow();
			expect(() => sequencer.toggleStep(0, 100)).not.toThrow();
		});
	});

	describe('setStep', () => {
		it('should set step to true', () => {
			sequencer.setStep(0, 0, true);
			expect(sequencer.getStep(0, 0)).toBe(true);
		});

		it('should set step to false', () => {
			sequencer.setStep(0, 0, true);
			sequencer.setStep(0, 0, false);
			expect(sequencer.getStep(0, 0)).toBe(false);
		});

		it('should ignore invalid pad index', () => {
			expect(() => sequencer.setStep(-1, 0, true)).not.toThrow();
			expect(() => sequencer.setStep(16, 0, true)).not.toThrow();
		});

		it('should ignore invalid step index', () => {
			expect(() => sequencer.setStep(0, -1, true)).not.toThrow();
			expect(() => sequencer.setStep(0, 100, true)).not.toThrow();
		});
	});

	describe('getStep', () => {
		it('should return false for unset step', () => {
			expect(sequencer.getStep(0, 0)).toBe(false);
		});

		it('should return true for set step', () => {
			sequencer.setStep(5, 10, true);
			expect(sequencer.getStep(5, 10)).toBe(true);
		});

		it('should return false for invalid pad index', () => {
			expect(sequencer.getStep(-1, 0)).toBe(false);
			expect(sequencer.getStep(16, 0)).toBe(false);
		});

		it('should return false for invalid step index', () => {
			expect(sequencer.getStep(0, -1)).toBe(false);
			expect(sequencer.getStep(0, 100)).toBe(false);
		});
	});

	describe('clearPattern', () => {
		it('should clear all steps', () => {
			// Set some steps
			sequencer.setStep(0, 0, true);
			sequencer.setStep(5, 5, true);
			sequencer.setStep(15, 15, true);

			sequencer.clearPattern();

			expect(sequencer.getStep(0, 0)).toBe(false);
			expect(sequencer.getStep(5, 5)).toBe(false);
			expect(sequencer.getStep(15, 15)).toBe(false);
		});

		it('should preserve steps and BPM settings', () => {
			sequencer.setSteps(8);
			sequencer.setBpm(140);

			sequencer.clearPattern();

			expect(sequencer.getSteps()).toBe(8);
			expect(sequencer.getBpm()).toBe(140);
		});
	});

	describe('setBpm', () => {
		it('should set BPM', () => {
			sequencer.setBpm(140);
			expect(sequencer.getBpm()).toBe(140);
		});

		it('should clamp BPM to MIN_BPM', () => {
			sequencer.setBpm(10);
			expect(sequencer.getBpm()).toBe(MIN_BPM);
		});

		it('should clamp BPM to MAX_BPM', () => {
			sequencer.setBpm(300);
			expect(sequencer.getBpm()).toBe(MAX_BPM);
		});
	});

	describe('getBpm', () => {
		it('should return current BPM', () => {
			expect(sequencer.getBpm()).toBe(DEFAULT_BPM);
		});
	});

	describe('setSteps', () => {
		it('should set step count', () => {
			sequencer.setSteps(8);
			expect(sequencer.getSteps()).toBe(8);
		});

		it('should clamp to MIN_STEPS', () => {
			sequencer.setSteps(0);
			expect(sequencer.getSteps()).toBe(MIN_STEPS);
		});

		it('should clamp to MAX_STEPS', () => {
			sequencer.setSteps(100);
			expect(sequencer.getSteps()).toBe(MAX_STEPS);
		});

		it('should resize pattern grid', () => {
			sequencer.setStep(0, 0, true);
			sequencer.setSteps(32);

			expect(sequencer.getPattern().grid[0].length).toBe(32);
			expect(sequencer.getStep(0, 0)).toBe(true);
		});
	});

	describe('getSteps', () => {
		it('should return current step count', () => {
			expect(sequencer.getSteps()).toBe(DEFAULT_STEPS);
		});
	});

	describe('play', () => {
		it('should start playback', () => {
			sequencer.play();
			expect(sequencer.getPlayState()).toBe('playing');
		});

		it('should not restart if already playing', () => {
			sequencer.play();
			sequencer.play();
			expect(sequencer.getPlayState()).toBe('playing');
		});

		it('should notify play state callbacks', () => {
			const callback = vi.fn();
			sequencer.onPlayStateChange(callback);
			sequencer.play();

			expect(callback).toHaveBeenCalledWith('playing');
		});
	});

	describe('stop', () => {
		it('should stop playback', () => {
			sequencer.play();
			sequencer.stop();
			expect(sequencer.getPlayState()).toBe('stopped');
		});

		it('should not notify if already stopped', () => {
			const callback = vi.fn();
			sequencer.onPlayStateChange(callback);
			sequencer.stop();

			expect(callback).not.toHaveBeenCalled();
		});

		it('should notify play state callbacks', () => {
			const callback = vi.fn();
			sequencer.play();
			sequencer.onPlayStateChange(callback);
			sequencer.stop();

			expect(callback).toHaveBeenCalledWith('stopped');
		});
	});

	describe('toggle', () => {
		it('should start if stopped', () => {
			sequencer.toggle();
			expect(sequencer.getPlayState()).toBe('playing');
		});

		it('should stop if playing', () => {
			sequencer.play();
			sequencer.toggle();
			expect(sequencer.getPlayState()).toBe('stopped');
		});
	});

	describe('onStep', () => {
		it('should register step callback', () => {
			const callback = vi.fn();
			sequencer.onStep(callback);
			// Callback would be invoked when step changes
		});

		it('should return unsubscribe function', () => {
			const callback = vi.fn();
			const unsubscribe = sequencer.onStep(callback);

			expect(typeof unsubscribe).toBe('function');
			unsubscribe();
		});
	});

	describe('onPlayStateChange', () => {
		it('should register play state callback', () => {
			const callback = vi.fn();
			sequencer.onPlayStateChange(callback);
			sequencer.play();

			expect(callback).toHaveBeenCalledWith('playing');
		});

		it('should return unsubscribe function', () => {
			const callback = vi.fn();
			const unsubscribe = sequencer.onPlayStateChange(callback);

			unsubscribe();
			sequencer.play();

			expect(callback).not.toHaveBeenCalled();
		});

		it('should support multiple callbacks', () => {
			const callback1 = vi.fn();
			const callback2 = vi.fn();

			sequencer.onPlayStateChange(callback1);
			sequencer.onPlayStateChange(callback2);
			sequencer.play();

			expect(callback1).toHaveBeenCalled();
			expect(callback2).toHaveBeenCalled();
		});
	});

	describe('dispose', () => {
		it('should stop playback', () => {
			sequencer.play();
			sequencer.dispose();
			expect(sequencer.getPlayState()).toBe('stopped');
		});

		it('should clear callbacks', () => {
			const stepCallback = vi.fn();
			const playStateCallback = vi.fn();

			sequencer.onStep(stepCallback);
			sequencer.onPlayStateChange(playStateCallback);

			sequencer.dispose();

			// After dispose, callbacks should be cleared
			// New calls shouldn't trigger them
		});
	});
});
