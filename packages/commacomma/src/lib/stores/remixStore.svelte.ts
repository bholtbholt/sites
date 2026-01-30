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

		try {
			this.sequencer.init();

			// Load samples with timeout protection
			const loadTimeout = new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Sample loading timeout')), 10000),
			);

			try {
				await Promise.race([this.sampler.loadSamples(), loadTimeout]);
			} catch (loadError) {
				console.error('Sample loading failed:', loadError);
				// Continue anyway - show the interface even if samples fail to load
			}

			// Check for URL state (non-blocking)
			const urlState = this.urlSync.initFromUrl();
			if (urlState) {
				// Restore from URL
				this.sampler.setPads(urlState.pads);
				this.sequencer.setPattern(urlState.pattern);
			} else {
				// Apply default pad assignments
				const defaults = getDefaultPadAssignments();
				for (const { padIndex, sampleId } of defaults) {
					this.sampler.assignSample(padIndex, sampleId);
				}

				// Set default step count based on screen size
				// Mobile: 4 steps, Desktop: 16 steps
				const isMobile = window.innerWidth < 640; // sm breakpoint
				if (isMobile) {
					this.sequencer.setSteps(4);
				}
			}

			// Set up keyboard handler
			this.cleanupKeyboard = createKeyboardHandler((padIndex) => {
				// Ensure audio is initialized on first keypress
				this.sampler.init();
				this.sampler.trigger(padIndex);
			});
		} catch (error) {
			console.error('Initialization error:', error);
			// Continue anyway - better to show a partially working interface
		} finally {
			// Always set isReady to true so the interface is shown
			this.isReady = true;
		}
	}

	/**
	 * Get current state for URL encoding
	 */
	getEncodedState(): EncodedState {
		return {
			pads: [...this.sampler.pads],
			pattern: this.sequencer.pattern,
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
		// Ensure audio is initialized on first interaction
		this.sampler.init();
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
		this.sampler.init();
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
