import { describe, it, expect } from 'vitest';
import {
	SAMPLE_LIBRARY,
	getSampleById,
	getSampleName,
	getAllSamplesForLoading,
	getSamplesByCategory,
} from './sampleLibrary';

describe('SAMPLE_LIBRARY', () => {
	it('should contain samples', () => {
		expect(SAMPLE_LIBRARY.length).toBeGreaterThan(0);
	});

	it('should have unique ids', () => {
		const ids = SAMPLE_LIBRARY.map((s) => s.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should have all required properties', () => {
		for (const sample of SAMPLE_LIBRARY) {
			expect(sample).toHaveProperty('id');
			expect(sample).toHaveProperty('url');
			expect(sample).toHaveProperty('name');
			expect(typeof sample.id).toBe('string');
			expect(typeof sample.url).toBe('string');
			expect(typeof sample.name).toBe('string');
		}
	});
});

describe('getSampleById', () => {
	it('should return sample when id exists', () => {
		const sample = getSampleById('ark-kick');
		expect(sample).toBeDefined();
		expect(sample?.id).toBe('ark-kick');
		expect(sample?.name).toBe('Ark Kick');
	});

	it('should return undefined for non-existent id', () => {
		const sample = getSampleById('non-existent-sample');
		expect(sample).toBeUndefined();
	});

	it('should return undefined for empty string', () => {
		const sample = getSampleById('');
		expect(sample).toBeUndefined();
	});
});

describe('getSampleName', () => {
	it('should return sample name when id exists', () => {
		const name = getSampleName('ark-kick');
		expect(name).toBe('Ark Kick');
	});

	it('should return "Empty" for null', () => {
		const name = getSampleName(null);
		expect(name).toBe('Empty');
	});

	it('should return the id itself for non-existent sample', () => {
		const name = getSampleName('unknown-sample');
		expect(name).toBe('unknown-sample');
	});
});

describe('getAllSamplesForLoading', () => {
	it('should return array of id/url objects', () => {
		const samples = getAllSamplesForLoading();
		expect(samples.length).toBe(SAMPLE_LIBRARY.length);

		for (const sample of samples) {
			expect(sample).toHaveProperty('id');
			expect(sample).toHaveProperty('url');
			expect(Object.keys(sample)).toHaveLength(2);
		}
	});

	it('should not include name property', () => {
		const samples = getAllSamplesForLoading();
		for (const sample of samples) {
			expect(sample).not.toHaveProperty('name');
		}
	});
});

describe('getSamplesByCategory', () => {
	it('should return categorized samples', () => {
		const categories = getSamplesByCategory();
		expect(Object.keys(categories).length).toBeGreaterThan(0);
	});

	it('should have Kicks category with kick samples', () => {
		const categories = getSamplesByCategory();
		expect(categories.Kicks).toBeDefined();
		expect(categories.Kicks.length).toBeGreaterThan(0);
		for (const sample of categories.Kicks) {
			expect(sample.id).toContain('kick');
		}
	});

	it('should have Snares category with snare samples', () => {
		const categories = getSamplesByCategory();
		expect(categories.Snares).toBeDefined();
		expect(categories.Snares.length).toBeGreaterThan(0);
		for (const sample of categories.Snares) {
			expect(sample.id).toContain('-sn');
		}
	});

	it('should not have empty categories', () => {
		const categories = getSamplesByCategory();
		for (const [, samples] of Object.entries(categories)) {
			expect(samples.length).toBeGreaterThan(0);
		}
	});

	it('should categorize all samples', () => {
		const categories = getSamplesByCategory();
		const categorizedCount = Object.values(categories).reduce(
			(sum, samples) => sum + samples.length,
			0,
		);
		expect(categorizedCount).toBe(SAMPLE_LIBRARY.length);
	});
});
