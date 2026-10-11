<script lang="ts">
	import type { FaqItem } from '$lib/faq';

	let { items }: { items: readonly FaqItem[] } = $props();
</script>

<section id="faq" class="border-ash-800 border-t px-4 py-20 sm:px-5 sm:py-28">
	<div class="mx-auto max-w-3xl">
		<p class="smallcaps text-ash-400">Catechism</p>
		<h2 class="mt-4 text-4xl tracking-tight text-balance sm:text-5xl">Questions, answered.</h2>

		<!-- <details> keeps the page scannable while leaving every answer in the HTML source,
		     which is what crawlers and answer engines actually read. -->
		<div class="divide-ash-800 border-ash-800 mt-12 divide-y border-y">
			{#each items as item (item.q)}
				<details class="group">
					<summary
						class="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden"
					>
						<h3 class="text-xl">{item.q}</h3>
						<svg
							class="stroke-oxblood-400 mt-1.5 size-4 shrink-0 stroke-[1.5] transition-transform duration-200 group-open:rotate-45"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<path d="M8 1v14M1 8h14" />
						</svg>
					</summary>
					<p class="text-ash-300 pb-6 text-lg leading-relaxed">{item.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
