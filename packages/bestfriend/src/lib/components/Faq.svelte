<script lang="ts">
	import type { FaqItem } from '$lib/devices';

	let {
		items,
		eyebrow = 'FAQ',
		title = 'Common questions',
		tinted = false,
	}: {
		items: readonly FaqItem[];
		eyebrow?: string;
		title?: string;
		tinted?: boolean;
	} = $props();
</script>

<section
	class="px-5 py-16 sm:py-24 {tinted
		? 'bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900'
		: ''}"
>
	<div class="mx-auto max-w-3xl">
		<p
			class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
		>
			{eyebrow}
		</p>
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>

		<!-- <details> keeps the page scannable while leaving every answer in the HTML source,
		     which is what crawlers and answer engines actually read. -->
		<div
			class="mt-8 divide-y divide-slate-900/10 border-t border-b border-slate-900/10 dark:divide-white/10 dark:border-white/10"
		>
			{#each items as item (item.q)}
				<details class="group">
					<summary
						class="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden"
					>
						<h3 class="text-lg font-semibold">{item.q}</h3>
						<svg
							class="mt-1 h-5 w-5 shrink-0 fill-none stroke-blue-700 stroke-2 transition-transform duration-200 group-open:rotate-180 dark:stroke-blue-400"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</summary>
					<p class="pb-5 leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
