<script lang="ts">
	import { site } from '$lib/site';

	let { sentinel }: { sentinel: HTMLElement | null } = $props();

	let pinned = $state(false);

	// IntersectionObserver rather than a scroll listener: no work on every frame.
	$effect(() => {
		if (!sentinel) return;

		const observer = new IntersectionObserver(([entry]) => (pinned = !entry.isIntersecting));
		observer.observe(sentinel);

		return () => observer.disconnect();
	});
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-200 {pinned
		? 'border-b border-slate-900/10 bg-slate-100/90 backdrop-blur dark:border-white/10 dark:bg-slate-800/90'
		: 'border-b border-transparent'}"
>
	<div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
		<a
			href="#top"
			class="font-semibold tracking-tight text-blue-700 transition hover:opacity-80 dark:text-blue-400"
		>
			{site.name}
		</a>

		<a
			class="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 {pinned
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
			href={site.appStoreUrl}
			rel="external noopener noreferrer"
			target="_blank"
			tabindex={pinned ? 0 : -1}
		>
			Get {site.name}
		</a>
	</div>
</header>
