<script lang="ts">
	import { site } from '$lib/index';
</script>

<svelte:head>
	<title>Privacy Policy — {site.name}</title>
	<meta name="description" content="Privacy policy for Best Friend." />
	<link rel="canonical" href="{site.domain}/privacy" />
</svelte:head>

<article
	class="prose prose-stone dark:prose-invert prose-sm max-w-none prose-headings:text-teal-700 dark:prose-headings:text-teal-400"
>
	<h1>Privacy Policy</h1>
	<p class="text-stone-500 not-prose dark:text-stone-400">Last updated: July 2026</p>

	<p>
		{site.name} is built by
		<a href={site.developerUrl} rel="external noopener noreferrer" target="_blank"
			>{site.developer}</a
		>. This policy explains what data the app and this website handle — spoiler: not much.
	</p>

	<h2 class="mb-0">The app</h2>
	<p>
		{site.name} does not collect, store, or transmit personal data. Everything stays on your device.
	</p>

	<h2 class="mb-0">This website</h2>
	<p>
		This site is static. No analytics, no cookies, no tracking. We don't know you visited unless you
		email us.
	</p>

	<h2 class="mb-0">Future changes</h2>
	<p>
		If paid features or in-app purchases are added later, this policy will be updated. Purchases
		would be processed by Apple — we would not receive your payment or billing details.
	</p>

	<h2 class="mb-0">Contact</h2>
	<p>
		Questions about privacy? Email
		<a href="mailto:{site.email}">{site.email}</a>.
	</p>
</article>
