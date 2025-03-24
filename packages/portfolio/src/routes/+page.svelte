<script lang="ts">
	import type { PageProps } from './$types';
	import { siteIntro, Work } from '$lib/index';

	let { data }: PageProps = $props();
</script>

<div class="my-24 flex min-h-[50vh] items-center lg:min-h-[66vh]">
	<article id="intro" class="prose dark:prose-invert prose-slate md:prose-xl lg:prose-2xl">
		<h1 class="mb-0! text-emerald-800 dark:text-cyan-400">Brian Holt</h1>
		<p>{siteIntro}</p>
	</article>
</div>

{#each data.works as work (work.slug)}
	<Work {...work} />
{/each}
