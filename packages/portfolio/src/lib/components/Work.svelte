<script lang="ts">
	import type { Work } from '$lib/types';

	let {
		byline,
		category,
		jump_line,
		publisher,
		publisher_url,
		title,
		date,
		content: Content,
		slug,
	}: Work = $props();
</script>

<article
	id={slug}
	class="prose dark:prose-invert prose-slate prose-sm md:prose-lg lg:prose-xl mb-32"
>
	<h1 class="mb-4! -ml-px text-emerald-800 dark:text-cyan-400">{title}</h1>

	<address class="text-base text-slate-400">
		<strong class="text-slate-400 capitalize">{category}</strong>
		{byline}
		<a href={publisher_url} target="_blank" class="text-slate-400">{publisher}</a>
		&emsp;
		<time datetime={date}>
			{new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long' })}
		</time>
	</address>

	<Content />

	{#if publisher_url && jump_line}
		<a href={publisher_url} target="_blank" rel="noreferrer">{jump_line}…</a>
	{/if}
</article>
