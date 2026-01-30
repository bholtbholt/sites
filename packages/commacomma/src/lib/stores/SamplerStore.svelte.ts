import { SvelteSet } from 'svelte/reactivity';
import { Sampler, type PadConfig } from '../sampler';
import { getAudioEngine } from '../sampler/AudioEngine';
import { getAllSamplesForLoading, getSampleName } from '../shared';

/**
 * Class-based reactive sampler store using Svelte 5 runes.
 * Manages 16 pads with sample assignments, pitch, volume, and mute groups.
 */
export class SamplerStore {
	// Use $state.raw for pads since we replace the whole array, not mutate individual items
	pads = $state.raw<PadConfig[]>([]);

	// Use SvelteSet for efficient reactive Set operations
	triggeredPads = new SvelteSet<number>();

	isLoading = $state(false);
	error = $state<string | null>(null);
	isInitialized = $state(false);

	private sampler: Sampler;
	private unsubscribeTrigger: (() => void) | null = null;

	constructor() {
		this.sampler = new Sampler();
		this.pads = [...this.sampler.getPads()];

		// Subscribe to trigger events for visual feedback
		this.unsubscribeTrigger = this.sampler.onTrigger((padIndex) => {
			this.triggeredPads.add(padIndex);
			// Clear triggered pad after animation delay
			setTimeout(() => {
				this.triggeredPads.delete(padIndex);
			}, 100);
		});
	}

	/**
	 * Initialize the audio engine (call on user gesture)
	 */
	async init(): Promise<void> {
		try {
			await this.sampler.init();
			this.isInitialized = true;
		} catch (e) {
			this.error = e instanceof Error ? e.message : 'Failed to initialize audio';
		}
	}

	/**
	 * Trigger a pad to play its sample
	 */
	trigger(padIndex: number, time?: number): void {
		this.sampler.trigger(padIndex, time);
	}

	/**
	 * Stop a specific pad
	 */
	stop(padIndex: number): void {
		this.sampler.stop(padIndex);
	}

	/**
	 * Stop all playing samples
	 */
	stopAll(): void {
		this.sampler.stopAll();
	}

	/**
	 * Assign a sample to a pad
	 */
	assignSample(padIndex: number, sampleId: string | null): void {
		this.sampler.assignSample(padIndex, sampleId);
		this.pads = [...this.sampler.getPads()];
	}

	/**
	 * Set the pitch for a pad (-12 to +12 semitones)
	 */
	setPitch(padIndex: number, pitch: number): void {
		this.sampler.setPitch(padIndex, pitch);
		this.pads = [...this.sampler.getPads()];
	}

	/**
	 * Set the volume for a pad (0 to 1)
	 */
	setVolume(padIndex: number, volume: number): void {
		this.sampler.setVolume(padIndex, volume);
		this.pads = [...this.sampler.getPads()];
	}

	/**
	 * Set the mute group for a pad (0 = none, 1-4 = group)
	 */
	setMuteGroup(padIndex: number, muteGroup: number): void {
		this.sampler.setMuteGroup(padIndex, muteGroup);
		this.pads = [...this.sampler.getPads()];
	}

	/**
	 * Load all samples from the library
	 */
	async loadSamples(): Promise<void> {
		this.isLoading = true;
		this.error = null;

		try {
			// Ensure context is initialized
			getAudioEngine().getContext();

			const samples = getAllSamplesForLoading();
			await this.sampler.loadSamples(samples);
		} catch (e) {
			this.error = e instanceof Error ? e.message : 'Failed to load samples';
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Set all pad configurations at once
	 */
	setPads(newPads: PadConfig[]): void {
		this.sampler.setPads(newPads);
		this.pads = [...this.sampler.getPads()];
	}

	/**
	 * Get the display name for a sample
	 */
	getSampleName(sampleId: string | null): string {
		return getSampleName(sampleId);
	}

	/**
	 * Get the current audio context time
	 */
	get currentTime(): number {
		return this.sampler.currentTime;
	}

	/**
	 * Get the underlying Sampler instance (for advanced use)
	 */
	get samplerInstance(): Sampler {
		return this.sampler;
	}

	/**
	 * Dispose of resources
	 */
	dispose(): void {
		this.unsubscribeTrigger?.();
		this.sampler.dispose();
	}
}

/**
 * Default pad assignments for a fresh start
 */
export function getDefaultPadAssignments(): Array<{
	padIndex: number;
	sampleId: string;
}> {
	return [
		{ padIndex: 0, sampleId: 'ark-kick' },
		{ padIndex: 1, sampleId: 'bam-kick' },
		{ padIndex: 2, sampleId: 'shanty-sn' },
		{ padIndex: 3, sampleId: 'shawty-sn' },
		{ padIndex: 4, sampleId: 'root-hh-a' },
		{ padIndex: 5, sampleId: 'root-hh-b' },
		{ padIndex: 6, sampleId: 'root-oh' },
		{ padIndex: 7, sampleId: 'smugl-hh' },
		{ padIndex: 8, sampleId: 'alban-bass' },
		{ padIndex: 9, sampleId: 'bell-bass' },
		{ padIndex: 10, sampleId: 'cs-bass-a' },
		{ padIndex: 11, sampleId: 'cs-bass-b' },
		{ padIndex: 12, sampleId: 'baby-g-drms-a' },
		{ padIndex: 13, sampleId: 'baby-g-bass-a' },
		{ padIndex: 14, sampleId: 'baby-g-mel-a' },
		{ padIndex: 15, sampleId: 'baby-g-fill-a' },
	];
}
