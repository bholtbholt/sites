import { Clock } from './Clock';
import {
	type Pattern,
	type PlayState,
	type StepCallback,
	type PlayStateCallback,
	createDefaultPattern,
	resizePattern,
	MIN_BPM,
	MAX_BPM,
	MIN_STEPS,
	MAX_STEPS,
	PAD_COUNT,
} from './types';

/**
 * Callback for triggering pads
 */
export type PadTriggerCallback = (padIndex: number, time: number) => void;

/**
 * Sequencer manages the pattern and playback.
 * It uses the Clock for timing and triggers pads via callbacks.
 */
export class Sequencer {
	private clock: Clock;
	private pattern: Pattern;
	private playState: PlayState = 'stopped';

	// Callbacks
	private onPadTrigger: PadTriggerCallback | null = null;
	private stepCallbacks: Set<StepCallback> = new Set();
	private playStateCallbacks: Set<PlayStateCallback> = new Set();

	constructor() {
		this.clock = new Clock();
		this.pattern = createDefaultPattern();

		// Set up clock callbacks
		this.clock.setOnStep((step, time) => {
			this.handleStep(step, time);
		});

		this.clock.setOnStepChange((step) => {
			this.notifyStepCallbacks(step, 0);
		});
	}

	/**
	 * Initialize with an audio context
	 */
	init(audioContext: AudioContext): void {
		this.clock.setAudioContext(audioContext);
		this.clock.setBpm(this.pattern.bpm);
		this.clock.setTotalSteps(this.pattern.steps);
	}

	/**
	 * Set callback for triggering pads
	 */
	setOnPadTrigger(callback: PadTriggerCallback): void {
		this.onPadTrigger = callback;
	}

	/**
	 * Get the current pattern
	 */
	getPattern(): Pattern {
		return this.pattern;
	}

	/**
	 * Set the entire pattern
	 */
	setPattern(pattern: Pattern): void {
		this.pattern = pattern;
		this.clock.setBpm(pattern.bpm);
		this.clock.setTotalSteps(pattern.steps);
	}

	/**
	 * Get the current step
	 */
	getCurrentStep(): number {
		return this.clock.getCurrentStep();
	}

	/**
	 * Get the playback state
	 */
	getPlayState(): PlayState {
		return this.playState;
	}

	/**
	 * Toggle a step in the pattern
	 */
	toggleStep(padIndex: number, stepIndex: number): void {
		if (padIndex < 0 || padIndex >= PAD_COUNT) return;
		if (stepIndex < 0 || stepIndex >= this.pattern.steps) return;

		this.pattern.grid[padIndex][stepIndex] = !this.pattern.grid[padIndex][stepIndex];
	}

	/**
	 * Set a step in the pattern
	 */
	setStep(padIndex: number, stepIndex: number, value: boolean): void {
		if (padIndex < 0 || padIndex >= PAD_COUNT) return;
		if (stepIndex < 0 || stepIndex >= this.pattern.steps) return;

		this.pattern.grid[padIndex][stepIndex] = value;
	}

	/**
	 * Get a step value
	 */
	getStep(padIndex: number, stepIndex: number): boolean {
		if (padIndex < 0 || padIndex >= PAD_COUNT) return false;
		if (stepIndex < 0 || stepIndex >= this.pattern.steps) return false;

		return this.pattern.grid[padIndex][stepIndex];
	}

	/**
	 * Clear all steps
	 */
	clearPattern(): void {
		this.pattern = createDefaultPattern(this.pattern.steps, this.pattern.bpm);
	}

	/**
	 * Set the BPM
	 */
	setBpm(bpm: number): void {
		const clampedBpm = Math.max(MIN_BPM, Math.min(MAX_BPM, bpm));
		this.pattern.bpm = clampedBpm;
		this.clock.setBpm(clampedBpm);
	}

	/**
	 * Get the BPM
	 */
	getBpm(): number {
		return this.pattern.bpm;
	}

	/**
	 * Set the number of steps
	 */
	setSteps(steps: number): void {
		const clampedSteps = Math.max(MIN_STEPS, Math.min(MAX_STEPS, steps));
		this.pattern = resizePattern(this.pattern, clampedSteps);
		this.clock.setTotalSteps(clampedSteps);
	}

	/**
	 * Get the number of steps
	 */
	getSteps(): number {
		return this.pattern.steps;
	}

	/**
	 * Start playback
	 */
	play(): void {
		if (this.playState === 'playing') return;

		this.playState = 'playing';
		this.clock.start();
		this.notifyPlayStateCallbacks();
	}

	/**
	 * Stop playback
	 */
	stop(): void {
		if (this.playState === 'stopped') return;

		this.playState = 'stopped';
		this.clock.stop();
		this.notifyPlayStateCallbacks();
	}

	/**
	 * Toggle playback
	 */
	toggle(): void {
		if (this.playState === 'playing') {
			this.stop();
		} else {
			this.play();
		}
	}

	/**
	 * Handle a step event from the clock
	 */
	private handleStep(step: number, time: number): void {
		// Trigger all pads that have this step enabled
		for (let pad = 0; pad < PAD_COUNT; pad++) {
			if (this.pattern.grid[pad][step]) {
				this.onPadTrigger?.(pad, time);
			}
		}
	}

	/**
	 * Register a step callback
	 */
	onStep(callback: StepCallback): () => void {
		this.stepCallbacks.add(callback);
		return () => this.stepCallbacks.delete(callback);
	}

	/**
	 * Register a play state callback
	 */
	onPlayStateChange(callback: PlayStateCallback): () => void {
		this.playStateCallbacks.add(callback);
		return () => this.playStateCallbacks.delete(callback);
	}

	/**
	 * Notify step callbacks
	 */
	private notifyStepCallbacks(step: number, time: number): void {
		for (const callback of this.stepCallbacks) {
			callback(step, time);
		}
	}

	/**
	 * Notify play state callbacks
	 */
	private notifyPlayStateCallbacks(): void {
		for (const callback of this.playStateCallbacks) {
			callback(this.playState);
		}
	}

	/**
	 * Dispose of the sequencer
	 */
	dispose(): void {
		this.stop();
		this.clock.dispose();
		this.stepCallbacks.clear();
		this.playStateCallbacks.clear();
	}
}
