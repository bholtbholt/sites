<script lang="ts">
	import Step from './Step.svelte';

	interface Props {
		padName: string;
		steps: boolean[];
		currentStep: number;
		isPlaying: boolean;
		ontoggle: (stepIndex: number) => void;
	}

	let { padName, steps, currentStep, isPlaying, ontoggle }: Props = $props();
</script>

<div class="step-row flex items-center gap-2">
	<!-- Pad label -->
	<div class="w-20 flex-shrink-0 truncate text-right text-sm text-zinc-400 sm:w-24">
		{padName}
	</div>

	<!-- Steps -->
	<div class="flex flex-wrap gap-1">
		{#each steps as isActive, stepIndex (stepIndex)}
			<Step
				{isActive}
				isCurrent={isPlaying && currentStep === stepIndex}
				{stepIndex}
				ontoggle={() => ontoggle(stepIndex)}
			/>
		{/each}
	</div>
</div>
