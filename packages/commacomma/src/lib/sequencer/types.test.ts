import { describe, it, expect } from 'vitest';
import {
	createDefaultPattern,
	resizePattern,
	DEFAULT_BPM,
	DEFAULT_STEPS,
	MIN_BPM,
	MAX_BPM,
	MIN_STEPS,
	MAX_STEPS,
	PAD_COUNT,
} from './types';

describe('constants', () => {
	it('should have correct default values', () => {
		expect(DEFAULT_BPM).toBe(92);
		expect(DEFAULT_STEPS).toBe(16);
	});

	it('should have correct min/max values', () => {
		expect(MIN_BPM).toBe(40);
		expect(MAX_BPM).toBe(200);
		expect(MIN_STEPS).toBe(1);
		expect(MAX_STEPS).toBe(64);
	});

	it('should have 16 pads', () => {
		expect(PAD_COUNT).toBe(16);
	});
});

describe('createDefaultPattern', () => {
	it('should create pattern with default values', () => {
		const pattern = createDefaultPattern();
		expect(pattern.steps).toBe(DEFAULT_STEPS);
		expect(pattern.bpm).toBe(DEFAULT_BPM);
	});

	it('should create 16 pad rows', () => {
		const pattern = createDefaultPattern();
		expect(pattern.grid.length).toBe(PAD_COUNT);
	});

	it('should create correct number of steps per pad', () => {
		const pattern = createDefaultPattern();
		for (const row of pattern.grid) {
			expect(row.length).toBe(DEFAULT_STEPS);
		}
	});

	it('should initialize all steps to false', () => {
		const pattern = createDefaultPattern();
		for (const row of pattern.grid) {
			for (const step of row) {
				expect(step).toBe(false);
			}
		}
	});

	it('should accept custom step count', () => {
		const pattern = createDefaultPattern(32);
		expect(pattern.steps).toBe(32);
		for (const row of pattern.grid) {
			expect(row.length).toBe(32);
		}
	});

	it('should accept custom BPM', () => {
		const pattern = createDefaultPattern(16, 120);
		expect(pattern.bpm).toBe(120);
	});

	it('should accept both custom steps and BPM', () => {
		const pattern = createDefaultPattern(8, 140);
		expect(pattern.steps).toBe(8);
		expect(pattern.bpm).toBe(140);
		for (const row of pattern.grid) {
			expect(row.length).toBe(8);
		}
	});
});

describe('resizePattern', () => {
	it('should expand pattern to more steps', () => {
		const original = createDefaultPattern(16);
		original.grid[0][0] = true;
		original.grid[0][15] = true;

		const resized = resizePattern(original, 32);

		expect(resized.steps).toBe(32);
		expect(resized.grid[0][0]).toBe(true);
		expect(resized.grid[0][15]).toBe(true);
		expect(resized.grid[0][16]).toBe(false);
		expect(resized.grid[0][31]).toBe(false);
	});

	it('should contract pattern to fewer steps', () => {
		const original = createDefaultPattern(32);
		original.grid[0][0] = true;
		original.grid[0][31] = true;

		const resized = resizePattern(original, 16);

		expect(resized.steps).toBe(16);
		expect(resized.grid[0][0]).toBe(true);
		// Step 31 should be lost
		expect(resized.grid[0].length).toBe(16);
	});

	it('should preserve BPM when resizing', () => {
		const original = createDefaultPattern(16, 140);
		const resized = resizePattern(original, 32);
		expect(resized.bpm).toBe(140);
	});

	it('should clamp to MIN_STEPS', () => {
		const original = createDefaultPattern(16);
		const resized = resizePattern(original, 0);
		expect(resized.steps).toBe(MIN_STEPS);
	});

	it('should clamp to MAX_STEPS', () => {
		const original = createDefaultPattern(16);
		const resized = resizePattern(original, 100);
		expect(resized.steps).toBe(MAX_STEPS);
	});

	it('should handle negative step count by clamping to MIN_STEPS', () => {
		const original = createDefaultPattern(16);
		const resized = resizePattern(original, -5);
		expect(resized.steps).toBe(MIN_STEPS);
	});

	it('should create new grid arrays (not mutate original)', () => {
		const original = createDefaultPattern(16);
		original.grid[0][0] = true;

		const resized = resizePattern(original, 32);
		resized.grid[0][0] = false;

		expect(original.grid[0][0]).toBe(true);
	});

	it('should maintain 16 pad rows after resize', () => {
		const original = createDefaultPattern(16);
		const resized = resizePattern(original, 8);
		expect(resized.grid.length).toBe(PAD_COUNT);
	});

	it('should handle missing grid rows gracefully', () => {
		const original = createDefaultPattern(16);
		// Simulate a corrupted pattern with missing rows
		original.grid.length = 8;

		const resized = resizePattern(original, 16);

		expect(resized.grid.length).toBe(PAD_COUNT);
		// Rows 8-15 should be created with false values
		for (let pad = 8; pad < 16; pad++) {
			expect(resized.grid[pad].length).toBe(16);
			for (const step of resized.grid[pad]) {
				expect(step).toBe(false);
			}
		}
	});
});
