// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { MarkdownFiles } from '$lib/types';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

declare module '*.md' {
	const markdownFiles: MarkdownFiles;
	export default markdownFiles;
}

export {};
