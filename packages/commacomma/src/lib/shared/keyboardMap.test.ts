import { describe, it, expect } from 'vitest';
import { KEYBOARD_MAP, getPadFromKeyEvent, isMappedKey, getKeyLabel } from './keyboardMap';

describe('KEYBOARD_MAP', () => {
	it('should map 16 unique pad indices', () => {
		const padIndices = new Set(Object.values(KEYBOARD_MAP));
		// Each pad (0-15) should appear at least once
		for (let i = 0; i < 16; i++) {
			expect(padIndices.has(i)).toBe(true);
		}
	});

	it('should map main keyboard row 1 (3456) to pads 0-3', () => {
		expect(KEYBOARD_MAP['Digit3']).toBe(0);
		expect(KEYBOARD_MAP['Digit4']).toBe(1);
		expect(KEYBOARD_MAP['Digit5']).toBe(2);
		expect(KEYBOARD_MAP['Digit6']).toBe(3);
	});

	it('should map main keyboard row 2 (erty) to pads 4-7', () => {
		expect(KEYBOARD_MAP['KeyE']).toBe(4);
		expect(KEYBOARD_MAP['KeyR']).toBe(5);
		expect(KEYBOARD_MAP['KeyT']).toBe(6);
		expect(KEYBOARD_MAP['KeyY']).toBe(7);
	});

	it('should map main keyboard row 3 (dfgh) to pads 8-11', () => {
		expect(KEYBOARD_MAP['KeyD']).toBe(8);
		expect(KEYBOARD_MAP['KeyF']).toBe(9);
		expect(KEYBOARD_MAP['KeyG']).toBe(10);
		expect(KEYBOARD_MAP['KeyH']).toBe(11);
	});

	it('should map main keyboard row 4 (cvbn) to pads 12-15', () => {
		expect(KEYBOARD_MAP['KeyC']).toBe(12);
		expect(KEYBOARD_MAP['KeyV']).toBe(13);
		expect(KEYBOARD_MAP['KeyB']).toBe(14);
		expect(KEYBOARD_MAP['KeyN']).toBe(15);
	});

	it('should have numpad mappings', () => {
		expect(KEYBOARD_MAP['NumpadDivide']).toBe(0);
		expect(KEYBOARD_MAP['NumpadMultiply']).toBe(1);
		expect(KEYBOARD_MAP['Numpad7']).toBe(4);
		expect(KEYBOARD_MAP['NumpadEnter']).toBe(15);
	});
});

describe('getPadFromKeyEvent', () => {
	function createKeyEvent(code: string): KeyboardEvent {
		return { code } as KeyboardEvent;
	}

	it('should return pad index for mapped key', () => {
		expect(getPadFromKeyEvent(createKeyEvent('Digit3'))).toBe(0);
		expect(getPadFromKeyEvent(createKeyEvent('KeyN'))).toBe(15);
	});

	it('should return -1 for unmapped key', () => {
		expect(getPadFromKeyEvent(createKeyEvent('KeyA'))).toBe(-1);
		expect(getPadFromKeyEvent(createKeyEvent('Space'))).toBe(-1);
	});

	it('should return -1 for empty code', () => {
		expect(getPadFromKeyEvent(createKeyEvent(''))).toBe(-1);
	});
});

describe('isMappedKey', () => {
	function createKeyEvent(code: string): KeyboardEvent {
		return { code } as KeyboardEvent;
	}

	it('should return true for mapped keys', () => {
		expect(isMappedKey(createKeyEvent('Digit3'))).toBe(true);
		expect(isMappedKey(createKeyEvent('KeyE'))).toBe(true);
		expect(isMappedKey(createKeyEvent('NumpadEnter'))).toBe(true);
	});

	it('should return false for unmapped keys', () => {
		expect(isMappedKey(createKeyEvent('KeyA'))).toBe(false);
		expect(isMappedKey(createKeyEvent('Space'))).toBe(false);
		expect(isMappedKey(createKeyEvent('Enter'))).toBe(false);
	});
});

describe('getKeyLabel', () => {
	it('should return correct labels for pads 0-3', () => {
		expect(getKeyLabel(0)).toBe('3');
		expect(getKeyLabel(1)).toBe('4');
		expect(getKeyLabel(2)).toBe('5');
		expect(getKeyLabel(3)).toBe('6');
	});

	it('should return correct labels for pads 4-7', () => {
		expect(getKeyLabel(4)).toBe('E');
		expect(getKeyLabel(5)).toBe('R');
		expect(getKeyLabel(6)).toBe('T');
		expect(getKeyLabel(7)).toBe('Y');
	});

	it('should return correct labels for pads 8-11', () => {
		expect(getKeyLabel(8)).toBe('D');
		expect(getKeyLabel(9)).toBe('F');
		expect(getKeyLabel(10)).toBe('G');
		expect(getKeyLabel(11)).toBe('H');
	});

	it('should return correct labels for pads 12-15', () => {
		expect(getKeyLabel(12)).toBe('C');
		expect(getKeyLabel(13)).toBe('V');
		expect(getKeyLabel(14)).toBe('B');
		expect(getKeyLabel(15)).toBe('N');
	});

	it('should return empty string for invalid pad index', () => {
		expect(getKeyLabel(-1)).toBe('');
		expect(getKeyLabel(16)).toBe('');
		expect(getKeyLabel(100)).toBe('');
	});
});
