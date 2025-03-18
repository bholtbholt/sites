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

<article id={slug}>
  <h1>{title}</h1>

  <ul>
    <li>
      <strong>{category}</strong>
      published on
      <a href={publisher_url} target="_blank" rel="noreferrer">{publisher}</a>
      {date}
    </li>
  </ul>

  <Content />

  <a href={publisher_url} target="_blank" rel="noreferrer">{jump_line}…</a>
</article>
