import { describe, it, expect } from 'vitest';
import { createDefaultPadConfig, PAD_COUNT, MUTE_GROUP_COUNT } from './types';
import type { PadConfig } from './types';

describe('constants', () => {
	it('should have 16 pads', () => {
		expect(PAD_COUNT).toBe(16);
	});

	it('should have 4 mute groups', () => {
		expect(MUTE_GROUP_COUNT).toBe(4);
	});
});

describe('createDefaultPadConfig', () => {
	it('should create a valid PadConfig', () => {
		const config = createDefaultPadConfig();

		expect(config).toHaveProperty('sampleId');
		expect(config).toHaveProperty('pitch');
		expect(config).toHaveProperty('volume');
		expect(config).toHaveProperty('muteGroup');
	});

	it('should have null sampleId by default', () => {
		const config = createDefaultPadConfig();
		expect(config.sampleId).toBeNull();
	});

	it('should have pitch of 0 by default', () => {
		const config = createDefaultPadConfig();
		expect(config.pitch).toBe(0);
	});

	it('should have volume of 1 by default', () => {
		const config = createDefaultPadConfig();
		expect(config.volume).toBe(1);
	});

	it('should have muteGroup of 0 by default', () => {
		const config = createDefaultPadConfig();
		expect(config.muteGroup).toBe(0);
	});

	it('should create independent instances', () => {
		const config1 = createDefaultPadConfig();
		const config2 = createDefaultPadConfig();

		config1.sampleId = 'test';
		config1.pitch = 5;

		expect(config2.sampleId).toBeNull();
		expect(config2.pitch).toBe(0);
	});

	it('should satisfy PadConfig type constraints', () => {
		const config: PadConfig = createDefaultPadConfig();

		// TypeScript would catch these at compile time,
		// but we verify the shape is correct
		expect(typeof config.sampleId === 'string' || config.sampleId === null).toBe(true);
		expect(typeof config.pitch).toBe('number');
		expect(typeof config.volume).toBe('number');
		expect(typeof config.muteGroup).toBe('number');
	});
});
