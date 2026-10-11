<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { site } from '$lib/site';

	const links = [
		{ href: resolve('/docs'), label: 'Guides' },
		{ href: resolve('/support'), label: 'Support' },
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

	const navLink = 'smallcaps text-ash-400 transition hover:text-bone';
</script>

<svelte:window onclick={closeOnOutsideClick} />

<div
	bind:this={sentinel}
	class="pointer-events-none absolute inset-x-0 top-0 h-16"
	aria-hidden="true"
></div>

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-200 {pinned || menuOpen
		? 'border-ash-800 bg-ink/90 border-b backdrop-blur'
		: 'border-b border-transparent'}"
>
	<div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-5">
		<details class="group relative sm:hidden" bind:this={menu} bind:open={menuOpen}>
			<summary
				class="text-bone flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden"
			>
				<img src="/favicon.svg" alt="" width="24" height="24" class="size-6 rounded-[22%]" />
				<span class="smallcaps text-xl">{site.name}</span>
				<svg
					class="text-oxblood-400 size-4 transition-transform group-open:rotate-180"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M5.5 7.5 10 12l4.5-4.5h-9Z" />
				</svg>
			</summary>
			<nav class="border-ash-700 bg-ink absolute left-0 mt-3 flex w-52 flex-col border py-2">
				<a class="px-4 py-2.5 {navLink}" href={resolve('/')}>{site.name}</a>
				{#each links as link (link.href)}
					<a class="px-4 py-2.5 {navLink}" href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</details>

		<a
			href={resolve('/')}
			class="text-bone hidden items-center gap-2.5 transition hover:opacity-80 sm:flex"
		>
			<img src="/favicon.svg" alt="" width="28" height="28" class="size-7 rounded-[22%]" />
			<span class="smallcaps text-xl">{site.name}</span>
		</a>

		<nav class="mr-auto hidden gap-6 sm:ml-6 sm:flex">
			{#each links as link (link.href)}
				<a class={navLink} href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<a
			class="smallcaps border-oxblood-500 text-bone hover:bg-oxblood-700 border px-4 py-1.5 transition {pinned
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
			href={download}
			tabindex={pinned ? 0 : -1}
		>
			Download
		</a>
	</div>
</header>
