<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Props {
		isActive: boolean;
		isCurrent: boolean;
		stepIndex: number;
		ontoggle?: () => void;
	}

	let { isActive, isCurrent, stepIndex, ontoggle }: Props = $props();

	const dispatch = createEventDispatcher<{
		toggle: { stepIndex: number };
	}>();

	// Highlight every 4th step for visual grouping (beat markers)
	const isBeatStart = $derived(stepIndex % 4 === 0);

	function handleClick() {
		ontoggle?.();
		dispatch('toggle', { stepIndex });
	}
</script>

<button
	type="button"
	class="step h-8 w-8 rounded border transition-all duration-75 sm:h-6 sm:w-6"
	class:bg-zinc-300={isActive && !isCurrent}
	class:bg-amber-400={isActive && isCurrent}
	class:bg-zinc-700={!isActive && !isCurrent}
	class:bg-zinc-500={!isActive && isCurrent}
	class:border-zinc-500={!isBeatStart}
	class:border-zinc-400={isBeatStart}
	onclick={handleClick}
	aria-label="Step {stepIndex + 1}, {isActive ? 'active' : 'inactive'}"
	aria-pressed={isActive}
></button>

<style>
	.step {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		min-width: 1.5rem;
		min-height: 1.5rem;
	}

	.step:active {
		transform: scale(0.9);
	}

	@media (hover: hover) {
		.step:hover {
			opacity: 0.8;
		}
	}
</style>
