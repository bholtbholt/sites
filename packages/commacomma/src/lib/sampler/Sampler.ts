import { getAudioEngine, type AudioEngine } from './AudioEngine';
import {
	type PadConfig,
	type PlayingVoice,
	createDefaultPadConfig,
	PAD_COUNT,
	MUTE_GROUP_COUNT,
} from './types';

export type TriggerCallback = (padIndex: number) => void;

/**
 * Sampler manages 16 pads, their configurations, and mute groups.
 * It coordinates with the AudioEngine for actual audio playback.
 */
export class Sampler {
	private engine: AudioEngine;
	private pads: PadConfig[];
	private muteGroupVoices: Map<number, PlayingVoice> = new Map();
	private onTriggerCallbacks: Set<TriggerCallback> = new Set();

	constructor(engine?: AudioEngine) {
		this.engine = engine ?? getAudioEngine();
		this.pads = Array.from({ length: PAD_COUNT }, () => createDefaultPadConfig());
	}

	/**
	 * Initialize the audio engine (resume context)
	 * Should be called on user interaction
	 */
	async init(): Promise<void> {
		await this.engine.resume();
	}

	/**
	 * Get the current audio time
	 */
	get currentTime(): number {
		return this.engine.currentTime;
	}

	/**
	 * Get all pad configurations
	 */
	getPads(): readonly PadConfig[] {
		return this.pads;
	}

	/**
	 * Get a specific pad configuration
	 */
	getPad(index: number): PadConfig | undefined {
		return this.pads[index];
	}

	/**
	 * Set pad configuration
	 */
	setPad(index: number, config: Partial<PadConfig>): void {
		if (index < 0 || index >= PAD_COUNT) return;

		this.pads[index] = {
			...this.pads[index],
			...config,
		};
	}

	/**
	 * Set all pad configurations at once
	 */
	setPads(configs: PadConfig[]): void {
		for (let i = 0; i < Math.min(configs.length, PAD_COUNT); i++) {
			this.pads[i] = { ...configs[i] };
		}
	}

	/**
	 * Assign a sample to a pad
	 */
	assignSample(padIndex: number, sampleId: string | null): void {
		this.setPad(padIndex, { sampleId });
	}

	/**
	 * Set the pitch for a pad
	 */
	setPitch(padIndex: number, pitch: number): void {
		// Clamp to -12 to +12
		const clampedPitch = Math.max(-12, Math.min(12, pitch));
		this.setPad(padIndex, { pitch: clampedPitch });
	}

	/**
	 * Set the volume for a pad
	 */
	setVolume(padIndex: number, volume: number): void {
		// Clamp to 0 to 1
		const clampedVolume = Math.max(0, Math.min(1, volume));
		this.setPad(padIndex, { volume: clampedVolume });
	}

	/**
	 * Set the mute group for a pad
	 */
	setMuteGroup(padIndex: number, muteGroup: number): void {
		// Clamp to 0 to MUTE_GROUP_COUNT
		const clampedGroup = Math.max(0, Math.min(MUTE_GROUP_COUNT, muteGroup));
		this.setPad(padIndex, { muteGroup: clampedGroup });
	}

	/**
	 * Trigger a pad to play its sample
	 * @param padIndex - The pad index to trigger
	 * @param when - Optional AudioContext time to schedule playback
	 * @returns The playing voice, or null if no sample assigned
	 */
	trigger(padIndex: number, when?: number): PlayingVoice | null {
		const pad = this.pads[padIndex];
		if (!pad || !pad.sampleId) return null;

		// Handle mute groups - stop any playing sample in the same group
		if (pad.muteGroup > 0) {
			const existingVoice = this.muteGroupVoices.get(pad.muteGroup);
			if (existingVoice) {
				try {
					existingVoice.source.stop();
				} catch {
					// Already stopped
				}
			}
		}

		// Play the sample
		const voice = this.engine.playSample(pad.sampleId, padIndex, pad.pitch, pad.volume, when);

		// Track in mute group
		if (voice && pad.muteGroup > 0) {
			this.muteGroupVoices.set(pad.muteGroup, voice);

			// Clean up when voice ends
			voice.source.onended = () => {
				const current = this.muteGroupVoices.get(pad.muteGroup);
				if (current === voice) {
					this.muteGroupVoices.delete(pad.muteGroup);
				}
			};
		}

		// Notify callbacks
		this.notifyTrigger(padIndex);

		return voice;
	}

	/**
	 * Stop a specific pad
	 */
	stop(padIndex: number): void {
		this.engine.stopPad(padIndex);
	}

	/**
	 * Stop all playing samples
	 */
	stopAll(): void {
		this.engine.stopAll();
		this.muteGroupVoices.clear();
	}

	/**
	 * Check if a sample is loaded
	 */
	hasSample(sampleId: string): boolean {
		return this.engine.hasSample(sampleId);
	}

	/**
	 * Load a sample
	 */
	async loadSample(id: string, url: string): Promise<void> {
		await this.engine.loadSample(id, url);
	}

	/**
	 * Load multiple samples
	 */
	async loadSamples(samples: Array<{ id: string; url: string }>): Promise<void> {
		await this.engine.loadSamples(samples);
	}

	/**
	 * Register a callback for when a pad is triggered
	 */
	onTrigger(callback: TriggerCallback): () => void {
		this.onTriggerCallbacks.add(callback);
		return () => this.onTriggerCallbacks.delete(callback);
	}

	/**
	 * Notify all trigger callbacks
	 */
	private notifyTrigger(padIndex: number): void {
		for (const callback of this.onTriggerCallbacks) {
			callback(padIndex);
		}
	}

	/**
	 * Get the number of pads
	 */
	get padCount(): number {
		return PAD_COUNT;
	}

	/**
	 * Dispose of the sampler
	 */
	dispose(): void {
		this.stopAll();
		this.onTriggerCallbacks.clear();
	}
}
