<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';
  type Props = {
    children: Snippet;
    title: string;
    type: 'success' | 'error';
  };
  let { children, type, title }: Props = $props();
  const successColors = 'bg-emerald-500/85 dark:bg-emerald-600/90 text-emerald-950';
  const errorColors = 'bg-red-500/85 dark:bg-red-600/80 text-red-950';
</script>

<div
  transition:fly={{ x: 100, duration: 600 }}
  class="{type === 'error' ? errorColors : successColors}
    fixed top-0 right-0
    m-6 w-96 rounded-md px-6 py-4 shadow-lg backdrop-blur-sm dark:text-white"
>
  <h3 class="mb-2 text-lg font-bold">{title}</h3>
  {@render children()}
</div>
