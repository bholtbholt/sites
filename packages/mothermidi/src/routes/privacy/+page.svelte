<script lang="ts">
	import { Seo, site } from '$lib/index';
</script>

<Seo
	title="Privacy Policy — {site.name}"
	description="{site.name} collects no personal data — everything stays on your device, and this site has no analytics, cookies, or tracking."
	path="/privacy"
/>

<div class="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-5 sm:pt-40 sm:pb-28">
	<article class="prose prose-lg prose-mm max-w-none">
		<h1>Privacy Policy</h1>
		<p class="not-prose text-ash-400 italic">Last updated: October 2026</p>

		<p>
			{site.name} is made by
			<a href={site.developerUrl} rel="external noopener noreferrer" target="_blank"
				>{site.developer}</a
			>. This policy covers what the app and this website do with your data. Briefly: nothing.
		</p>

		<h2>The app</h2>
		<p>
			{site.name} does not collect, store, or transmit personal data. It sends MIDI to the devices and
			apps you connect, and nowhere else. Your settings and chords stay on your device.
		</p>

		<h2>This website</h2>
		<p>
			This site is static and self-hosted, fonts included. No analytics, no cookies, no tracking. We
			don't know you visited unless you write.
		</p>

		<h2>Purchases</h2>
		<p>
			{site.name} is sold through the App Store. Apple processes the payment; we never receive your payment
			or billing details.
		</p>

		<h2>Contact</h2>
		<p>
			Questions about privacy? Email
			<a href="mailto:{site.email}">{site.email}</a>.
		</p>
	</article>
</div>
