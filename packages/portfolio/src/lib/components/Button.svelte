<script lang="ts">
  import type { Snippet } from 'svelte';
  import Spinner from './Spinner.svelte';
  type Props = {
    children: Snippet;
    disabled?: boolean;
  };
  let { children, disabled = false }: Props = $props();
  const colors = [
    ...[
      'bg-emerald-700',
      'shadow-emerald-700',
      'hover:bg-emerald-500',
      'focus:bg-emerald-500',
      'active:bg-emerald-800',
      'active:inset-shadow-emerald-950',
    ],
    ...[
      'dark:bg-cyan-500',
      'dark:shadow-cyan-500',
      'dark:hover:bg-cyan-400',
      'dark:focus:bg-cyan-400',
      'dark:active:bg-cyan-800',
      'dark:active:inset-shadow-cyan-950',
    ],
  ];
  const disabledStyle = [...colors, 'opacity-70'].filter(
    (c) => !c.includes('hover') && !c.includes('focus'),
  );
</script>

<button
  {disabled}
  class:cursor-pointer={!disabled}
  class="{disabled ? disabledStyle.join(' ') : colors.join(' ')}
    rounded-full px-8 pt-4 pb-3
    text-center whitespace-nowrap text-white
    shadow-[0_0.15em_0_0.01em_transparent]
    transition-colors duration-200 ease-out
    focus:shadow-transparent
    active:translate-y-0.5 active:transform
    active:inset-shadow-sm active:shadow-transparent"
  type="submit"
>
  {#if disabled}
    Sending…
    <Spinner class="-mr-2 mb-0.5 ml-2 inline-block text-inherit" size="1.3em" />
  {:else}
    {@render children()}
  {/if}
</button>
