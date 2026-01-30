import { getContext, setContext } from 'svelte';
import type { RemixStore } from './stores/RemixStore.svelte';

/**
 * Context key for the remix store (Symbol ensures uniqueness)
 */
const REMIX_CONTEXT_KEY = Symbol('remix-store');

/**
 * Set the remix store in context (call in parent component)
 */
export function setRemixContext(store: RemixStore): void {
	setContext(REMIX_CONTEXT_KEY, store);
}

/**
 * Get the remix store from context (call in child components)
 * @throws Error if called outside of a component that has setRemixContext
 */
export function getRemixContext(): RemixStore {
	const store = getContext<RemixStore>(REMIX_CONTEXT_KEY);
	if (!store) {
		throw new Error('getRemixContext must be called within a component that has setRemixContext');
	}
	return store;
}
