import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createDefaultPattern } from '../sequencer/types';
import { createDefaultPadConfig } from '../sampler/types';
import type { EncodedState } from '../shared/urlCodec';

// Mock $app/environment before imports
vi.mock('$app/environment', () => ({
	browser: true,
}));

// Helper to create test state
function createTestState(overrides?: Partial<EncodedState>): EncodedState {
	const pads = Array.from({ length: 16 }, () => createDefaultPadConfig());
	const pattern = createDefaultPattern();
	return { pads, pattern, ...overrides };
}

describe('urlSync', () => {
	let mockUrl: URL;
	let replaceStateMock: ReturnType<typeof vi.fn>;
	let clipboardMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		// Reset module cache to get fresh imports
		vi.resetModules();

		// Mock URL
		mockUrl = new URL('http://localhost:3000/remix');
		replaceStateMock = vi.fn();
		clipboardMock = vi.fn().mockResolvedValue(undefined);

		// Set up window mock on globalThis
		(globalThis as Record<string, unknown>).window = {
			location: {
				get href() {
					return mockUrl.toString();
				},
				set href(value: string) {
					mockUrl = new URL(value);
				},
			},
			history: {
				replaceState: replaceStateMock,
				pushState: vi.fn(),
			},
		};

		// Mock navigator.clipboard using Object.defineProperty
		Object.defineProperty(globalThis, 'navigator', {
			value: {
				clipboard: {
					writeText: clipboardMock,
				},
			},
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		delete (globalThis as Record<string, unknown>).window;
		// navigator is cleaned up by vi.restoreAllMocks or next defineProperty
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	describe('parseUrlStateNonBlocking', () => {
		it('should return null when no state in URL', async () => {
			const { parseUrlStateNonBlocking } = await import('./urlSync.svelte');
			const result = parseUrlStateNonBlocking();
			expect(result).toBeNull();
		});

		it('should parse valid state from URL', async () => {
			// Set up URL with encoded state
			const state = createTestState();
			state.pads[0].sampleId = 'ark-kick';

			const { encodeState } = await import('../shared/urlCodec');
			const encoded = encodeState(state);
			mockUrl.searchParams.set('s', encoded);

			const { parseUrlStateNonBlocking } = await import('./urlSync.svelte');
			const result = parseUrlStateNonBlocking();

			expect(result).not.toBeNull();
			expect(result?.pads[0].sampleId).toBe('ark-kick');
		});

		it('should return null for invalid state', async () => {
			mockUrl.searchParams.set('s', 'invalid-base64!!!');

			// Mock both warn (from parseUrlStateNonBlocking) and error (from decodeState)
			const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			const { parseUrlStateNonBlocking } = await import('./urlSync.svelte');
			const result = parseUrlStateNonBlocking();

			expect(result).toBeNull();

			warnSpy.mockRestore();
			errorSpy.mockRestore();
		});
	});

	describe('createUrlSync', () => {
		it('should create url sync manager with default options', async () => {
			const { createUrlSync } = await import('./urlSync.svelte');
			const sync = createUrlSync();

			expect(sync).toHaveProperty('initFromUrl');
			expect(sync).toHaveProperty('syncToUrl');
			expect(sync).toHaveProperty('syncToUrlImmediate');
			expect(sync).toHaveProperty('getShareUrl');
			expect(sync).toHaveProperty('copyShareUrl');
			expect(sync).toHaveProperty('cleanup');
		});

		it('should accept custom options', async () => {
			const { createUrlSync } = await import('./urlSync.svelte');
			const sync = createUrlSync({
				debounceMs: 500,
				paramName: 'state',
			});

			expect(sync).toBeDefined();
		});

		describe('initFromUrl', () => {
			it('should return null when no state in URL', async () => {
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync();

				const result = sync.initFromUrl();
				expect(result).toBeNull();
			});

			it('should return state from URL', async () => {
				const state = createTestState();
				state.pads[0].sampleId = 'test-sample';

				const { encodeState } = await import('../shared/urlCodec');
				mockUrl.searchParams.set('s', encodeState(state));

				// Need fresh import after setting URL
				vi.resetModules();
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync();

				const result = sync.initFromUrl();
				expect(result?.pads[0].sampleId).toBe('test-sample');
			});
		});

		describe('syncToUrl', () => {
			it('should not sync before init', async () => {
				vi.useFakeTimers();

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 100 });

				const state = createTestState();
				sync.syncToUrl(state);

				vi.advanceTimersByTime(200);

				expect(replaceStateMock).not.toHaveBeenCalled();
			});

			it('should debounce URL updates', async () => {
				vi.useFakeTimers();

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 100 });

				sync.initFromUrl(); // Initialize first

				const state = createTestState();
				state.pads[0].sampleId = 'sample-1';
				sync.syncToUrl(state);

				// Update again before debounce
				state.pads[0].sampleId = 'sample-2';
				sync.syncToUrl(state);

				// Should not have synced yet
				expect(replaceStateMock).not.toHaveBeenCalled();

				// Advance past debounce
				vi.advanceTimersByTime(150);

				// Should have synced once with final state
				expect(replaceStateMock).toHaveBeenCalledTimes(1);
			});

			it('should skip sync if state unchanged', async () => {
				vi.useFakeTimers();

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 100 });

				sync.initFromUrl();

				const state = createTestState();
				sync.syncToUrl(state);
				vi.advanceTimersByTime(150);

				// Sync same state again
				sync.syncToUrl(state);
				vi.advanceTimersByTime(150);

				// Should only have called once (second was skipped)
				expect(replaceStateMock).toHaveBeenCalledTimes(1);
			});
		});

		describe('syncToUrlImmediate', () => {
			it('should sync immediately without debounce', async () => {
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 1000 });

				const state = createTestState();
				state.pads[0].sampleId = 'immediate-sample';
				sync.syncToUrlImmediate(state);

				expect(replaceStateMock).toHaveBeenCalledTimes(1);
			});

			it('should cancel pending debounced sync', async () => {
				vi.useFakeTimers();

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 100 });

				sync.initFromUrl();

				const state1 = createTestState();
				state1.pads[0].sampleId = 'debounced';
				sync.syncToUrl(state1);

				// Before debounce completes, do immediate sync
				const state2 = createTestState();
				state2.pads[0].sampleId = 'immediate';
				sync.syncToUrlImmediate(state2);

				vi.advanceTimersByTime(150);

				// Should only have one call from immediate sync
				expect(replaceStateMock).toHaveBeenCalledTimes(1);
			});
		});

		describe('getShareUrl', () => {
			it('should return URL with encoded state', async () => {
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync();

				const state = createTestState();
				state.pads[0].sampleId = 'share-sample';

				const url = sync.getShareUrl(state);

				expect(url).toContain('http://localhost:3000/remix');
				expect(url).toContain('s=');
			});

			it('should use custom param name', async () => {
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ paramName: 'data' });

				const state = createTestState();
				const url = sync.getShareUrl(state);

				expect(url).toContain('data=');
			});
		});

		describe('copyShareUrl', () => {
			it('should copy URL to clipboard', async () => {
				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync();

				const state = createTestState();
				const result = await sync.copyShareUrl(state);

				expect(result).toBe(true);
				expect(clipboardMock).toHaveBeenCalled();
			});

			it('should return false on clipboard error', async () => {
				clipboardMock.mockRejectedValue(new Error('Clipboard error'));

				const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync();

				const state = createTestState();
				const result = await sync.copyShareUrl(state);

				expect(result).toBe(false);
				consoleSpy.mockRestore();
			});
		});

		describe('cleanup', () => {
			it('should clear pending debounce timer', async () => {
				vi.useFakeTimers();

				const { createUrlSync } = await import('./urlSync.svelte');
				const sync = createUrlSync({ debounceMs: 100 });

				sync.initFromUrl();

				const state = createTestState();
				sync.syncToUrl(state);

				// Cleanup before debounce
				sync.cleanup();

				vi.advanceTimersByTime(150);

				// Should not have synced
				expect(replaceStateMock).not.toHaveBeenCalled();
			});
		});
	});
});
