import type { PadConfig } from '../sampler/types';
import type { Pattern } from '../sequencer/types';

/**
 * Complete state that can be encoded to a URL
 */
export interface EncodedState {
	pads: PadConfig[];
	pattern: Pattern;
}

/**
 * Compact representation for encoding
 * Uses shorter keys and omits defaults to reduce URL length
 */
interface CompactPad {
	s?: string; // sampleId (omit if null)
	p?: number; // pitch (omit if 0)
	v?: number; // volume (omit if 1)
	m?: number; // muteGroup (omit if 0)
}

interface CompactPattern {
	t: number; // steps
	b: number; // bpm
	g: string; // grid as binary string
}

interface CompactState {
	p: CompactPad[];
	q: CompactPattern;
}

/**
 * Encode the state to a URL-safe string
 */
export function encodeState(state: EncodedState): string {
	try {
		const compact = toCompact(state);
		const json = JSON.stringify(compact);
		// Use base64url encoding (URL-safe variant)
		const base64 = btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		return base64;
	} catch (error) {
		console.error('Failed to encode state:', error);
		return '';
	}
}

/**
 * Decode a URL-safe string back to state
 */
export function decodeState(encoded: string): EncodedState | null {
	try {
		// Restore base64 padding
		let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
		while (base64.length % 4) {
			base64 += '=';
		}

		const json = atob(base64);
		const compact = JSON.parse(json) as CompactState;
		return fromCompact(compact);
	} catch (error) {
		console.error('Failed to decode state:', error);
		return null;
	}
}

/**
 * Get the current share URL
 */
export function getShareUrl(state: EncodedState): string {
	const encoded = encodeState(state);
	const url = new URL(window.location.href);
	url.searchParams.set('s', encoded);
	return url.toString();
}

/**
 * Parse state from the current URL
 */
export function parseUrlState(): EncodedState | null {
	const url = new URL(window.location.href);
	const encoded = url.searchParams.get('s');
	if (!encoded) return null;
	return decodeState(encoded);
}

/**
 * Copy URL to clipboard
 */
export async function copyShareUrl(state: EncodedState): Promise<boolean> {
	try {
		const url = getShareUrl(state);
		await navigator.clipboard.writeText(url);
		return true;
	} catch (error) {
		console.error('Failed to copy URL:', error);
		return false;
	}
}

/**
 * Convert full state to compact representation
 */
function toCompact(state: EncodedState): CompactState {
	const compactPads: CompactPad[] = state.pads.map((pad) => {
		const compact: CompactPad = {};
		if (pad.sampleId !== null) compact.s = pad.sampleId;
		if (pad.pitch !== 0) compact.p = pad.pitch;
		if (pad.volume !== 1) compact.v = Math.round(pad.volume * 100) / 100;
		if (pad.muteGroup !== 0) compact.m = pad.muteGroup;
		return compact;
	});

	// Encode grid as a binary string (more compact than boolean array)
	const gridBinary = encodeGrid(state.pattern.grid, state.pattern.steps);

	const compactPattern: CompactPattern = {
		t: state.pattern.steps,
		b: state.pattern.bpm,
		g: gridBinary,
	};

	return {
		p: compactPads,
		q: compactPattern,
	};
}

/**
 * Convert compact representation back to full state
 */
function fromCompact(compact: CompactState): EncodedState {
	const pads: PadConfig[] = compact.p.map((cp) => ({
		sampleId: cp.s ?? null,
		pitch: cp.p ?? 0,
		volume: cp.v ?? 1,
		muteGroup: cp.m ?? 0,
	}));

	// Ensure we have 16 pads
	while (pads.length < 16) {
		pads.push({
			sampleId: null,
			pitch: 0,
			volume: 1,
			muteGroup: 0,
		});
	}

	const grid = decodeGrid(compact.q.g, compact.q.t);

	const pattern: Pattern = {
		steps: compact.q.t,
		bpm: compact.q.b,
		grid,
	};

	return { pads, pattern };
}

/**
 * Encode the grid as a binary string
 * Each character represents 6 bits (base64-like but simpler)
 */
function encodeGrid(grid: boolean[][], steps: number): string {
	const bits: boolean[] = [];

	// Flatten grid: pad0step0, pad0step1, ..., pad0stepN, pad1step0, ...
	for (let pad = 0; pad < 16; pad++) {
		for (let step = 0; step < steps; step++) {
			bits.push(grid[pad]?.[step] ?? false);
		}
	}

	// Convert to hex string (4 bits per character)
	let hex = '';
	for (let i = 0; i < bits.length; i += 4) {
		let value = 0;
		for (let j = 0; j < 4 && i + j < bits.length; j++) {
			if (bits[i + j]) {
				value |= 1 << (3 - j);
			}
		}
		hex += value.toString(16);
	}

	return hex;
}

/**
 * Decode the grid from a binary string
 */
function decodeGrid(encoded: string, steps: number): boolean[][] {
	const grid: boolean[][] = [];

	// Convert hex to bits
	const bits: boolean[] = [];
	for (const char of encoded) {
		const value = parseInt(char, 16);
		for (let j = 3; j >= 0; j--) {
			bits.push((value & (1 << j)) !== 0);
		}
	}

	// Unflatten into grid
	let bitIndex = 0;
	for (let pad = 0; pad < 16; pad++) {
		grid[pad] = [];
		for (let step = 0; step < steps; step++) {
			grid[pad][step] = bits[bitIndex] ?? false;
			bitIndex++;
		}
	}

	return grid;
}
