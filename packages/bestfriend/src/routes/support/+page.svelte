<script lang="ts">
	import { site } from '$lib/index';
</script>

<svelte:head>
	<title>Support — {site.name}</title>
	<meta name="description" content="Get help with Best Friend." />
	<link rel="canonical" href="{site.domain}/support" />
</svelte:head>

<div class="space-y-6">
	<h1 class="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">Support</h1>

	<p class="leading-relaxed text-stone-600 dark:text-stone-300">
		Need help, found a bug, or have feedback? Reach out — happy to hear from you.
	</p>

	<p class="leading-relaxed text-stone-600 dark:text-stone-300">
		Email
		<a
			class="font-medium text-orange-500 underline decoration-orange-300 underline-offset-2 transition hover:text-orange-500 dark:text-orange-400 dark:decoration-orange-500/50"
			href="mailto:{site.email}">{site.email}</a
		>
	</p>

	<p class="text-sm text-stone-500 dark:text-stone-400">
		Developed by
		<a
			class="text-stone-600 underline decoration-stone-300 underline-offset-2 transition hover:text-orange-500 dark:text-stone-300 dark:decoration-stone-600 dark:hover:text-orange-400"
			href={site.developerUrl}
			rel="external noopener noreferrer"
			target="_blank">{site.developer}</a
		>
	</p>
</div>
