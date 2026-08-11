<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo, site } from '$lib/index';
</script>

<Seo
	title="Privacy Policy — {site.name}"
	description="{site.name} collects no personal data — everything stays on your device, and this site has no analytics, cookies, or tracking."
	path="/privacy"
/>

<div class="mx-auto max-w-3xl px-5 py-16 sm:py-24">
	<a
		class="text-sm font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
		href={resolve('/')}>&larr; {site.name}</a
	>

	<article
		class="prose prose-slate dark:prose-invert prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-headings:text-blue-700 dark:prose-headings:text-blue-400 mt-6 max-w-none"
	>
		<h1>Privacy Policy</h1>
		<p class="not-prose text-slate-500 dark:text-slate-400">Last updated: July 2026</p>

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
			This site is static. No analytics, no cookies, no tracking. We don't know you visited unless
			you email us.
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
</div>
