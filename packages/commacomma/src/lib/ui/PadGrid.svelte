<script lang="ts">
	import { getRemixContext } from '../context';
	import Pad from './Pad.svelte';

	const store = getRemixContext();
</script>

<div class="pad-grid grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
	{#each store.sampler.pads as pad, index (index)}
		<Pad
			{index}
			sampleName={store.getSampleName(pad.sampleId)}
			isTriggered={store.sampler.triggeredPads.has(index)}
			muteGroup={pad.muteGroup}
			ontrigger={() => store.triggerPad(index)}
			onselect={() => store.selectPad(index)}
		/>
	{/each}
</div>

<style>
	.pad-grid {
		max-width: 100%;
		aspect-ratio: 1;
	}

	@media (min-width: 640px) {
		.pad-grid {
			max-width: 400px;
		}
	}
</style>
