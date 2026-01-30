import { browser } from '$app/environment';
import { untrack } from 'svelte';
import { SamplerStore, getDefaultPadAssignments } from './SamplerStore.svelte';
import { SequencerStore } from './SequencerStore.svelte';
import { createKeyboardHandler } from '../shared/keyboardMap';
import { createUrlSync } from './urlSync.svelte';
import type { EncodedState } from '../shared/urlCodec';

/**
 * Class-based reactive remix store using Svelte 5 runes.
 * Central orchestration point for the remix page, combining sampler and sequencer.
 */
export class RemixStore {
	// Child stores
	sampler = new SamplerStore();
	sequencer = new SequencerStore();

	// UI State
	selectedPadIndex = $state<number | null>(null);
	isSamplePickerOpen = $state(false);
	isPadSettingsOpen = $state(false);
	shareMessage = $state<string | null>(null);
	currentView = $state<'pads' | 'sequencer'>('pads');
	isReady = $state(false);

	// Derived state
	isPlaying = $derived(this.sequencer.playState === 'playing');

	selectedPadConfig = $derived(
		this.selectedPadIndex !== null ? this.sampler.pads[this.selectedPadIndex] : null,
	);

	selectedPadName = $derived(
		this.selectedPadConfig ? this.sampler.getSampleName(this.selectedPadConfig.sampleId) : 'Empty',
	);

	// Private state
	private urlSync = createUrlSync({ debounceMs: 300 });
	private cleanupKeyboard: (() => void) | null = null;
	private shareMessageTimeout: ReturnType<typeof setTimeout> | null = null;

	constructor() {
		// Connect sequencer to sampler for playback
		this.sequencer.setOnPadTrigger((padIndex, time) => {
			this.sampler.trigger(padIndex, time);
		});
	}

	// --- Lifecycle ---

	/**
	 * Initialize the store - call on mount
	 */
	async init(): Promise<void> {
		if (!browser) return;

		let loadTimeoutId: ReturnType<typeof setTimeout> | null = null;

		try {
			this.sequencer.init();

			const loadTimeout = new Promise<never>((_, reject) => {
				loadTimeoutId = setTimeout(() => reject(new Error('Sample loading timeout')), 10000);
			});

			try {
				await Promise.race([this.sampler.loadSamples(), loadTimeout]);
			} catch (loadError) {
				console.error('Sample loading failed:', loadError);
			} finally {
				if (loadTimeoutId) clearTimeout(loadTimeoutId);
			}

			const urlState = this.urlSync.initFromUrl();
			if (urlState) {
				this.sampler.setPads(urlState.pads);
				this.sequencer.setPattern(urlState.pattern);
			} else {
				const defaults = getDefaultPadAssignments();
				for (const { padIndex, sampleId } of defaults) {
					this.sampler.assignSample(padIndex, sampleId);
				}

				const isMobile = window.innerWidth < 640;
				if (isMobile) {
					this.sequencer.setSteps(4);
				}
			}

			this.cleanupKeyboard = createKeyboardHandler((padIndex) => {
				this.ensureAudioInit();
				this.sampler.trigger(padIndex);
			});
		} catch (error) {
			console.error('Initialization error:', error);
		} finally {
			this.isReady = true;
		}
	}

	/**
	 * Get current state for URL encoding
	 */
	getEncodedState(): EncodedState {
		const pattern = this.sequencer.pattern;
		return {
			pads: [...this.sampler.pads],
			pattern: {
				...pattern,
				grid: pattern.grid.map((row) => [...row]),
			},
		};
	}

	/**
	 * Sync state to URL (debounced)
	 * Should be called from a $effect in the consuming component
	 */
	syncToUrl(): void {
		if (!this.isReady) return;

		// Use untrack to avoid creating circular dependencies
		untrack(() => {
			this.urlSync.syncToUrl(this.getEncodedState());
		});
	}

	/**
	 * Dispose of resources
	 */
	dispose(): void {
		this.cleanupKeyboard?.();
		this.sampler.dispose();
		this.sequencer.dispose();
		this.urlSync.cleanup();

		if (this.shareMessageTimeout) {
			clearTimeout(this.shareMessageTimeout);
		}
	}

	// --- Pad Actions ---

