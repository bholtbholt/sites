<script lang="ts">
	import type { Snippet } from 'svelte';
	import { roman } from '$lib/numerals';

	let {
		numeral,
		eyebrow,
		title,
		mirrored = false,
		bleed = false,
		visual,
		children,
	}: {
		numeral: number;
		eyebrow: string;
		title: string;
		mirrored?: boolean;
		/**
		 * Visual runs past the column and is clipped at the viewport edge: the right edge when mirrored,
		 * the left otherwise (mobile always bleeds right). For the landscape iPad shots.
		 */
		bleed?: boolean;
		visual: Snippet;
		children: Snippet;
	} = $props();
</script>

<section
	class="border-ash-800 border-t px-4 py-20 sm:px-5 sm:py-28 {bleed ? 'overflow-hidden' : ''}"
>
	<div class="mx-auto grid max-w-5xl items-center gap-12 sm:gap-16 lg:grid-cols-2">
		<!-- The visual leads on mobile. -->
		<div class="order-2 {mirrored ? 'lg:order-1' : ''}">
			<p class="flex items-baseline gap-4">
				<span class="text-oxblood-500 text-4xl" aria-hidden="true">{roman(numeral)}</span>
				<span class="smallcaps text-ash-400">{eyebrow}</span>
			</p>
			<h2 class="mt-4 text-4xl tracking-tight text-balance sm:text-5xl">{title}</h2>
			<div class="text-ash-300 mt-6 space-y-4 text-xl leading-relaxed">
				{@render children()}
			</div>
		</div>

		<div
			class="order-1 {mirrored ? 'lg:order-2' : ''} {bleed
				? `w-[125%] lg:w-[780px] xl:w-[900px] ${mirrored ? '' : 'lg:justify-self-end'}`
				: ''}"
		>
			{@render visual()}
		</div>
	</div>
</section>
