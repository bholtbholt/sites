<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '$lib/site';
	import { devices } from '$lib/devices';
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
				<li>
					<a
						class="block rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:ring-white/10 dark:hover:ring-blue-400/30"
						href={resolve('/[device=device]', { device: device.slug })}
					>
						<span class="font-semibold">{device.name}</span>
						<span class="text-slate-500 dark:text-slate-400"> {device.sub}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-8 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
			<p>
				{site.name} is an extended display and management tool that requires a connection to the Teenage
				Engineering hardware. Use a USB-C to USB-C data cable.
			</p>
			<p>
				On a Lightning iPhone or iPad, use an MFi-certified Lightning to USB adapter with a USB-IF
				certified USB-A to USB-C cable.
			</p>
			<p>
				Requires iOS {site.minOs}, iPadOS {site.minOs}, or macOS {site.minOs} or later. On a Mac you'll
				need Apple silicon.
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
