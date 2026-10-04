<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { site } from '$lib/site';

	const links = [
		{ href: resolve('/docs'), label: 'Guides' },
		{ href: resolve('/bank-snapshots'), label: 'Bank Snapshots' },
	];
	const download = `${resolve('/')}#download` as ResolvedPathname;

	let sentinel = $state<HTMLElement | null>(null);
	let menu = $state<HTMLDetailsElement | null>(null);
	let pinned = $state(false);
	let menuOpen = $state(false);

	// IntersectionObserver rather than a scroll listener: no work on every frame.
	$effect(() => {
		if (!sentinel) return;

		const observer = new IntersectionObserver(([entry]) => (pinned = !entry.isIntersecting));
		observer.observe(sentinel);

		return () => observer.disconnect();
	});

	afterNavigate(() => (menuOpen = false));

	function closeOnOutsideClick(event: MouseEvent) {
		if (menuOpen && menu && !menu.contains(event.target as Node)) menuOpen = false;
	}

	const navLink =
		'text-slate-700 transition hover:text-orange-500 dark:text-slate-200 dark:hover:text-orange-400';
</script>

<svelte:window onclick={closeOnOutsideClick} />

<div
	bind:this={sentinel}
	class="pointer-events-none absolute inset-x-0 top-0 h-16"
	aria-hidden="true"
></div>

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-200 {pinned || menuOpen
		? 'border-b border-slate-900/10 bg-slate-100/90 backdrop-blur dark:border-white/10 dark:bg-slate-800/90'
		: 'border-b border-transparent'}"
>
	<div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
		<details class="group relative sm:hidden" bind:this={menu} bind:open={menuOpen}>
			<summary
				class="flex cursor-pointer list-none items-center gap-1 font-semibold tracking-tight text-blue-700 dark:text-blue-400 [&::-webkit-details-marker]:hidden"
			>
				{site.name}
				<svg
					class="size-5 transition-transform group-open:rotate-180"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M5.5 7.5 10 12l4.5-4.5h-9Z" />
				</svg>
			</summary>
			<nav
				class="absolute left-0 mt-3 flex w-52 flex-col rounded-xl bg-white py-2 text-sm font-medium shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10"
			>
				<a class="px-4 py-2.5 {navLink}" href={resolve('/')}>{site.name}</a>
				{#each links as link (link.href)}
					<a class="px-4 py-2.5 {navLink}" href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</details>

		<a
			href={resolve('/')}
			class="hidden font-semibold tracking-tight text-blue-700 transition hover:opacity-80 sm:block dark:text-blue-400"
		>
			{site.name}
		</a>

		<nav class="mr-auto hidden gap-5 text-sm font-medium sm:ml-4 sm:flex">
			{#each links as link (link.href)}
				<a class={navLink} href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<a
			class="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 {pinned
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
			href={download}
			tabindex={pinned ? 0 : -1}
		>
			Get {site.name}
		</a>
	</div>
</header>
