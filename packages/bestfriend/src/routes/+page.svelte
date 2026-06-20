<script lang="ts">
	import { site } from '$lib/index';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.tagline} />
</svelte:head>

<div class="space-y-8 mt-48">
	<h1 class="text-5xl sm:text-9xl mb-3 sm:mb-8 font-bold tracking-tight text-orange-500 dark:text-orange-400">
		{site.name}
	</h1>

	<p class="text-lg sm:text-3xl leading-relaxed text-stone-600 dark:text-stone-300">
		{site.tagline}
	</p>

	<a
		class="inline-block rounded-full bg-orange-500 px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-xl font-semibold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-600 active:bg-orange-700  dark:shadow-orange-500/15 "
		href={site.betaUrl}
		rel="external noopener noreferrer"
		target="_blank"
	>
		Sign up for the beta
	</a>
</div>
