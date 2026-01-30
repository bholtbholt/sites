/**
 * Keyboard mapping for triggering pads.
 * Two layouts are supported simultaneously:
 * 1. Main keyboard: 3456-erty-dfgh-cvbn (4x4 grid)
 * 2. Numpad: 789/-456*-123--0.Enter+ (4x4 grid)
 */

/**
 * Map of key codes to pad indices
 */
export const KEYBOARD_MAP: Record<string, number> = {
	// Main keyboard: 3456-erty-dfgh-cvbn
	// Row 1: 3 4 5 6
	Digit3: 0,
	Digit4: 1,
	Digit5: 2,
	Digit6: 3,
	// Row 2: e r t y
	KeyE: 4,
	KeyR: 5,
	KeyT: 6,
	KeyY: 7,
	// Row 3: d f g h
	KeyD: 8,
	KeyF: 9,
	KeyG: 10,
	KeyH: 11,
	// Row 4: c v b n
	KeyC: 12,
	KeyV: 13,
	KeyB: 14,
	KeyN: 15,

	// Numpad layout (matching pad visual layout)
	// Row 1: clear = / * → Pads 0-3
	NumpadDivide: 0,
	NumpadMultiply: 1,
	// Row 2: 7 8 9 - → Pads 4-7
	Numpad7: 4,
	Numpad8: 5,
	Numpad9: 6,
	NumpadSubtract: 7,
	// Row 3: 4 5 6 + → Pads 8-11
	Numpad4: 8,
	Numpad5: 9,
	Numpad6: 10,
	NumpadAdd: 11,
	// Row 4: 1 2 3 Enter → Pads 12-15
	Numpad1: 12,
	Numpad2: 13,
	Numpad3: 14,
	NumpadEnter: 15,
};

/**
 * Get the pad index for a keyboard event
 * @returns The pad index (0-15) or -1 if not mapped
 */
export function getPadFromKeyEvent(event: KeyboardEvent): number {
	const padIndex = KEYBOARD_MAP[event.code];
	return padIndex !== undefined ? padIndex : -1;
}

/**
 * Check if a key event is mapped to a pad
 */
export function isMappedKey(event: KeyboardEvent): boolean {
	return event.code in KEYBOARD_MAP;
}

/**
 * Get the display key for a pad index (main keyboard layout)
 */
export function getKeyLabel(padIndex: number): string {
	const labels = ['3', '4', '5', '6', 'E', 'R', 'T', 'Y', 'D', 'F', 'G', 'H', 'C', 'V', 'B', 'N'];
	return labels[padIndex] ?? '';
}

/**
 * Create a keyboard handler for triggering pads
 * @param onTrigger - Callback when a pad should be triggered
 * @returns Cleanup function to remove the event listener
 */
export function createKeyboardHandler(onTrigger: (padIndex: number) => void): () => void {
	const pressedKeys = new Set<string>();

	const handleKeyDown = (event: KeyboardEvent) => {
		// Ignore if modifier keys are held (except shift for potential future use)
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		// Ignore if we're in an input field
		const target = event.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
			return;
		}

		// Ignore repeated key events
		if (pressedKeys.has(event.code)) return;

		const padIndex = getPadFromKeyEvent(event);
		if (padIndex >= 0) {
			event.preventDefault();
			pressedKeys.add(event.code);
			onTrigger(padIndex);
		}
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		pressedKeys.delete(event.code);
	};

	// Handle window blur to reset pressed keys
	const handleBlur = () => {
		pressedKeys.clear();
	};

	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
	window.addEventListener('blur', handleBlur);

	return () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);
		window.removeEventListener('blur', handleBlur);
	};
}
