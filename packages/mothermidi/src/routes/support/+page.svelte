<script lang="ts">
	import { resolve } from '$app/paths';
	import { Seo, site } from '$lib/index';
</script>

<Seo
	title="Support — {site.name}"
	description="Get help with {site.name}, the MIDI chord controller for iPhone and iPad. Report a bug or send feedback."
	path="/support"
/>

<div class="mx-auto max-w-3xl space-y-8 px-4 pt-32 pb-20 sm:px-5 sm:pt-40 sm:pb-28">
	<p class="smallcaps text-ash-400">Confession</p>
	<h1 class="text-5xl tracking-tight sm:text-6xl">Support</h1>

	<p class="text-ash-300 text-xl leading-relaxed">
		Something broken? Something missing? Write. Every message is read.
	</p>

	<dl class="divide-ash-800 border-ash-800 divide-y border-y text-xl">
		<div class="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
			<dt class="smallcaps text-ash-400 w-32 shrink-0">Bugs</dt>
			<dd><a class="link" href="mailto:{site.bugs}">{site.bugs}</a></dd>
		</div>
		<div class="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
			<dt class="smallcaps text-ash-400 w-32 shrink-0">All else</dt>
			<dd><a class="link" href="mailto:{site.email}">{site.email}</a></dd>
		</div>
	</dl>

	<p class="text-ash-300 text-lg leading-relaxed">
		Most answers are already in the <a class="link" href={resolve('/docs')}>guides</a> — start with
		<a class="link" href={resolve('/docs/[slug]', { slug: 'troubleshooting' })}>Troubleshooting</a>
		if your DAW can't hear it, or the arpeggiator is silent.
	</p>

	<p class="text-ash-400 text-base">
		Made by
		<a class="link" href={site.developerUrl} rel="external noopener noreferrer" target="_blank"
			>{site.developer}</a
		>.
	</p>
</div>
