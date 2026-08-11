<script lang="ts">
	import AppStoreBadge from './AppStoreBadge.svelte';
	import { site, platforms } from '$lib/site';
</script>

<section class="px-5 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-5xl font-bold tracking-tight text-blue-700 sm:text-7xl dark:text-blue-400">
			{site.name}
		</h1>

		<p class="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-balance sm:text-2xl">
			The unrivalled companion app for Teenage Engineering EP-Series samplers. Add and edit samples,
			make backups, and so much more.
		</p>

		<div class="mt-8 flex flex-col items-center gap-3">
			<AppStoreBadge />
			<p class="text-sm text-slate-500 dark:text-slate-400">
				{platforms.join(' · ')} — one purchase
			</p>
		</div>
	</div>
</section>
