<script lang="ts">
	import keyboard from '$lib/assets/keyboard-ipad.png?enhanced';
	import oxblood from '$lib/assets/oxblood-iphone.png?enhanced';
	import PhoneShot from './PhoneShot.svelte';
	import StoreBadge from './StoreBadge.svelte';
	import TabletShot from './TabletShot.svelte';
	import { site } from '$lib/site';
</script>

<!-- The device pair is wider than its column on purpose; the section clips the iPad at the viewport edge. -->
<section class="overflow-hidden px-4 pt-28 pb-20 sm:px-5 sm:pt-36 sm:pb-28 lg:pt-32">
	<div class="mx-auto grid max-w-5xl items-center gap-14 sm:gap-20 lg:grid-cols-2 lg:gap-10">
		<div class="text-center lg:text-left">
			<h1 class="smallcaps text-5xl leading-none whitespace-nowrap sm:text-7xl lg:text-7xl">
				{site.name}
			</h1>

			<p class="text-ash-300 mt-6 text-2xl sm:text-2xl lg:text-xl">
				A MIDI chord generator eternally devoted to your synthesizers.
			</p>

			<div class="mt-10 flex justify-center lg:justify-start">
				<StoreBadge />
			</div>
		</div>

		<div class="relative w-[135%] pb-[3%] pl-[7%] sm:w-[125%] lg:w-[780px] xl:w-[900px]">
			<TabletShot
				src={keyboard}
				alt="{site.name} on iPad: a twelve-key keyboard sounding a major seventh, with Maj and M7 held and the arpeggiator set to 16ths"
				class="w-full"
				sizes="(min-width: 1280px) 840px, (min-width: 1024px) 725px, 125vw"
				eager
			/>
			<PhoneShot
				src={oxblood}
				alt="{site.name} on iPhone in its oxblood theme, with m7 and Maj held"
				class="absolute bottom-0 left-0 w-[21%]"
				sizes="(min-width: 1280px) 190px, (min-width: 1024px) 165px, 28vw"
				eager
			/>
		</div>
	</div>
</section>
