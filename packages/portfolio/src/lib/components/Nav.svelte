<script lang="ts">
  import { headroom } from './headroomAction';
  import { page } from '$app/state';
  const links = [
    ['/', 'Work'],
    ['/now', 'Now'],
    ['/contact', 'Contact'],
  ];
  const active = 'text-slate-800 dark:text-slate-300 font-bold';
  const inactive =
    'text-slate-400 hover:text-emerald-700 focus:text-emerald-700 dark:hover:text-cyan-500 dark:focus:text-cyan-500';
</script>

<nav
  use:headroom
  id="navigation"
  class="
    headroom fixed top-0 right-0 left-0
    -ml-6 flex bg-white/60 px-12 font-sans text-xl
    shadow-[0_-0.6rem_0.2rem_0.8rem_transparent] shadow-white
    backdrop-blur-sm md:px-24 lg:px-36 xl:px-64
    dark:bg-slate-900/60 dark:shadow-slate-900"
>
  {#each links as [href, text]}
    <a
      {href}
      class="{page.url.pathname === href ? active : inactive}
        inline-block px-6 py-4
        transition-colors duration-200 ease-out"
    >
      {text}
    </a>
  {/each}
</nav>
