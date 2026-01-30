<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { getRemixContext } from '../context';
	import { getSamplesByCategory } from '../shared/sampleLibrary';

	const store = getRemixContext();

	const categories = $derived(getSamplesByCategory());

	function handleSelect(sampleId: string | null) {
		store.selectSample(sampleId);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			store.closeSamplePicker();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && store.isSamplePickerOpen) {
			store.closeSamplePicker();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if store.isSamplePickerOpen}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="sample-picker-title"
		transition:fade={{ duration: 150 }}
	>
		<!-- Modal -->
		<div
			class="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-zinc-800 shadow-xl"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<!-- Header -->
			<div
				class="sticky top-0 flex items-center justify-between border-b border-zinc-700 bg-zinc-800 p-4"
			>
				<h2 id="sample-picker-title" class="text-lg font-semibold text-zinc-200">Select Sample</h2>
				<button
					type="button"
					class="text-zinc-400 hover:text-zinc-200"
					onclick={() => store.closeSamplePicker()}
					aria-label="Close"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Content -->
			<div class="p-4">
				<!-- Empty option -->
				<button
					type="button"
					class="mb-4 w-full rounded border border-zinc-600 px-4 py-2 text-left transition-colors hover:bg-zinc-700"
					class:bg-zinc-700={store.selectedPadConfig?.sampleId === null}
					onclick={() => handleSelect(null)}
				>
					<span class="text-zinc-400">Empty (No Sample)</span>
				</button>

				<!-- Categories -->
				{#each Object.entries(categories) as [category, samples] (category)}
					{#if samples.length > 0}
						<div class="mb-4">
							<h3 class="mb-2 text-sm font-medium text-zinc-400">{category}</h3>
							<div class="grid grid-cols-2 gap-2">
								{#each samples as sample (sample.id)}
									<button
										type="button"
										class="rounded border border-zinc-600 px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-700"
										class:bg-zinc-700={store.selectedPadConfig?.sampleId === sample.id}
										class:border-blue-500={store.selectedPadConfig?.sampleId === sample.id}
										onclick={() => handleSelect(sample.id)}
									>
										{sample.name}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
