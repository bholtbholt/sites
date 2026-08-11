<script lang="ts">
	import { site, devices } from '$lib/site';
</script>

<section class="px-5 py-16 sm:py-24">
	<div class="mx-auto max-w-3xl">
		<p
			class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
		>
			Compatibility
		</p>
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">What you'll need</h2>

		<ul class="mt-8 flex flex-wrap gap-3">
			{#each devices as device (device.name)}
				<li
					class="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
				>
					<span class="font-semibold">{device.name}</span>
					{#if device.sub}
						<span class="text-slate-500 dark:text-slate-400"> {device.sub}</span>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="mt-8 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
			<p>
				{site.name} is an extended display and management tool that requires a connection to the hardware. Use a USB-C to USB-C data cable.
			</p>
			<p>
				On a Lightning iPhone or iPad, use an MFi-certified Lightning to USB adapter with a USB-IF certified
				USB-A to USB-C cable.
			</p>
			{#if site.cableGuideUrl}
				<p>
					<a
						class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
						href={site.cableGuideUrl}
						rel="external noopener noreferrer"
						target="_blank"
					>
						See the cable guide on Instagram &rarr;
					</a>
				</p>
			{/if}
		</div>
	</div>
</section>