	/**
	 * Trigger a pad (with audio initialization)
	 */
	triggerPad(padIndex: number): void {
		this.ensureAudioInit();
		this.sampler.trigger(padIndex);
	}

	/**
	 * Select a pad for editing
	 */
	selectPad(padIndex: number): void {
		this.selectedPadIndex = padIndex;
		this.isPadSettingsOpen = true;
	}

	// --- Sample Picker Actions ---

	/**
	 * Open sample picker modal
	 */
	openSamplePicker(): void {
		this.isPadSettingsOpen = false;
		this.isSamplePickerOpen = true;
	}

	/**
	 * Select a sample for the current pad
	 */
	selectSample(sampleId: string | null): void {
		if (this.selectedPadIndex !== null) {
			this.sampler.assignSample(this.selectedPadIndex, sampleId);
		}
		this.isSamplePickerOpen = false;
		this.isPadSettingsOpen = true;
	}

	/**
	 * Close sample picker modal
	 */
	closeSamplePicker(): void {
		this.isSamplePickerOpen = false;
	}

	// --- Pad Settings Actions ---

	/**
	 * Set pitch for selected pad
	 */
	setPitch(pitch: number): void {
		if (this.selectedPadIndex !== null) {
			this.sampler.setPitch(this.selectedPadIndex, pitch);
		}
	}

	/**
	 * Set volume for selected pad
	 */
	setVolume(volume: number): void {
		if (this.selectedPadIndex !== null) {
			this.sampler.setVolume(this.selectedPadIndex, volume);
		}
	}

	/**
	 * Set mute group for selected pad
	 */
	setMuteGroup(muteGroup: number): void {
		if (this.selectedPadIndex !== null) {
			this.sampler.setMuteGroup(this.selectedPadIndex, muteGroup);
		}
	}

	/**
	 * Close pad settings modal
	 */
	closePadSettings(): void {
		this.isPadSettingsOpen = false;
	}

	// --- Transport Actions ---

	/**
	 * Start playback
	 */
	play(): void {
		this.ensureAudioInit();
		this.sequencer.play();
	}

	/**
	 * Stop playback
	 */
	stop(): void {
		this.sequencer.stop();
		this.sampler.stopAll();
	}

	/**
	 * Set BPM
	 */
	setBpm(bpm: number): void {
		this.sequencer.setBpm(bpm);
	}

	/**
	 * Set step count
	 */
	setSteps(steps: number): void {
		this.sequencer.setSteps(steps);
	}

	/**
	 * Clear the pattern
	 */
	clearPattern(): void {
		this.sequencer.clearPattern();
	}

	// --- Share Actions ---

	/**
	 * Share the current state via URL
	 */
	async share(): Promise<void> {
		const success = await this.urlSync.copyShareUrl(this.getEncodedState());

		// Clear any existing timeout
		if (this.shareMessageTimeout) {
			clearTimeout(this.shareMessageTimeout);
		}

		if (success) {
			this.shareMessage = 'Link copied to clipboard!';
		} else {
			this.shareMessage = 'Failed to copy link';
		}

		this.shareMessageTimeout = setTimeout(() => {
			this.shareMessage = null;
		}, 3000);
	}

	// --- Step Grid Actions ---

	/**
	 * Toggle a step in the pattern
	 */
	toggleStep(padIndex: number, stepIndex: number): void {
		this.sequencer.toggleStep(padIndex, stepIndex);
	}

	// --- View Toggle (Mobile) ---

	/**
	 * Set current view (pads or sequencer)
	 */
	setCurrentView(view: 'pads' | 'sequencer'): void {
		this.currentView = view;
	}

	// --- Audio Initialization ---

	/**
	 * Ensure audio context is created and resume if needed.
	 * Safe to call repeatedly -- SamplerStore.init() is idempotent.
	 */
	private ensureAudioInit(): void {
		this.sampler.init();
	}

	// --- Helpers ---

	/**
	 * Get sample name for a pad index
	 */
	getSampleNameForPad(padIndex: number): string {
		const pad = this.sampler.pads[padIndex];
		return this.sampler.getSampleName(pad?.sampleId ?? null);
	}

	/**
	 * Get sample name by ID
	 */
	getSampleName(sampleId: string | null): string {
		return this.sampler.getSampleName(sampleId);
	}
}
