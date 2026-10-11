<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	let {
		src,
		alt,
		eager = false,
		sizes = '(min-width: 1024px) 896px, 92vw',
		class: className = 'mx-auto max-w-4xl',
	}: { src: Picture; alt: string; eager?: boolean; sizes?: string; class?: string } = $props();
</script>

<!-- Landscape iPad. Same bezel language as PhoneShot, with radii flipped for the wide frame. -->
<div class={className}>
	<div
		class="bg-ash-900 ring-ash-700 overflow-hidden rounded-[3.2%/4.8%] p-[1.2%] shadow-2xl ring-1 shadow-black"
	>
		<div class="overflow-hidden rounded-[2.2%/3.3%]">
			<enhanced:img
				{src}
				{alt}
				{sizes}
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : undefined}
				class="block w-full"
			/>
		</div>
	</div>
</div>
