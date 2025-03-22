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

<article id={slug} class="prose dark:prose-invert prose-slate md:prose-lg lg:prose-xl mb-32">
  <h1 class="mb-4! -ml-px text-emerald-800 dark:text-cyan-400">{title}</h1>

  <address class="text-base text-slate-400">
    <strong class="capitalize">{category}</strong>
    {byline}
    <a href={publisher_url} target="_blank">{publisher}</a>
    &emsp;
    <time datetime={date}>
      {new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long' })}
    </time>
  </address>

  <Content />

  <a href={publisher_url} target="_blank" rel="noreferrer">{jump_line}…</a>
</article>
