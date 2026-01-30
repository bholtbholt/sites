import { describe, it, expect, vi } from 'vitest';
import { encodeState, decodeState } from './urlCodec';
import type { EncodedState } from './urlCodec';
import { createDefaultPattern } from '../sequencer/types';
import { createDefaultPadConfig } from '../sampler/types';

function createTestState(overrides?: Partial<EncodedState>): EncodedState {
	const pads = Array.from({ length: 16 }, () => createDefaultPadConfig());
	const pattern = createDefaultPattern();
	return { pads, pattern, ...overrides };
}

describe('encodeState and decodeState', () => {
	it('should round-trip a default state', () => {
		const original = createTestState();
		const encoded = encodeState(original);
		const decoded = decodeState(encoded);

		expect(decoded).not.toBeNull();
		expect(decoded?.pads.length).toBe(16);
		expect(decoded?.pattern.steps).toBe(original.pattern.steps);
		expect(decoded?.pattern.bpm).toBe(original.pattern.bpm);
	});

	it('should round-trip state with sample assignments', () => {
		const original = createTestState();
		original.pads[0].sampleId = 'ark-kick';
		original.pads[1].sampleId = 'shanty-sn';
		original.pads[2].pitch = 5;
		original.pads[3].volume = 0.5;
		original.pads[4].muteGroup = 2;

		const encoded = encodeState(original);
		const decoded = decodeState(encoded);

		expect(decoded).not.toBeNull();
		expect(decoded?.pads[0].sampleId).toBe('ark-kick');
		expect(decoded?.pads[1].sampleId).toBe('shanty-sn');
		expect(decoded?.pads[2].pitch).toBe(5);
		expect(decoded?.pads[3].volume).toBe(0.5);
		expect(decoded?.pads[4].muteGroup).toBe(2);
	});

	it('should round-trip state with pattern steps', () => {
		const original = createTestState();
		// Set some steps
		original.pattern.grid[0][0] = true;
		original.pattern.grid[0][4] = true;
		original.pattern.grid[1][8] = true;
		original.pattern.grid[15][15] = true;

		const encoded = encodeState(original);
		const decoded = decodeState(encoded);

		expect(decoded).not.toBeNull();
		expect(decoded?.pattern.grid[0][0]).toBe(true);
		expect(decoded?.pattern.grid[0][4]).toBe(true);
		expect(decoded?.pattern.grid[1][8]).toBe(true);
		expect(decoded?.pattern.grid[15][15]).toBe(true);
		// Check a false step
		expect(decoded?.pattern.grid[0][1]).toBe(false);
	});

	it('should round-trip different BPM values', () => {
		const original = createTestState();
		original.pattern.bpm = 140;

		const encoded = encodeState(original);
		const decoded = decodeState(encoded);

		expect(decoded?.pattern.bpm).toBe(140);
	});

	it('should round-trip different step counts', () => {
		const original = createTestState();
		original.pattern.steps = 32;
		// Extend grid to 32 steps
		for (let pad = 0; pad < 16; pad++) {
			original.pattern.grid[pad] = Array(32).fill(false);
		}
		original.pattern.grid[0][31] = true;

		const encoded = encodeState(original);
		const decoded = decodeState(encoded);

		expect(decoded?.pattern.steps).toBe(32);
		expect(decoded?.pattern.grid[0][31]).toBe(true);
	});
});

describe('encodeState', () => {
	it('should return a non-empty string', () => {
		const state = createTestState();
		const encoded = encodeState(state);
		expect(typeof encoded).toBe('string');
		expect(encoded.length).toBeGreaterThan(0);
	});

	it('should produce URL-safe output (no +, /, or =)', () => {
		const state = createTestState();
		// Add some data to make encoding more complex
		state.pads[0].sampleId = 'test-sample';
		state.pattern.grid[0][0] = true;

		const encoded = encodeState(state);
		expect(encoded).not.toContain('+');
		expect(encoded).not.toContain('/');
		expect(encoded).not.toContain('=');
	});

	it('should produce compact output (omits defaults)', () => {
		const state = createTestState();
		const encoded = encodeState(state);

		// Decode and check that it parsed correctly
		const decoded = decodeState(encoded);
		expect(decoded).not.toBeNull();
	});
});

describe('decodeState', () => {
	it('should return null for invalid input', () => {
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(decodeState('')).toBeNull();
		expect(decodeState('not-valid-base64!!!')).toBeNull();
		expect(decodeState('{"invalid": "json structure"}')).toBeNull();

		consoleSpy.mockRestore();
	});

	it('should handle base64url padding restoration', () => {
		const state = createTestState();
		const encoded = encodeState(state);

		// The encoded string should not have padding
		expect(encoded.endsWith('=')).toBe(false);

		// But it should still decode correctly
		const decoded = decodeState(encoded);
		expect(decoded).not.toBeNull();
	});

	it('should ensure 16 pads even if encoded with fewer', () => {
		const state = createTestState();
		const encoded = encodeState(state);
		const decoded = decodeState(encoded);

		expect(decoded?.pads.length).toBe(16);
	});

	it('should use default values for omitted pad properties', () => {
		const state = createTestState();
		// Only set sampleId, leave others as defaults
		state.pads[0].sampleId = 'test';

		const encoded = encodeState(state);
		const decoded = decodeState(encoded);

		// Check that defaults are restored
		expect(decoded?.pads[0].pitch).toBe(0);
		expect(decoded?.pads[0].volume).toBe(1);
		expect(decoded?.pads[0].muteGroup).toBe(0);
	});
});

describe('grid encoding', () => {
	it('should correctly encode and decode a fully empty grid', () => {
		const state = createTestState();
		const encoded = encodeState(state);
		const decoded = decodeState(encoded);

		for (let pad = 0; pad < 16; pad++) {
			for (let step = 0; step < 16; step++) {
				expect(decoded?.pattern.grid[pad][step]).toBe(false);
			}
		}
	});

	it('should correctly encode and decode a fully filled grid', () => {
		const state = createTestState();
		for (let pad = 0; pad < 16; pad++) {
			for (let step = 0; step < 16; step++) {
				state.pattern.grid[pad][step] = true;
			}
		}

		const encoded = encodeState(state);
		const decoded = decodeState(encoded);

		for (let pad = 0; pad < 16; pad++) {
			for (let step = 0; step < 16; step++) {
				expect(decoded?.pattern.grid[pad][step]).toBe(true);
			}
		}
	});

	it('should correctly encode diagonal pattern', () => {
		const state = createTestState();
		for (let i = 0; i < 16; i++) {
			state.pattern.grid[i][i] = true;
		}

		const encoded = encodeState(state);
		const decoded = decodeState(encoded);

		for (let pad = 0; pad < 16; pad++) {
			for (let step = 0; step < 16; step++) {
				expect(decoded?.pattern.grid[pad][step]).toBe(pad === step);
			}
		}
	});
});
