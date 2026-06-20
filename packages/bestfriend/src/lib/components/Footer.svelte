<script lang="ts">
	import { resolve } from '$app/paths';
	import { navLinks, site } from '$lib/site';
</script>

<footer class="mt-auto border-t border-stone-200/80 pt-8 dark:border-stone-700/60">
	<nav class="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
		{#each navLinks as link (link.href)}
			<a
				class="text-teal-700 transition hover:text-orange-500 dark:text-teal-400 dark:hover:text-orange-400"
				href={resolve(link.href)}>{link.label}</a
			>
		{/each}
	</nav>
	<p class="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
		{site.disclaimer}
	</p>
</footer>
