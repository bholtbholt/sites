<script lang="ts">
	import hardware from '$lib/assets/hardware-ep133.webp?enhanced';
	import scenes from '$lib/assets/ep133-scenes.png?enhanced';
	import HardwareShot from './HardwareShot.svelte';
	import StoreBadges from './StoreBadges.svelte';
	import { site, platforms } from '$lib/site';
</script>

<section class="overflow-hidden px-5 pt-28 sm:pt-36 lg:flex lg:min-h-svh lg:flex-col lg:pt-32">
	<div
		class="mx-auto grid max-w-5xl items-center gap-14 sm:gap-16 lg:w-full lg:flex-1 lg:grid-cols-2 lg:gap-12"
	>
		<div class="text-center lg:pb-16 lg:text-left">
			<h1 class="text-5xl font-bold tracking-tight text-blue-700 sm:text-7xl dark:text-blue-400">
				{site.name}
			</h1>

			<p
				class="mt-6 text-2xl leading-snug text-balance text-slate-600 lg:text-xl dark:text-slate-300"
			>
				The unrivalled companion app for Teenage Engineering EP-Series samplers.
			</p>

			<div class="mt-10 flex flex-col items-center gap-3 lg:items-start">
				<StoreBadges class="lg:items-start" />
				<p class="text-sm text-slate-500 dark:text-slate-400">
					{platforms.join(' · ')}
				</p>
			</div>
		</div>

		<HardwareShot
			{hardware}
			hardwareAlt="A Teenage Engineering EP-133 K.O. II sampler"
			screen={scenes}
			screenAlt="{site.name} showing a Scene timeline in the EP-133 theme"
			eager
		/>
	</div>
</section>
