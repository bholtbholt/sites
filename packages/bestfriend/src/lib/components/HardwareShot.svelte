<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import PhoneFrame from './PhoneFrame.svelte';

	let {
		hardware,
		hardwareAlt,
		screen,
		screenAlt,
		eager = false,
	}: {
		hardware: Picture;
		hardwareAlt: string;
		screen: Picture;
		screenAlt: string;
		eager?: boolean;
	} = $props();
</script>

<!--
	Kept to real-world scale: a phone is about as tall as an EP is wide, so the phone is
	~46% of the sampler's width. Both run off the bottom of the hero, which sits flush
	against the next section for a straight cut.
-->
<div
	class="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden lg:max-w-none lg:self-end xl:w-[560px]"
>
	<enhanced:img
		src={hardware}
		alt={hardwareAlt}
		sizes="(min-width: 1280px) 450px, (min-width: 1024px) 380px, (min-width: 448px) 360px, 80vw"
		loading={eager ? 'eager' : 'lazy'}
		class="absolute top-0 right-0 block w-[80%]"
	/>

	<div class="absolute top-[30%] left-0 w-[37%]">
		<PhoneFrame class="shadow-2xl">
			<enhanced:img
				src={screen}
				alt={screenAlt}
				sizes="(min-width: 1280px) 210px, (min-width: 1024px) 175px, (min-width: 448px) 165px, 37vw"
				loading={eager ? 'eager' : 'lazy'}
				class="block w-full"
			/>
		</PhoneFrame>
	</div>
</div>
