<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { Seo, site } from '$lib/index';
	import Turnstile from '$lib/components/Turnstile.svelte';
	import { MAX_AUTHOR_LENGTH, TAGS, type Tag } from '$lib/bankSnapshots/constants';

	let { data, form } = $props();

	const link =
		'font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400';
	const chip = 'rounded-full px-3 py-1 text-sm font-medium transition';
	const chipOn = 'bg-blue-700 text-white dark:bg-blue-400 dark:text-slate-950';
	const chipOff =
		'bg-white text-slate-600 ring-1 ring-slate-900/10 hover:ring-blue-700/40 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10';

	const title = 'Bank Snapshots — share EP-133, EP-40 & EP-1320 kits';
	const description = `Download free bank snapshots for the Teenage Engineering EP-133 K.O. II, EP-40, and EP-1320, or share your own .epbank kit from ${site.name}.`;

	let turnstile: Turnstile | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();
	let dialogOpen = $state(false);
	let fileInput: HTMLInputElement | undefined = $state();
	let submitting = $state(false);

	const UPLOADER_KEY = 'bank-snapshots:uploader';
	const FORMAT_KEY = 'bank-snapshots:format';

	let author = $state('');
	let tags = $state<string[]>([]);
	let format = $state<'epbank' | 'zip'>('epbank');

	// Storage can throw (private mode, blocked site data), and none of this is essential.
	function readStorage(key: string): string | null {
		try {
			return localStorage.getItem(key);
		} catch {
			return null;
		}
	}

	function writeStorage(key: string, value: string) {
		try {
			localStorage.setItem(key, value);
		} catch {
			// Ignored: see readStorage.
		}
	}

	onMount(() => {
		try {
			const saved = JSON.parse(readStorage(UPLOADER_KEY) ?? '{}');
			if (typeof saved.author === 'string') author = saved.author;
			if (Array.isArray(saved.tags))
				tags = saved.tags.filter((tag: string) => TAGS.includes(tag as Tag));
		} catch {
			// Corrupt value: start fresh.
		}
		if (readStorage(FORMAT_KEY) === 'zip') format = 'zip';
	});

	function setFormat(value: 'epbank' | 'zip') {
		format = value;
		writeStorage(FORMAT_KEY, value);
	}

	function downloadHref(id: string) {
		const base = resolve('/bank-snapshots/[id]/download', { id });
		return (format === 'zip' ? `${base}?format=zip` : base) as ResolvedPathname;
	}

	let audio: HTMLAudioElement | undefined;
	let playing = $state<string | null>(null);

	function listHref(params: { sort?: string; tag?: string | null; page?: number }) {
		const sort = params.sort ?? data.sort;
		const tag = params.tag === undefined ? data.tag : params.tag;
		const page = params.page ?? 1;

		const parts = [
			sort !== 'new' && `sort=${sort}`,
			tag && `tag=${encodeURIComponent(tag)}`,
			page > 1 && `page=${page}`,
		].filter(Boolean);

		const search = parts.length ? `?${parts.join('&')}` : '';
		return `${resolve('/bank-snapshots')}${search}` as ResolvedPathname;
	}

	function openDialog() {
		dialogOpen = true;
		dialog?.showModal();
	}

	function togglePad(id: string, index: number) {
		const key = `${id}/${index}`;
		audio ??= new Audio();

		if (playing === key) {
			audio.pause();
			playing = null;
			return;
		}

		audio.src = resolve('/bank-snapshots/[id]/pads/[index]', { id, index: String(index) });
		audio.onended = () => (playing = null);
		audio.play().catch(() => (playing = null));
		playing = key;
	}
</script>

<Seo {title} {description} path="/bank-snapshots" />

