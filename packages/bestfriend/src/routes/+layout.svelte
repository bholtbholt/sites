<script lang="ts">
	import '../app.css';
	import { Footer, site } from '$lib/index';
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<link rel="canonical" href={site.domain} />
</svelte:head>

<div class="mx-auto flex min-h-screen flex-col p-4">
	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
