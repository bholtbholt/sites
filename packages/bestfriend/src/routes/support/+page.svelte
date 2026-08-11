<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo, site } from '$lib/index';

	const link =
		'font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400';
</script>

<Seo
	title="Support — {site.name}"
	description="Get help with {site.name}, the companion app for Teenage Engineering EP-133, EP-40 and EP-1320 samplers. Report a bug or send feedback."
	path="/support"
/>

<div class="mx-auto max-w-3xl space-y-6 px-5 py-16 sm:py-24">
	<a class="text-sm {link}" href={resolve('/')}>&larr; {site.name}</a>

	<h1 class="text-4xl font-bold tracking-tight text-blue-700 dark:text-blue-400">Support</h1>

	<p class="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
		Need help, found a bug, or have feedback? Reach out — happy to hear from you.
	</p>

	<p class="leading-relaxed text-slate-600 dark:text-slate-300">
		Bugs: <a class={link} href="mailto:{site.bugs}">{site.bugs}</a>
		<br />
		Everything else: <a class={link} href="mailto:{site.email}">{site.email}</a>
	</p>

	<p class="text-sm text-slate-500 dark:text-slate-400">
		Developed by
		<a
			class="underline decoration-slate-400 underline-offset-4 transition hover:text-orange-500 dark:hover:text-orange-400"
			href={site.developerUrl}
			rel="external noopener noreferrer"
			target="_blank">{site.developer}</a
		>
	</p>
</div>
