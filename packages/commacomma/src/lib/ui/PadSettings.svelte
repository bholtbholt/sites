<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { getRemixContext } from '../context';
	import { MUTE_GROUP_COUNT } from '../sampler/types';

	const store = getRemixContext();

	function handlePitchInput(e: Event) {
		const target = e.target as HTMLInputElement;
		store.setPitch(parseInt(target.value, 10));
	}

	function handleVolumeInput(e: Event) {
		const target = e.target as HTMLInputElement;
		store.setVolume(parseInt(target.value, 10) / 100);
	}

	function handleMuteGroupChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		store.setMuteGroup(parseInt(target.value, 10));
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			store.closePadSettings();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && store.isPadSettingsOpen) {
			store.closePadSettings();
		}
	}

	const volumePercent = $derived(
		store.selectedPadConfig ? Math.round(store.selectedPadConfig.volume * 100) : 100,
	);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if store.isPadSettingsOpen && store.selectedPadIndex !== null && store.selectedPadConfig}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="pad-settings-title"
		transition:fade={{ duration: 150 }}
	>
		<!-- Modal -->
		<div
			class="w-full max-w-sm rounded-lg bg-zinc-800 shadow-xl"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-zinc-700 p-4">
				<h2 id="pad-settings-title" class="text-lg font-semibold text-zinc-200">
					Pad {store.selectedPadIndex + 1} Settings
				</h2>
				<button
					type="button"
					class="text-zinc-400 hover:text-zinc-200"
					onclick={() => store.closePadSettings()}
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
			<div class="space-y-6 p-4">
				<!-- Sample -->
				<div>
					<label class="mb-2 block text-sm text-zinc-400">Sample</label>
					<button
						type="button"
						class="w-full rounded border border-zinc-600 bg-zinc-700 px-4 py-2 text-left text-zinc-200 transition-colors hover:bg-zinc-600"
						onclick={() => store.openSamplePicker()}
					>
						{store.selectedPadName}
					</button>
				</div>

				<!-- Pitch -->
				<div>
					<label for="pitch" class="mb-2 flex items-center justify-between text-sm text-zinc-400">
						<span>Pitch</span>
						<span class="text-zinc-200"
							>{store.selectedPadConfig.pitch > 0 ? '+' : ''}{store.selectedPadConfig.pitch} semitones</span
						>
					</label>
					<input
						id="pitch"
						type="range"
						min="-12"
						max="12"
						value={store.selectedPadConfig.pitch}
						oninput={handlePitchInput}
						class="w-full accent-blue-500"
					/>
					<div class="mt-1 flex justify-between text-xs text-zinc-500">
						<span>-12 (Octave Down)</span>
						<span>+12 (Octave Up)</span>
					</div>
				</div>

				<!-- Volume -->
				<div>
					<label for="volume" class="mb-2 flex items-center justify-between text-sm text-zinc-400">
						<span>Volume</span>
						<span class="text-zinc-200">{volumePercent}%</span>
					</label>
					<input
						id="volume"
						type="range"
						min="0"
						max="100"
						value={volumePercent}
						oninput={handleVolumeInput}
						class="w-full accent-blue-500"
					/>
				</div>

				<!-- Mute Group -->
				<div>
					<label for="mute-group" class="mb-2 block text-sm text-zinc-400">Mute Group</label>
					<select
						id="mute-group"
						value={store.selectedPadConfig.muteGroup}
						onchange={handleMuteGroupChange}
						class="w-full rounded border border-zinc-600 bg-zinc-700 px-4 py-2 text-zinc-200"
					>
						<option value="0">None</option>
						{#each { length: MUTE_GROUP_COUNT } as _, i (i)}
							<option value={i + 1}>Group {i + 1}</option>
						{/each}
					</select>
					<p class="mt-1 text-xs text-zinc-500">
						Pads in the same mute group will cut each other off
					</p>
				</div>
			</div>

			<!-- Footer -->
			<div class="border-t border-zinc-700 p-4">
				<button
					type="button"
					class="w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500"
					onclick={() => store.closePadSettings()}
				>
					Done
				</button>
			</div>
		</div>
	</div>
{/if}
