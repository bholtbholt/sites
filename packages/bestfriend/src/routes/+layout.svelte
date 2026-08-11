<script lang="ts">
	import '../app.css';
	import { Footer } from '$lib/index';
	import type { Snippet } from 'svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<!-- No padding here: bands run full-bleed and each section owns its own px/max-w. -->
<div class="flex min-h-screen w-full flex-col">
	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
