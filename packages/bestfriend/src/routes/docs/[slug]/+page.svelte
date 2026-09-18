<script lang="ts">
	import { resolve } from '$app/paths';
	import { CallToAction, deviceBySlug, Seo, site } from '$lib/index';
	import { docTitle } from '$lib/docs';
	import DocsNav from '$lib/components/DocsNav.svelte';
	import { docSchema } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const doc = $derived(data.doc);
	const Content = $derived(doc.content);
	const relatedDevices = $derived(
		doc.devices.map(deviceBySlug).filter((device) => device !== undefined),
	);
</script>

<Seo
	title={docTitle(doc)}
	description={doc.summary}
	path="/docs/{doc.slug}"
	schema={docSchema(doc)}
/>

<div class="mx-auto max-w-6xl px-5 py-16 sm:py-24">
	<nav class="mb-8 text-sm" aria-label="Breadcrumb">
		<a
			class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
			href={resolve('/')}>{site.name}</a
		>
		<span class="mx-2 text-slate-400">/</span>
		<a
			class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
			href={resolve('/docs')}>Docs</a
		>
	</nav>

	<div class="gap-12 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
		<aside class="mb-12 lg:mb-0">
			<div class="lg:sticky lg:top-24">
				<DocsNav current={doc.slug} />
			</div>
		</aside>

		<div>
			<article
				class="prose prose-slate dark:prose-invert prose-a:text-blue-700 dark:prose-a:text-blue-400 prose-headings:text-blue-700 dark:prose-headings:text-blue-400 max-w-none [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-slate-200 dark:[&_tbody_tr:hover]:bg-slate-700"
			>
				<h1>{doc.title}</h1>
				<p class="not-prose text-lg leading-relaxed text-slate-600 dark:text-slate-300">
					{doc.summary}
				</p>
				<Content />
			</article>

			{#if relatedDevices.length > 0}
				<section class="mt-12 border-t border-slate-900/10 pt-8 dark:border-white/10">
					<h2
						class="text-sm font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400"
					>
						Applies to
					</h2>
					<ul class="mt-4 flex flex-wrap gap-3">
						{#each relatedDevices as device (device.slug)}
							<li>
								<a
									class="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:text-blue-400 dark:ring-white/10 dark:hover:ring-blue-400/30"
									href={resolve('/[device=device]', { device: device.slug })}
								>
									{device.full}
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<p class="mt-8 text-sm text-slate-500 dark:text-slate-400">
				Last updated {doc.updated}. Something wrong or missing?
				<a
					class="text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
					href="mailto:{site.email}">Tell me</a
				>.
			</p>
		</div>
	</div>
</div>

<CallToAction />
