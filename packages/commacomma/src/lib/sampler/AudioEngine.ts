import type { LoadedSample, PlayingVoice } from './types';

/**
 * AudioEngine handles all Web Audio API interactions.
 * It manages the AudioContext, loads samples, and handles playback.
 */
export class AudioEngine {
	private context: AudioContext | null = null;
	private samples: Map<string, AudioBuffer> = new Map();
	private activeVoices: Map<number, PlayingVoice[]> = new Map();

	/**
	 * Get or create the AudioContext.
	 * Must be called after a user gesture to satisfy browser autoplay policies.
	 */
	getContext(): AudioContext {
		if (!this.context) {
			this.context = new AudioContext();
		}
		return this.context;
	}

	/**
	 * Resume the AudioContext if it's suspended.
	 * Should be called on user interaction to handle autoplay restrictions.
	 */
	async resume(): Promise<void> {
		const ctx = this.getContext();
		if (ctx.state === 'suspended') {
			await ctx.resume();
		}
	}

	/**
	 * Get the current audio time (for scheduling)
	 */
	get currentTime(): number {
		return this.context?.currentTime ?? 0;
	}

	/**
	 * Load a sample from a URL
	 */
	async loadSample(id: string, url: string): Promise<LoadedSample> {
		const ctx = this.getContext();

		// Check if already loaded
		const existing = this.samples.get(id);
		if (existing) {
			return { id, buffer: existing, name: id };
		}

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch sample: ${response.statusText}`);
			}

			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

			this.samples.set(id, audioBuffer);

			return { id, buffer: audioBuffer, name: id };
		} catch (error) {
			console.error(`Failed to load sample ${id}:`, error);
			throw error;
		}
	}

	/**
	 * Load multiple samples in parallel
	 */
	async loadSamples(samples: Array<{ id: string; url: string }>): Promise<LoadedSample[]> {
		const results = await Promise.allSettled(samples.map((s) => this.loadSample(s.id, s.url)));

		return results
			.filter((r): r is PromiseFulfilledResult<LoadedSample> => r.status === 'fulfilled')
			.map((r) => r.value);
	}

	/**
	 * Check if a sample is loaded
	 */
	hasSample(id: string): boolean {
		return this.samples.has(id);
	}

	/**
	 * Get a loaded sample buffer
	 */
	getSample(id: string): AudioBuffer | undefined {
		return this.samples.get(id);
	}

	/**
	 * Play a sample with pitch and volume adjustments
	 * @param sampleId - The ID of the sample to play
	 * @param padIndex - The pad index (for tracking active voices)
	 * @param pitch - Pitch adjustment in semitones (-12 to +12)
	 * @param volume - Volume (0 to 1)
	 * @param when - When to start playback (AudioContext time), defaults to now
	 * @returns The playing voice, or null if sample not found
	 */
	playSample(
		sampleId: string,
		padIndex: number,
		pitch: number = 0,
		volume: number = 1,
		when?: number,
	): PlayingVoice | null {
		const buffer = this.samples.get(sampleId);
		if (!buffer) {
			console.warn(`Sample not found: ${sampleId}`);
			return null;
		}

		const ctx = this.getContext();
		const startTime = when ?? ctx.currentTime;

		// Create source node
		const source = ctx.createBufferSource();
		source.buffer = buffer;

		// Apply pitch via playback rate
		// 12 semitones = 1 octave = 2x playback rate
		source.playbackRate.value = Math.pow(2, pitch / 12);

		// Create gain node for volume
		const gainNode = ctx.createGain();
		gainNode.gain.value = Math.max(0, Math.min(1, volume));

		// Connect: source -> gain -> destination
		source.connect(gainNode);
		gainNode.connect(ctx.destination);

		// Track the voice
		const voice: PlayingVoice = {
			padIndex,
			source,
			gainNode,
			startTime,
		};

		// Add to active voices for this pad
		if (!this.activeVoices.has(padIndex)) {
			this.activeVoices.set(padIndex, []);
		}
		this.activeVoices.get(padIndex)!.push(voice);

		// Clean up when playback ends
		source.onended = () => {
			this.removeVoice(padIndex, voice);
		};

		// Start playback
		source.start(startTime);

		return voice;
	}

	/**
	 * Stop all voices for a specific pad
	 */
	stopPad(padIndex: number): void {
		const voices = this.activeVoices.get(padIndex);
		if (!voices) return;

		for (const voice of voices) {
			try {
				voice.source.stop();
			} catch {
				// Already stopped
			}
		}

		this.activeVoices.set(padIndex, []);
	}

	/**
	 * Stop all playing voices
	 */
	stopAll(): void {
		for (const [padIndex] of this.activeVoices) {
			this.stopPad(padIndex);
		}
	}

	/**
	 * Remove a voice from tracking
	 */
	private removeVoice(padIndex: number, voice: PlayingVoice): void {
		const voices = this.activeVoices.get(padIndex);
		if (!voices) return;

		const index = voices.indexOf(voice);
		if (index !== -1) {
			voices.splice(index, 1);
		}
	}

	/**
	 * Check if a pad is currently playing
	 */
	isPadPlaying(padIndex: number): boolean {
		const voices = this.activeVoices.get(padIndex);
		return voices !== undefined && voices.length > 0;
	}

	/**
	 * Dispose of the audio engine
	 */
	dispose(): void {
		this.stopAll();
		if (this.context) {
			this.context.close();
			this.context = null;
		}
		this.samples.clear();
		this.activeVoices.clear();
	}
}

/**
 * Singleton instance of the audio engine
 */
let audioEngineInstance: AudioEngine | null = null;

/**
 * Get the singleton AudioEngine instance
 */
export function getAudioEngine(): AudioEngine {
	if (!audioEngineInstance) {
		audioEngineInstance = new AudioEngine();
	}
	return audioEngineInstance;
}
