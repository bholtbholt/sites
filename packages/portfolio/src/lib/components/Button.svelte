<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = {
    children: Snippet;
  };
  let { children }: Props = $props();
  const emerald = [
    'bg-emerald-700',
    'shadow-emerald-700',
    'hover:bg-emerald-500',
    'focus:bg-emerald-500',
    'active:bg-emerald-800',
    'active:inset-shadow-emerald-950',
  ].join(' ');
  const cyan = [
    'dark:bg-cyan-500',
    'dark:shadow-cyan-500',
    'dark:hover:bg-cyan-400',
    'dark:focus:bg-cyan-400',
    'dark:active:bg-cyan-800',
    'dark:active:inset-shadow-cyan-950',
  ].join(' ');
</script>

<button
  class="{emerald} {cyan}
    cursor-pointer rounded-full px-8 py-4
    text-center whitespace-nowrap text-white
    shadow-[0_0.15em_0_0.01em_transparent]
    transition-colors duration-200 ease-out
    focus:shadow-transparent
    active:translate-y-0.5 active:transform
    active:inset-shadow-sm active:shadow-transparent
  "
  type="submit"
>
  {@render children()}
</button>
