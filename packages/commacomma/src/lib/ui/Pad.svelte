<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getKeyLabel } from '../shared/keyboardMap';

	interface Props {
		index: number;
		sampleName: string;
		isTriggered: boolean;
		muteGroup: number;
		ontrigger?: () => void;
		onselect?: () => void;
	}

	let { index, sampleName, isTriggered, muteGroup, ontrigger, onselect }: Props = $props();

	const dispatch = createEventDispatcher<{
		trigger: { index: number };
		select: { index: number };
	}>();

	const keyLabel = $derived(getKeyLabel(index));

	// Mute group colors
	const muteGroupColors: Record<number, string> = {
		0: 'border-zinc-600',
		1: 'border-red-500',
		2: 'border-blue-500',
		3: 'border-green-500',
		4: 'border-yellow-500',
	};

	const borderColor = $derived(muteGroupColors[muteGroup] ?? 'border-zinc-600');

	// Long-press detection for mobile
	let longPressTimer: ReturnType<typeof setTimeout> | null = null;
	let didLongPress = false;
	const LONG_PRESS_DURATION = 500; // ms

	function handleClick() {
		ontrigger?.();
		dispatch('trigger', { index });
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		onselect?.();
		dispatch('select', { index });
	}

	function handleTouchStart() {
		didLongPress = false;
		longPressTimer = setTimeout(() => {
			didLongPress = true;
			onselect?.();
			dispatch('select', { index });
		}, LONG_PRESS_DURATION);
	}

	function handleTouchEnd(e: TouchEvent) {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = null;
		}
		if (!didLongPress) {
			e.preventDefault();
			ontrigger?.();
			dispatch('trigger', { index });
		}
	}

	function handleTouchCancel() {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = null;
		}
	}
</script>

<button
	type="button"
	class="pad relative flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 bg-zinc-800 p-2 text-center transition-all duration-75 select-none {borderColor}"
	class:bg-zinc-500={isTriggered}
	class:scale-95={isTriggered}
	onclick={handleClick}
	oncontextmenu={handleContextMenu}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchCancel}
>
	<!-- Key label -->
	<span class="absolute top-1 left-2 text-xs text-zinc-500">{keyLabel}</span>

	<!-- Sample name -->
	<span class="max-w-full truncate px-1 text-sm font-medium text-zinc-200">
		{sampleName}
	</span>

	<!-- Pad number -->
	<span class="absolute right-2 bottom-1 text-xs text-zinc-500">{index + 1}</span>

	<!-- Mute group indicator -->
	{#if muteGroup > 0}
		<span
			class="absolute top-1 right-2 text-xs font-bold {muteGroupColors[muteGroup]?.replace(
				'border-',
				'text-',
			)}"
		>
			M{muteGroup}
		</span>
	{/if}
</button>

<style>
	.pad {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	.pad:active {
		transform: scale(0.95);
		background-color: rgb(113 113 122); /* zinc-500 */
	}

	@media (hover: hover) {
		.pad:hover {
			background-color: rgb(63 63 70); /* zinc-700 */
		}
	}
</style>
