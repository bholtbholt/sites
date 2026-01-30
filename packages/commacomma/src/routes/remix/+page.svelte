<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { RemixStore } from '$lib/stores';
	import { setRemixContext } from '$lib/context';
	import { PadGrid, StepGrid, Transport, SamplePicker, PadSettings, LoadingSpinner } from '$lib/ui';

	// Create the remix store and set it in context
	const store = new RemixStore();
	setRemixContext(store);

	// Sync state to URL when pads or pattern change
	$effect(() => {
		// Access reactive properties to create dependencies
		const _pads = store.sampler.pads;
		const _pattern = store.sequencer.pattern;
		// Sync to URL (uses untrack internally to avoid circular deps)
		store.syncToUrl();
	});

	// Derive isReady to ensure proper reactivity tracking in template
	const isReady = $derived(store.isReady);

	onMount(() => {
		store.init();
	});

	onDestroy(() => {
		store.dispose();
	});
</script>

<svelte:head>
	<title>Remix | Comma Comma</title>
	<meta name="description" content="Create your own remix with the Comma Comma sampler" />
</svelte:head>

<div class="remix-page min-h-screen bg-zinc-900 text-zinc-100">
	<!-- Header -->
	<header class="border-b border-zinc-800 px-4 py-4">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<h1 class="text-2xl font-bold">Comma Comma Remix</h1>

			<!-- View toggle (mobile) -->
			<div class="flex gap-1 sm:hidden">
				<button
					type="button"
					class="rounded px-3 py-1 text-sm transition-colors"
					class:bg-zinc-700={store.currentView === 'pads'}
					class:text-zinc-400={store.currentView !== 'pads'}
					onclick={() => store.setCurrentView('pads')}
				>
					Pads
				</button>
				<button
					type="button"
					class="rounded px-3 py-1 text-sm transition-colors"
					class:bg-zinc-700={store.currentView === 'sequencer'}
					class:text-zinc-400={store.currentView !== 'sequencer'}
					onclick={() => store.setCurrentView('sequencer')}
				>
					Sequencer
				</button>
			</div>
		</div>
	</header>

	<!-- Main content -->
	<main class="mx-auto max-w-7xl px-4 py-6">
		{#if !isReady}
			<!-- Loading state -->
			<div class="flex items-center justify-center py-12">
				<div class="text-center">
					<LoadingSpinner size="lg" message="Loading samples..." />
					{#if store.sampler.error}
						<div class="mt-4 text-red-400">{store.sampler.error}</div>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Desktop: New layout with transport left of pads, sequencer below -->
			<div class="hidden sm:block">
				<!-- Top section: Transport and Pads side by side -->
				<div class="mb-6 flex gap-6">
					<!-- Transport controls (left) -->
					<div class="flex-shrink-0">
						<Transport />

						<!-- Share message -->
						{#if store.shareMessage}
							<div class="mt-2 text-center text-sm text-green-400">
								{store.shareMessage}
							</div>
						{/if}
					</div>

					<!-- Pads (center/right) -->
					<div class="flex-1">
						<h2 class="mb-3 text-sm font-medium text-zinc-400">Pads</h2>
						<PadGrid />
						<p class="mt-2 text-center text-xs text-zinc-500">Click to play, right-click to edit</p>
					</div>
				</div>

				<!-- Sequencer (below) -->
				<div class="overflow-x-auto">
					<h2 class="mb-3 text-sm font-medium text-zinc-400">Sequencer</h2>
					<StepGrid />
				</div>
			</div>

			<!-- Mobile: Tabbed layout with transport on top -->
			<div class="sm:hidden">
				<!-- Transport -->
				<div class="mb-4">
					<Transport />

					<!-- Share message -->
					{#if store.shareMessage}
						<div class="mt-2 text-center text-sm text-green-400">
							{store.shareMessage}
						</div>
					{/if}
				</div>

				<!-- Tabbed content -->
				{#if store.currentView === 'pads'}
					<PadGrid />
					<p class="mt-2 text-center text-xs text-zinc-500">Tap to play, long-press to edit</p>
				{:else}
					<div class="overflow-x-auto">
						<StepGrid />
					</div>
				{/if}
			</div>

			<!-- Keyboard shortcuts help (desktop only) -->
			<div class="mt-6 hidden text-center text-xs text-zinc-500 sm:block">
				<p>Keyboard: 3456 / ERTY / DFGH / CVBN or Numpad</p>
			</div>
		{/if}
	</main>

	<!-- Modals -->
	<SamplePicker />

	{#if store.selectedPadIndex !== null && store.selectedPadConfig}
		<PadSettings />
	{/if}
</div>
