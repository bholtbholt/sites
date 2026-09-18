<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import PhoneFrame from './PhoneFrame.svelte';

	let { src, alt, eager = false }: { src: Picture; alt: string; eager?: boolean } = $props();
</script>

<!--
	Every band renders its screenshot the same way: one portrait phone, centred, capped
	at the same width. Keeping the sizes hint here means it only has to be right once.
-->
<div class="mx-auto max-w-[16rem] sm:max-w-xs">
	<PhoneFrame>
		<enhanced:img
			{src}
			{alt}
			sizes="(min-width: 640px) 320px, 64vw"
			loading={eager ? 'eager' : 'lazy'}
			class="block w-full"
		/>
	</PhoneFrame>
</div>
