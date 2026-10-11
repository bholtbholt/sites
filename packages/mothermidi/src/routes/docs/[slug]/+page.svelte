<script lang="ts">
	import { resolve } from '$app/paths';
	import { CallToAction, docs, docSchema, DocsNav, docTitle, Seo, site } from '$lib/index';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const doc = $derived(data.doc);
	const Content = $derived(doc.content);

	const position = $derived(docs.findIndex((item) => item.slug === doc.slug));
	const previous = $derived(docs[position - 1]);
	const next = $derived(docs[position + 1]);
</script>

<Seo
	title={docTitle(doc)}
	description={doc.summary}
	path="/docs/{doc.slug}"
	schema={docSchema(doc)}
/>

<div class="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-5 sm:pt-36 sm:pb-28">
	<nav class="smallcaps text-ash-400 mb-10" aria-label="Breadcrumb">
		<a class="hover:text-bone transition" href={resolve('/')}>{site.name}</a>
		<span class="text-oxblood-500 mx-2">/</span>
		<a class="hover:text-bone transition" href={resolve('/docs')}>Guides</a>
	</nav>

	<div class="flex flex-col gap-16 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
		<!-- Last on mobile: the list is long enough to bury the article. -->
		<aside class="order-last lg:order-none">
			<div class="lg:sticky lg:top-28">
				<DocsNav current={doc.slug} />
			</div>
		</aside>

		<div class="min-w-0">
			<article>
				<p class="smallcaps text-ash-400">{doc.section}</p>
				<h1 class="mt-4 text-5xl tracking-tight sm:text-6xl">{doc.title}</h1>

				<div class="prose prose-lg prose-mm mt-10 max-w-none">
					<Content />
				</div>
			</article>

			<nav class="mt-16 grid gap-6 sm:grid-cols-2" aria-label="More guides">
				{#if previous}
					<a class="group block" href={resolve('/docs/[slug]', { slug: previous.slug })}>
						<span class="smallcaps text-ash-400 block">Previous</span>
						<span
							class="group-hover:decoration-oxblood-500 mt-1 block text-xl underline decoration-transparent underline-offset-4 transition"
							>{previous.title}</span
						>
					</a>
				{/if}
				{#if next}
					<a
						class="group block sm:col-start-2 sm:text-right"
						href={resolve('/docs/[slug]', { slug: next.slug })}
					>
						<span class="smallcaps text-ash-400 block">Next</span>
						<span
							class="group-hover:decoration-oxblood-500 mt-1 block text-xl underline decoration-transparent underline-offset-4 transition"
							>{next.title}</span
						>
					</a>
				{/if}
			</nav>

			<p class="border-ash-800 text-ash-400 mt-16 border-t pt-6 text-base">
				Something wrong or missing?
				<a class="link" href="mailto:{site.email}">Tell me</a>.
			</p>
		</div>
	</div>
</div>

<CallToAction />
