<script lang="ts">
	import { getRemixContext } from '../context';
	import StepRow from './StepRow.svelte';

	const store = getRemixContext();
</script>

<div class="step-grid flex flex-col gap-1 overflow-x-auto pb-4">
	<!-- Step numbers header -->
	<div class="flex items-center gap-2">
		<div class="w-20 flex-shrink-0 sm:w-24"></div>
		<div class="flex gap-1">
			{#each { length: store.sequencer.steps } as _, stepIndex (stepIndex)}
				<div
					class="flex h-4 w-8 items-center justify-center text-xs sm:w-6"
					class:text-zinc-400={stepIndex % 4 !== 0}
					class:text-zinc-200={stepIndex % 4 === 0}
					class:font-bold={stepIndex % 4 === 0}
				>
					{stepIndex + 1}
				</div>
			{/each}
		</div>
	</div>

	<!-- Rows for each pad -->
	{#each store.sequencer.pattern.grid as padSteps, padIndex (padIndex)}
		<StepRow
			padName={store.getSampleNameForPad(padIndex)}
			steps={padSteps}
			currentStep={store.sequencer.currentStep}
			isPlaying={store.isPlaying}
			ontoggle={(stepIndex: number) => store.toggleStep(padIndex, stepIndex)}
		/>
	{/each}
</div>

<style>
	.step-grid {
		max-width: 100%;
	}
</style>