<div class="mx-auto max-w-5xl px-5 py-16 sm:py-24">
	<h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">Bank Snapshots</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
		Kits shared by the community. Download a <code>.epbank</code> file and open it in
		{site.name} to load it onto your EP, or share one of your own.
		<a class={link} href={resolve('/docs/[slug]', { slug: 'bank-snapshots' })}
			>How Bank Snapshots work</a
		>.
	</p>

	<div class="mt-8 flex flex-wrap items-center gap-4">
		<button
			class="rounded-full px-5 py-2.5 font-semibold text-blue-700 ring-1 ring-blue-700/30 transition hover:bg-blue-700/5 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:bg-blue-400/10"
			type="button"
			onclick={openDialog}
		>
			Share a snapshot
		</button>
		{#if form?.uploaded}
			<p class="text-sm font-medium text-green-700 dark:text-green-400" role="status">
				Shared “{form.uploaded}”. Thank you!
			</p>
		{/if}
	</div>

	<!-- Clicks on the dialog element itself only land on the backdrop; content is in the inner div. -->
	<dialog
		bind:this={dialog}
		class="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white text-slate-900 shadow-xl backdrop:bg-slate-950/50 dark:bg-slate-900 dark:text-slate-100"
		aria-labelledby="upload-heading"
		onclose={() => (dialogOpen = false)}
		onclick={(event) => event.target === dialog && dialog.close()}
	>
		<div class="p-6">
			<div class="flex items-start justify-between gap-4">
				<h2 id="upload-heading" class="text-xl font-semibold text-blue-700 dark:text-blue-400">
					Share a snapshot
				</h2>
				<button
					class="-m-1 rounded-full p-1 text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
					type="button"
					aria-label="Close"
					onclick={() => dialog?.close()}
				>
					<svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
						/>
					</svg>
				</button>
			</div>
			<p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
				The name and notes come from the snapshot. Only share samples you have the right to share.
			</p>

			<form
				class="mt-6 space-y-5"
				method="POST"
				action="?/upload"
				enctype="multipart/form-data"
				use:enhance={() => {
					submitting = true;

					return async ({ result, update }) => {
						submitting = false;
						turnstile?.reset();
						if (result.type === 'success') {
							writeStorage(UPLOADER_KEY, JSON.stringify({ author, tags }));
							if (fileInput) fileInput.value = '';
							dialog?.close();
						}
						await update({ reset: false });
					};
				}}
			>
				<label class="block">
					<span class="text-sm font-medium">Snapshot file</span>
					<input
						class="mt-1 block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:font-semibold file:text-white dark:file:bg-blue-400 dark:file:text-slate-950"
						type="file"
						name="file"
						accept=".epbank"
						required
						bind:this={fileInput}
					/>
				</label>

				<label class="block">
					<span class="text-sm font-medium"
						>Your name <span class="text-slate-500">(optional)</span></span
					>
					<input
						class="mt-1 block w-full rounded-lg border-slate-300 bg-transparent dark:border-slate-700"
						type="text"
						name="author"
						maxlength={MAX_AUTHOR_LENGTH}
						autocomplete="nickname"
						bind:value={author}
					/>
				</label>

				<fieldset>
					<legend class="text-sm font-medium"> Tags</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each TAGS as tag (tag)}
							<label
								class="{chip} {chipOff} cursor-pointer has-checked:bg-blue-700 has-checked:text-white has-checked:ring-0 has-focus-visible:outline-2 dark:has-checked:bg-blue-400 dark:has-checked:text-slate-950"
							>
								<input class="sr-only" type="checkbox" name="tags" value={tag} bind:group={tags} />
								{tag}
							</label>
						{/each}
					</div>
				</fieldset>

				{#if dialogOpen}
					<Turnstile bind:this={turnstile} />
				{/if}

				{#if form?.error}
					<p class="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
						{form.error}
					</p>
				{/if}

				<button
					class="rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
					type="submit"
					disabled={submitting}
				>
					{submitting ? 'Uploading…' : 'Upload'}
				</button>
			</form>
		</div>
	</dialog>

	<!-- Sorting and filtering re-run the load; keep the reader where they are. -->
	<div data-sveltekit-noscroll>
		<div class="mt-16 flex flex-wrap items-center justify-between gap-4">
			<h2 class="text-2xl font-bold tracking-tight">Browse</h2>
			<div class="flex flex-wrap items-center gap-2" role="group" aria-labelledby="format-label">
				<span id="format-label" class="text-sm text-slate-500 dark:text-slate-400">Download as</span
				>
				{#each ['epbank', 'zip'] as const as value (value)}
					<button
						class="{chip} {format === value ? chipOn : chipOff}"
						type="button"
						aria-pressed={format === value}
						onclick={() => setFormat(value)}>.{value}</button
					>
				{/each}
			</div>
			<div class="flex gap-2" role="group" aria-label="Sort">
				<a class="{chip} {data.sort === 'new' ? chipOn : chipOff}" href={listHref({ sort: 'new' })}
					>Newest</a
				>
				<a
					class="{chip} {data.sort === 'popular' ? chipOn : chipOff}"
					href={listHref({ sort: 'popular' })}>Popular</a
				>
			</div>
		</div>

		<nav class="mt-4 flex flex-wrap gap-2" aria-label="Filter by tag">
			<a class="{chip} {data.tag === null ? chipOn : chipOff}" href={listHref({ tag: null })}>All</a
			>
			{#each TAGS as tag (tag)}
				<a class="{chip} {data.tag === tag ? chipOn : chipOff}" href={listHref({ tag })}>{tag}</a>
			{/each}
		</nav>

		{#if data.snapshots.length === 0}
			<p class="mt-10 text-slate-600 dark:text-slate-300">
				No snapshots here yet. Be the first to share one.
			</p>
		{:else}
			<ul class="mt-8 grid gap-4 sm:grid-cols-2">
				{#each data.snapshots as snapshot (snapshot.id)}
					<li
						class="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
					>
						<h3 class="text-lg font-semibold text-blue-700 dark:text-blue-400">{snapshot.name}</h3>
						<p class="text-sm text-slate-500 dark:text-slate-400">
							by {snapshot.author || 'Anonymous'}
						</p>

						{#if snapshot.tags.length}
							<div class="mt-3 flex flex-wrap gap-1.5">
								{#each snapshot.tags as tag (tag)}
									<a
										class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300"
										href={listHref({ tag })}>{tag}</a
									>
								{/each}
							</div>
						{/if}

						{#if snapshot.notes}
							<p class="mt-3 whitespace-pre-line text-slate-600 dark:text-slate-300">
								{snapshot.notes}
							</p>
						{/if}

						<ol class="mt-4 grid grid-cols-2 gap-1.5 text-sm sm:grid-cols-3">
							{#each snapshot.pads as pad, index (index)}
								{@const isPlaying = playing === `${snapshot.id}/${index}`}
								<li>
									<button
										class="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left ring-1 transition {isPlaying
											? 'bg-orange-500 text-white ring-orange-500'
											: 'ring-slate-900/10 hover:ring-blue-700/40 dark:ring-white/10'}"
										type="button"
										aria-label="{isPlaying ? 'Stop' : 'Play'} {pad.name}"
										aria-pressed={isPlaying}
										onclick={() => togglePad(snapshot.id, index)}
									>
										<span aria-hidden="true">{isPlaying ? '■' : '▶'}</span>
										<span class="truncate">{pad.name}</span>
									</button>
								</li>
							{/each}
						</ol>

						<div class="mt-auto flex items-center justify-between gap-4 pt-5">
							<span class="text-sm text-slate-500 dark:text-slate-400">
								{snapshot.downloads}
								{snapshot.downloads === 1 ? 'download' : 'downloads'}
							</span>
							<a
								class="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
								href={downloadHref(snapshot.id)}
								rel="nofollow"
								download
							>
								Download
							</a>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#if data.page > 1 || data.hasMore}
		<nav class="mt-10 flex justify-between text-sm" aria-label="Pagination">
			{#if data.page > 1}
				<a class={link} href={listHref({ page: data.page - 1 })}>&larr; Previous</a>
			{:else}
				<span></span>
			{/if}
			{#if data.hasMore}
				<a class={link} href={listHref({ page: data.page + 1 })}>Next &rarr;</a>
			{/if}
		</nav>
	{/if}

	<p class="mt-16 text-sm text-slate-500 dark:text-slate-400">
		See something that shouldn’t be here?
		<a class={link} href={resolve('/support')}>Report a snapshot</a>.
	</p>
</div>
