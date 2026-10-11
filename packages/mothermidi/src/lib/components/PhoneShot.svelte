<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	let {
		src,
		alt,
		eager = false,
		sizes = '(min-width: 640px) 320px, 64vw',
		class: className = 'mx-auto max-w-[16rem] sm:max-w-xs',
	}: { src: Picture; alt: string; eager?: boolean; sizes?: string; class?: string } = $props();
</script>

<!--
	Bezel only — the status bar is cropped off every screenshot, so there is no notch to draw.
	Radii are percentages so the frame scales with whatever width it is given.
-->
<div class={className}>
	<div
		class="bg-ash-900 ring-ash-700 overflow-hidden rounded-[11%/5.4%] p-[2%] shadow-2xl ring-1 shadow-black"
	>
		<div class="overflow-hidden rounded-[9.5%/4.6%]">
			<enhanced:img {src} {alt} {sizes} loading={eager ? 'eager' : 'lazy'} class="block w-full" />
		</div>
	</div>
</div>
