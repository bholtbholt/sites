import { Sequencer, type Pattern, type PlayState, createDefaultPattern } from '../sequencer';
import { getAudioEngine } from '../sampler/AudioEngine';

/**
 * Class-based reactive sequencer store using Svelte 5 runes.
 * Manages step sequencer pattern, playback state, BPM, and step count.
 */
export class SequencerStore {
	// Use $state.raw for pattern since we replace the whole object, not mutate
	pattern = $state.raw<Pattern>(createDefaultPattern());

	currentStep = $state(0);
	playState = $state<PlayState>('stopped');

	// Derived state for convenience
	bpm = $derived(this.pattern.bpm);
	steps = $derived(this.pattern.steps);
	isPlaying = $derived(this.playState === 'playing');

	private sequencer: Sequencer;
	private unsubscribeStep: (() => void) | null = null;
	private unsubscribePlayState: (() => void) | null = null;

	constructor() {
		this.sequencer = new Sequencer();
		this.pattern = this.sequencer.getPattern();

		// Subscribe to step changes
		this.unsubscribeStep = this.sequencer.onStep((step) => {
			this.currentStep = step;
		});

		// Subscribe to play state changes
		this.unsubscribePlayState = this.sequencer.onPlayStateChange((state) => {
			this.playState = state;
		});
	}

	/**
	 * Initialize with audio context
	 */
	init(): void {
		const context = getAudioEngine().getContext();
		this.sequencer.init(context);
	}

	/**
	 * Start playback
	 */
	play(): void {
		this.sequencer.play();
	}

	/**
	 * Stop playback
	 */
	stop(): void {
		this.sequencer.stop();
	}

	/**
	 * Toggle playback
	 */
	toggle(): void {
		this.sequencer.toggle();
	}

	/**
	 * Toggle a step in the pattern
	 */
	toggleStep(padIndex: number, stepIndex: number): void {
		this.sequencer.toggleStep(padIndex, stepIndex);
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Set a step value in the pattern
	 */
	setStep(padIndex: number, stepIndex: number, value: boolean): void {
		this.sequencer.setStep(padIndex, stepIndex, value);
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Get a step value from the pattern
	 */
	getStep(padIndex: number, stepIndex: number): boolean {
		return this.sequencer.getStep(padIndex, stepIndex);
	}

	/**
	 * Set the BPM
	 */
	setBpm(bpm: number): void {
		this.sequencer.setBpm(bpm);
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Set the step count
	 */
	setSteps(steps: number): void {
		this.sequencer.setSteps(steps);
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Clear the entire pattern
	 */
	clearPattern(): void {
		this.sequencer.clearPattern();
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Set the entire pattern
	 */
	setPattern(newPattern: Pattern): void {
		this.sequencer.setPattern(newPattern);
		this.pattern = { ...this.sequencer.getPattern() };
	}

	/**
	 * Set callback for triggering pads when step is active
	 */
	setOnPadTrigger(callback: (padIndex: number, time: number) => void): void {
		this.sequencer.setOnPadTrigger(callback);
	}

	/**
	 * Get the underlying Sequencer instance (for advanced use)
	 */
	get sequencerInstance(): Sequencer {
		return this.sequencer;
	}

	/**
	 * Dispose of resources
	 */
	dispose(): void {
		this.unsubscribeStep?.();
		this.unsubscribePlayState?.();
		this.sequencer.dispose();
	}
}
