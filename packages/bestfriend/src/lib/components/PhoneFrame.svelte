<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<!--
	Bezel only — no fake notch. The screenshots already include the real status bar,
	so drawing one would double it up.
	Radius is percentage-based so the frame scales with whatever width it's given.
-->
<div
	class="overflow-hidden rounded-[8%/3.7%] bg-slate-900 p-[1.5%] shadow-xl ring-1 shadow-slate-900/20 ring-slate-900/10 dark:shadow-slate-950/60 dark:ring-white/10 {className}"
>
	<div class="overflow-hidden rounded-[7%/3.2%]">
		{@render children()}
	</div>
</div>
