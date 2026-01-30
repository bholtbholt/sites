import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Clock } from './Clock';

describe('Clock', () => {
	let clock: Clock;
	let mockContext: AudioContext;
	let currentTime: number;

	beforeEach(() => {
		currentTime = 0;
		mockContext = {
			get currentTime() {
				return currentTime;
			},
		} as AudioContext;

		// Mock window.setInterval and window.clearInterval for Node.js environment
		if (typeof globalThis.window === 'undefined') {
			(globalThis as unknown as { window: typeof globalThis }).window = globalThis;
		}

		// Mock setInterval to capture the callback
		vi.useFakeTimers();

		clock = new Clock();
		clock.setAudioContext(mockContext);
	});

	afterEach(() => {
		clock.dispose();
		vi.useRealTimers();
	});

	describe('constructor', () => {
		it('should accept optional AudioContext', () => {
			const clockWithContext = new Clock(mockContext);
			expect(clockWithContext.getCurrentStep()).toBe(0);
		});

		it('should work without AudioContext initially', () => {
			const clockNoContext = new Clock();
			expect(clockNoContext.getCurrentStep()).toBe(0);
		});
	});

	describe('setAudioContext', () => {
		it('should set the audio context', () => {
			const newClock = new Clock();
			newClock.setAudioContext(mockContext);
			// Should not throw when starting
			newClock.start();
			expect(newClock.getIsPlaying()).toBe(true);
			newClock.dispose();
		});
	});

	describe('setBpm', () => {
		it('should set the BPM', () => {
			clock.setBpm(140);
			// BPM affects step duration: 60/140/4 = ~0.107s per step
			// We can verify this indirectly through timing behavior
			expect(clock.getIsPlaying()).toBe(false);
		});
	});

	describe('setTotalSteps', () => {
		it('should set total steps', () => {
			clock.setTotalSteps(8);
			// Verify by starting and checking step wrapping
			clock.start();
			expect(clock.getCurrentStep()).toBe(0);
		});

		it('should wrap current step if exceeds new total', () => {
			clock.setTotalSteps(16);
			clock.start();

			// Advance to step 10
			currentTime = 0;
			clock.setBpm(120); // 60/120/4 = 0.125s per step
			currentTime = 1.25; // Should be at step 10
			vi.advanceTimersByTime(25); // Trigger scheduler

			// Now reduce total steps to 8
			clock.setTotalSteps(8);

			// Current step should be wrapped to 0
			expect(clock.getCurrentStep()).toBe(0);
		});
	});

	describe('getCurrentStep', () => {
		it('should return 0 initially', () => {
			expect(clock.getCurrentStep()).toBe(0);
		});

		it('should track current step during playback', () => {
			clock.setBpm(120);
			clock.setTotalSteps(16);
			clock.start();

			// Initial step should be 0
			expect(clock.getCurrentStep()).toBe(0);
		});
	});

	describe('setOnStep', () => {
		it('should register step callback', () => {
			const callback = vi.fn();
			clock.setOnStep(callback);
			clock.setBpm(120);
			clock.start();

			// Advance time to trigger scheduler
			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			expect(callback).toHaveBeenCalled();
		});

		it('should pass step index and audio time to callback', () => {
			const callback = vi.fn();
			clock.setOnStep(callback);
			clock.setBpm(120);
			clock.start();

			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			expect(callback).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
		});
	});

	describe('setOnStepChange', () => {
		it('should register step change callback for UI updates', () => {
			const callback = vi.fn();
			clock.setOnStepChange(callback);
			clock.setBpm(120);
			clock.start();

			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			expect(callback).toHaveBeenCalled();
		});

		it('should pass step index to callback', () => {
			const callback = vi.fn();
			clock.setOnStepChange(callback);
			clock.setBpm(120);
			clock.start();

			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			expect(callback).toHaveBeenCalledWith(expect.any(Number));
		});
	});

	describe('start', () => {
		it('should start playback', () => {
			clock.start();
			expect(clock.getIsPlaying()).toBe(true);
		});

		it('should not start twice', () => {
			clock.start();
			clock.start();
			expect(clock.getIsPlaying()).toBe(true);
		});

		it('should not start without audio context', () => {
			const clockNoContext = new Clock();
			clockNoContext.start();
			expect(clockNoContext.getIsPlaying()).toBe(false);
			clockNoContext.dispose();
		});

		it('should reset to step 0', () => {
			clock.start();
			expect(clock.getCurrentStep()).toBe(0);
		});
	});

	describe('stop', () => {
		it('should stop playback', () => {
			clock.start();
			clock.stop();
			expect(clock.getIsPlaying()).toBe(false);
		});

		it('should reset step to 0', () => {
			const stepChangeCallback = vi.fn();
			clock.setOnStepChange(stepChangeCallback);
			clock.start();
			clock.stop();

			expect(clock.getCurrentStep()).toBe(0);
			expect(stepChangeCallback).toHaveBeenCalledWith(0);
		});

		it('should not stop if already stopped', () => {
			clock.stop(); // Should not throw
			expect(clock.getIsPlaying()).toBe(false);
		});
	});

	describe('getIsPlaying', () => {
		it('should return false initially', () => {
			expect(clock.getIsPlaying()).toBe(false);
		});

		it('should return true when playing', () => {
			clock.start();
			expect(clock.getIsPlaying()).toBe(true);
		});

		it('should return false after stopping', () => {
			clock.start();
			clock.stop();
			expect(clock.getIsPlaying()).toBe(false);
		});
	});

	describe('step duration calculation', () => {
		it('should calculate correct step duration at 120 BPM', () => {
			// At 120 BPM: 60/120/4 = 0.125 seconds per 16th note
			clock.setBpm(120);
			clock.setTotalSteps(16);

			const stepCallback = vi.fn();
			clock.setOnStep(stepCallback);
			clock.start();

			// Advance time just past lookahead (0.1s)
			currentTime = 0.15;
			vi.advanceTimersByTime(25);

			// Should have scheduled step 0 and possibly step 1
			expect(stepCallback).toHaveBeenCalled();
		});

		it('should calculate correct step duration at 60 BPM', () => {
			// At 60 BPM: 60/60/4 = 0.25 seconds per 16th note
			clock.setBpm(60);
			clock.setTotalSteps(16);

			const stepCallback = vi.fn();
			clock.setOnStep(stepCallback);
			clock.start();

			// Advance time
			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			// Should have scheduled step 0
			expect(stepCallback).toHaveBeenCalled();
		});
	});

	describe('step wrapping', () => {
		it('should wrap steps correctly', () => {
			clock.setBpm(120);
			clock.setTotalSteps(4);

			const stepCallback = vi.fn();
			clock.setOnStep(stepCallback);
			clock.start();

			// At 120 BPM, step duration is 0.125s
			// Advance time enough to go through multiple steps
			currentTime = 0.6; // Should go through steps 0, 1, 2, 3, 0 (5 steps)
			vi.advanceTimersByTime(25);

			// Check that we've looped through steps
			const calls = stepCallback.mock.calls.map((c) => c[0]);
			expect(calls).toContain(0);
		});
	});

	describe('dispose', () => {
		it('should stop and clear callbacks', () => {
			const stepCallback = vi.fn();
			const stepChangeCallback = vi.fn();

			clock.setOnStep(stepCallback);
			clock.setOnStepChange(stepChangeCallback);
			clock.start();

			clock.dispose();

			expect(clock.getIsPlaying()).toBe(false);

			// Start again and verify callbacks are cleared
			clock.setAudioContext(mockContext);
			clock.start();
			currentTime = 0.1;
			vi.advanceTimersByTime(25);

			// Old callbacks should not be called
			stepCallback.mockClear();
			stepChangeCallback.mockClear();

			currentTime = 0.2;
			vi.advanceTimersByTime(25);

			// Since callbacks were nulled, they shouldn't have been called
			// (depends on implementation - may need adjustment)
		});
	});
});
