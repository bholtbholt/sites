<script lang="ts">
	import PhoneFrame from './PhoneFrame.svelte';
	import padSystem from '$lib/assets/pad-system.png?enhanced';
	import padEp133Dark from '$lib/assets/pad-ep133-dark.png?enhanced';
	import padEp40 from '$lib/assets/pad-ep40.png?enhanced';
	import padEp1320Dark from '$lib/assets/pad-ep1320-dark.png?enhanced';

	// Alternating light and dark so the fan shows off all four themes at a glance.
	const shots = [
		{ src: padSystem, alt: 'Best Friend pad settings in the light Apple theme' },
		{ src: padEp133Dark, alt: 'Best Friend pad settings in the EP-133 dark theme' },
		{ src: padEp40, alt: 'Best Friend pad settings in the EP-40 light theme' },
		{ src: padEp1320Dark, alt: 'Best Friend pad settings in the EP-1320 dark theme' },
	];

	// Fan out from the centre: the outer phones lean hardest, and each one
	// overlaps the last so four portrait screenshots still fit a 320px screen.
	const angle = (i: number) => (i - (shots.length - 1) / 2) * 5;
</script>

<div class="flex origin-bottom items-end justify-center px-2">
	{#each shots as shot, i (shot.alt)}
		<div
			class="w-[30%] origin-bottom transition-transform duration-300 hover:-translate-y-2 lg:w-[34%]"
			style="rotate: {angle(i)}deg; z-index: {i}; margin-left: {i === 0 ? 0 : -12}%;"
		>
			<PhoneFrame>
				<enhanced:img
					src={shot.src}
					alt={shot.alt}
					sizes="(min-width: 1024px) 160px, 28vw"
					loading={i === 0 ? 'eager' : 'lazy'}
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/each}
</div>
