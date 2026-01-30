import { browser } from '$app/environment';
import { SvelteURL } from 'svelte/reactivity';
import { type EncodedState, encodeState, decodeState } from '../shared/urlCodec';

/**
 * Configuration for URL sync behavior
 */
export interface UrlSyncOptions {
	/** Debounce delay in milliseconds (default: 300) */
	debounceMs?: number;
	/** Query parameter name (default: 's') */
	paramName?: string;
}

const DEFAULT_OPTIONS: Required<UrlSyncOptions> = {
	debounceMs: 300,
	paramName: 's',
};

/**
 * Parse URL state with graceful fallback.
 * Never throws - returns null on any failure.
 */
export function parseUrlStateNonBlocking(): EncodedState | null {
	if (!browser) return null;

	try {
		const url = new SvelteURL(window.location.href);
		const encoded = url.searchParams.get('s');
		if (!encoded) return null;
		return decodeState(encoded);
	} catch (error) {
		console.warn('Failed to parse URL state, using defaults:', error);
		return null;
	}
}

/**
 * Create a URL sync manager for reactive state synchronization.
 * Uses debouncing and replaceState for performance.
 */
export function createUrlSync(options: UrlSyncOptions = {}) {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let lastEncodedState: string | null = null;
	let isInitialized = false;

	/**
	 * Initialize from URL - call once on mount.
	 * Returns parsed state or null if none/invalid.
	 */
	function initFromUrl(): EncodedState | null {
		if (!browser) return null;

		const state = parseUrlStateNonBlocking();
		if (state) {
			// Cache the current state to avoid immediate re-sync
			lastEncodedState = encodeState(state);
		}
		isInitialized = true;
		return state;
	}

	/**
	 * Sync state to URL with debouncing.
	 * Uses replaceState to avoid polluting browser history.
	 */
	function syncToUrl(state: EncodedState): void {
		if (!browser || !isInitialized) return;

		// Cancel pending update
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			try {
				const encoded = encodeState(state);

				// Skip if state hasn't changed
				if (encoded === lastEncodedState) return;

				lastEncodedState = encoded;

				// Update URL without adding to history
				const url = new SvelteURL(window.location.href);
				if (encoded) {
					url.searchParams.set(opts.paramName, encoded);
				} else {
					url.searchParams.delete(opts.paramName);
				}

				window.history.replaceState(null, '', url.toString());
			} catch (error) {
				console.error('Failed to sync state to URL:', error);
			}
		}, opts.debounceMs);
	}

	/**
	 * Force immediate sync (skip debounce).
	 * Useful for share functionality.
	 */
	function syncToUrlImmediate(state: EncodedState): void {
		if (!browser) return;

		// Cancel pending update
		if (debounceTimer) {
			clearTimeout(debounceTimer);
			debounceTimer = null;
		}

		try {
			const encoded = encodeState(state);
			lastEncodedState = encoded;

			const url = new SvelteURL(window.location.href);
			if (encoded) {
				url.searchParams.set(opts.paramName, encoded);
			} else {
				url.searchParams.delete(opts.paramName);
			}

			window.history.replaceState(null, '', url.toString());
		} catch (error) {
			console.error('Failed to sync state to URL:', error);
		}
	}

	/**
	 * Get the current share URL.
	 */
	function getShareUrl(state: EncodedState): string {
		if (!browser) return '';

		try {
			const encoded = encodeState(state);
			const url = new SvelteURL(window.location.href);
			if (encoded) {
				url.searchParams.set(opts.paramName, encoded);
			}
			return url.toString();
		} catch (error) {
			console.error('Failed to generate share URL:', error);
			return window.location.href;
		}
	}

	/**
	 * Copy share URL to clipboard.
	 */
	async function copyShareUrl(state: EncodedState): Promise<boolean> {
		if (!browser) return false;

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
	 * Clean up pending timers.
	 */
	function cleanup(): void {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
			debounceTimer = null;
		}
	}

	return {
		initFromUrl,
		syncToUrl,
		syncToUrlImmediate,
		getShareUrl,
		copyShareUrl,
		cleanup,
	};
}
