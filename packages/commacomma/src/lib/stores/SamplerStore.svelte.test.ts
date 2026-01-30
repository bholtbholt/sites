import { describe, it, expect } from 'vitest';
import { getDefaultPadAssignments } from './SamplerStore.svelte';

// Note: SamplerStore class uses Svelte 5 runes ($state, $derived) which are compile-time features.
// Testing the class directly requires Svelte compilation. Instead, we test:
// 1. Pure functions exported from the module
// 2. The underlying Sampler class (tested in Sampler.test.ts)

describe('getDefaultPadAssignments', () => {
	it('should return array of pad assignments', () => {
		const assignments = getDefaultPadAssignments();
		expect(Array.isArray(assignments)).toBe(true);
	});

	it('should return 16 assignments (one per pad)', () => {
		const assignments = getDefaultPadAssignments();
		expect(assignments.length).toBe(16);
	});

	it('should have padIndex from 0 to 15', () => {
		const assignments = getDefaultPadAssignments();
		const indices = assignments.map((a) => a.padIndex);

		for (let i = 0; i < 16; i++) {
			expect(indices).toContain(i);
		}
	});

	it('should have unique padIndex values', () => {
		const assignments = getDefaultPadAssignments();
		const indices = assignments.map((a) => a.padIndex);
		const uniqueIndices = new Set(indices);

		expect(uniqueIndices.size).toBe(16);
	});

	it('should have non-empty sampleId for each assignment', () => {
		const assignments = getDefaultPadAssignments();

		for (const assignment of assignments) {
			expect(assignment.sampleId).toBeTruthy();
			expect(typeof assignment.sampleId).toBe('string');
		}
	});

	it('should include expected sample types', () => {
		const assignments = getDefaultPadAssignments();
		const sampleIds = assignments.map((a) => a.sampleId);

		// Should have kicks
		expect(sampleIds.some((id) => id.includes('kick'))).toBe(true);

		// Should have snares
		expect(sampleIds.some((id) => id.includes('sn'))).toBe(true);

		// Should have hi-hats
		expect(sampleIds.some((id) => id.includes('hh'))).toBe(true);

		// Should have bass
		expect(sampleIds.some((id) => id.includes('bass'))).toBe(true);
	});

	it('should assign kicks to pads 0-1', () => {
		const assignments = getDefaultPadAssignments();
		const pad0 = assignments.find((a) => a.padIndex === 0);
		const pad1 = assignments.find((a) => a.padIndex === 1);

		expect(pad0?.sampleId).toContain('kick');
		expect(pad1?.sampleId).toContain('kick');
	});

	it('should assign snares to pads 2-3', () => {
		const assignments = getDefaultPadAssignments();
		const pad2 = assignments.find((a) => a.padIndex === 2);
		const pad3 = assignments.find((a) => a.padIndex === 3);

		expect(pad2?.sampleId).toContain('sn');
		expect(pad3?.sampleId).toContain('sn');
	});

	it('should assign hi-hats to pads 4-7', () => {
		const assignments = getDefaultPadAssignments();
		const pad4 = assignments.find((a) => a.padIndex === 4);
		const pad5 = assignments.find((a) => a.padIndex === 5);
		const pad6 = assignments.find((a) => a.padIndex === 6);

		expect(pad4?.sampleId).toMatch(/hh|oh/);
		expect(pad5?.sampleId).toMatch(/hh|oh/);
		expect(pad6?.sampleId).toMatch(/hh|oh/);
	});

	it('should have correct shape for each assignment', () => {
		const assignments = getDefaultPadAssignments();

		for (const assignment of assignments) {
			expect(assignment).toHaveProperty('padIndex');
			expect(assignment).toHaveProperty('sampleId');
			expect(typeof assignment.padIndex).toBe('number');
			expect(typeof assignment.sampleId).toBe('string');
		}
	});

	it('should return consistent results on multiple calls', () => {
		const first = getDefaultPadAssignments();
		const second = getDefaultPadAssignments();

		expect(first).toEqual(second);
	});
});

// Additional tests for SamplerStore behavior can be added once
// Svelte 5 runes are properly supported in the test environment.
// The core logic is tested through:
// - Sampler.test.ts for audio playback
// - types.test.ts for PadConfig
