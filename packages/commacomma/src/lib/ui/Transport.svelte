<script lang="ts">
	import { getRemixContext } from '../context';
	import { MIN_BPM, MAX_BPM, MIN_STEPS, MAX_STEPS } from '../sequencer/types';

	const store = getRemixContext();

	function handleBpmInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);
		if (!isNaN(value)) {
			store.setBpm(Math.max(MIN_BPM, Math.min(MAX_BPM, value)));
		}
	}

	function handleStepsInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);
		if (!isNaN(value)) {
			store.setSteps(Math.max(MIN_STEPS, Math.min(MAX_STEPS, value)));
		}
	}

	function handlePlayStop() {
		if (store.isPlaying) {
			store.stop();
		} else {
			store.play();
		}
	}
</script>

<div class="transport flex flex-wrap items-center gap-4 rounded-lg bg-zinc-800 p-4">
	<!-- Play/Stop button -->
	<button
		type="button"
		class="flex h-12 w-12 items-center justify-center rounded-full transition-colors"
		class:bg-green-600={!store.isPlaying}
		class:hover:bg-green-500={!store.isPlaying}
		class:bg-red-600={store.isPlaying}
		class:hover:bg-red-500={store.isPlaying}
		onclick={handlePlayStop}
		aria-label={store.isPlaying ? 'Stop' : 'Play'}
	>
		{#if store.isPlaying}
			<!-- Stop icon -->
			<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
				<rect x="6" y="6" width="12" height="12" rx="1" />
			</svg>
		{:else}
			<!-- Play icon -->
			<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
				<path d="M8 5v14l11-7z" />
			</svg>
		{/if}
	</button>

	<!-- BPM control -->
	<div class="flex flex-col gap-1">
		<label for="bpm" class="text-xs text-zinc-400">BPM</label>
		<input
			id="bpm"
			type="number"
			min={MIN_BPM}
			max={MAX_BPM}
			value={store.sequencer.bpm}
			oninput={handleBpmInput}
			class="w-20 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-center text-zinc-200"
		/>
	</div>

	<!-- Steps control -->
	<div class="flex flex-col gap-1">
		<label for="steps" class="text-xs text-zinc-400">Steps</label>
		<input
			id="steps"
			type="number"
			min={MIN_STEPS}
			max={MAX_STEPS}
			value={store.sequencer.steps}
			oninput={handleStepsInput}
			class="w-20 rounded border border-zinc-600 bg-zinc-700 px-2 py-1 text-center text-zinc-200"
		/>
	</div>

	<!-- Spacer -->
	<div class="flex-1"></div>

	<!-- Clear button -->
	<button
		type="button"
		class="rounded bg-zinc-700 px-4 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-600"
		onclick={() => store.clearPattern()}
	>
		Clear
	</button>

	<!-- Share button -->
	<button
		type="button"
		class="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500"
		onclick={() => store.share()}
	>
		Share
	</button>
</div>
