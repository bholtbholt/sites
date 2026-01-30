/**
 * Clock handles precise timing for the sequencer using the Web Audio API.
 * Uses the "lookahead scheduling" pattern for sample-accurate timing.
 *
 * Based on Chris Wilson's "A Tale of Two Clocks" approach:
 * - setInterval runs frequently to check what needs scheduling
 * - Notes are scheduled slightly ahead using AudioContext.currentTime
 * - This gives precise timing without JavaScript timer jitter
 */
export class Clock {
	private audioContext: AudioContext | null = null;
	private intervalId: number | null = null;
	private nextStepTime: number = 0;
	private currentStep: number = 0;
	private isPlaying: boolean = false;

	// Timing configuration
	private lookahead: number = 0.1; // How far ahead to schedule (seconds)
	private scheduleInterval: number = 25; // How often to check (milliseconds)

	// Callbacks
	private onStep: ((step: number, time: number) => void) | null = null;
	private onStepChange: ((step: number) => void) | null = null;

	// Pattern info
	private bpm: number = 120;
	private totalSteps: number = 16;

	constructor(audioContext?: AudioContext) {
		this.audioContext = audioContext ?? null;
	}

	/**
	 * Set the audio context (required for timing)
	 */
	setAudioContext(context: AudioContext): void {
		this.audioContext = context;
	}

	/**
	 * Set callback for when a step should be triggered (with audio time)
	 */
	setOnStep(callback: (step: number, time: number) => void): void {
		this.onStep = callback;
	}

	/**
	 * Set callback for UI updates (current step changed)
	 */
	setOnStepChange(callback: (step: number) => void): void {
		this.onStepChange = callback;
	}

	/**
	 * Set the BPM
	 */
	setBpm(bpm: number): void {
		this.bpm = bpm;
	}

	/**
	 * Set the total number of steps
	 */
	setTotalSteps(steps: number): void {
		this.totalSteps = steps;
		// Wrap current step if needed
		if (this.currentStep >= steps) {
			this.currentStep = 0;
		}
	}

	/**
	 * Get the current step
	 */
	getCurrentStep(): number {
		return this.currentStep;
	}

	/**
	 * Calculate the duration of one step in seconds
	 * Based on 16th notes: (60 / bpm) / 4
	 */
	private getStepDuration(): number {
		return 60 / this.bpm / 4;
	}

	/**
	 * Start the clock
	 */
	start(): void {
		if (this.isPlaying || !this.audioContext) return;

		this.isPlaying = true;
		this.currentStep = 0;
		this.nextStepTime = this.audioContext.currentTime;

		// Start the scheduler
		this.intervalId = window.setInterval(() => {
			this.scheduler();
		}, this.scheduleInterval);
	}

	/**
	 * Stop the clock
	 */
	stop(): void {
		if (!this.isPlaying) return;

		this.isPlaying = false;

		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		this.currentStep = 0;
		this.onStepChange?.(this.currentStep);
	}

	/**
	 * Check if playing
	 */
	getIsPlaying(): boolean {
		return this.isPlaying;
	}

	/**
	 * The main scheduler - runs on setInterval
	 * Schedules notes that fall within the lookahead window
	 */
	private scheduler(): void {
		if (!this.audioContext) return;

		const currentTime = this.audioContext.currentTime;

		// Schedule all steps that fall within the lookahead window
		while (this.nextStepTime < currentTime + this.lookahead) {
			// Trigger the step callback with precise audio time
			this.onStep?.(this.currentStep, this.nextStepTime);

			// Update UI (this happens slightly ahead of actual playback)
			this.onStepChange?.(this.currentStep);

			// Advance to next step
			this.nextStepTime += this.getStepDuration();
			this.currentStep = (this.currentStep + 1) % this.totalSteps;
		}
	}

	/**
	 * Dispose of the clock
	 */
	dispose(): void {
		this.stop();
		this.onStep = null;
		this.onStepChange = null;
	}
}
