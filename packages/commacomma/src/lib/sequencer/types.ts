/**
 * Pattern data structure
 */
export interface Pattern {
	steps: number; // 1-64
	bpm: number;
	grid: boolean[][]; // [padIndex][stepIndex]
}

/**
 * Sequencer playback state
 */
export type PlayState = 'stopped' | 'playing';

/**
 * Callback for step events
 */
export type StepCallback = (stepIndex: number, time: number) => void;

/**
 * Callback for playback state changes
 */
export type PlayStateCallback = (state: PlayState) => void;

/**
 * Default BPM
 */
export const DEFAULT_BPM = 92;

/**
 * Default step count
 */
export const DEFAULT_STEPS = 16;

/**
 * Minimum BPM
 */
export const MIN_BPM = 40;

/**
 * Maximum BPM
 */
export const MAX_BPM = 200;

/**
 * Minimum step count
 */
export const MIN_STEPS = 1;

/**
 * Maximum step count
 */
export const MAX_STEPS = 64;

/**
 * Number of pads
 */
export const PAD_COUNT = 16;

/**
 * Create a default empty pattern
 */
export function createDefaultPattern(
	steps: number = DEFAULT_STEPS,
	bpm: number = DEFAULT_BPM,
): Pattern {
	const grid: boolean[][] = [];
	for (let pad = 0; pad < PAD_COUNT; pad++) {
		grid[pad] = Array(steps).fill(false);
	}
	return { steps, bpm, grid };
}

/**
 * Resize a pattern to a new step count
 */
export function resizePattern(pattern: Pattern, newSteps: number): Pattern {
	const clampedSteps = Math.max(MIN_STEPS, Math.min(MAX_STEPS, newSteps));
	const newGrid: boolean[][] = [];

	for (let pad = 0; pad < PAD_COUNT; pad++) {
		const oldRow = pattern.grid[pad] || [];
		const newRow: boolean[] = [];

		for (let step = 0; step < clampedSteps; step++) {
			newRow[step] = oldRow[step] ?? false;
		}

		newGrid[pad] = newRow;
	}

	return {
		...pattern,
		steps: clampedSteps,
		grid: newGrid,
	};
}
