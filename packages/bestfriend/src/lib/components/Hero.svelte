<script lang="ts">
	import StoreBadges from './StoreBadges.svelte';
	import { site, platforms } from '$lib/site';
</script>

<section class="px-5 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-5xl font-bold tracking-tight text-blue-700 sm:text-7xl dark:text-blue-400">
			{site.name}
		</h1>

		<p class="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-balance sm:text-2xl">
			The unrivalled companion app for Teenage Engineering EP-Series samplers — the EP-133 K.O. II,
			EP-40 Riddim, and EP-1320 Medieval. See your whole Scene, play it from a keyboard, edit and
			process your samples, then bounce real per-pad audio stems straight into your DAW.
		</p>

		<div class="mt-8 flex flex-col items-center gap-3">
			<StoreBadges />
			<p class="text-sm text-slate-500 dark:text-slate-400">
				{platforms.join(' · ')}
			</p>
		</div>
	</div>
</section>
