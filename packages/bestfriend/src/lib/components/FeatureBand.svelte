<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		mirrored = false,
		tinted = false,
		visual,
		children,
	}: {
		eyebrow?: string;
		title: string;
		mirrored?: boolean;
		tinted?: boolean;
		visual: Snippet;
		children: Snippet;
	} = $props();
</script>

<section
	class="px-5 py-16 sm:py-24 {tinted
		? 'bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900'
		: ''}"
>
	<div class="mx-auto grid max-w-5xl items-center gap-10 sm:gap-16 lg:grid-cols-2">
		<!-- Visual leads on mobile; mirroring only kicks in once there are two columns. -->
		<div class={mirrored ? 'lg:order-2' : ''}>
			{@render visual()}
		</div>

		<div class={mirrored ? 'lg:order-1' : ''}>
			{#if eyebrow}
				<p
					class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
				>
					{eyebrow}
				</p>
			{/if}
			<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
			<div class="mt-4 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
				{@render children()}
			</div>
		</div>
	</div>
</section>
