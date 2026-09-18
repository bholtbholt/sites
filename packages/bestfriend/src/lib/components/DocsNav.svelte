<script lang="ts">
	import { resolve } from '$app/paths';
	import { docsBySection } from '$lib/docs';

	let { current = '' }: { current?: string } = $props();

	const groups = docsBySection();
</script>

<nav aria-label="Documentation" class="text-sm">
	{#each groups as group (group.section)}
		<p
			class="mt-6 mb-2 font-semibold tracking-widest text-slate-500 uppercase first:mt-0 dark:text-slate-400"
		>
			{group.section}
		</p>
		<ul class="space-y-1.5">
			{#each group.items as doc (doc.slug)}
				<li>
					<a
						aria-current={doc.slug === current ? 'page' : undefined}
						class="block leading-snug transition hover:text-orange-500 dark:hover:text-orange-400 {doc.slug ===
						current
							? 'font-semibold text-blue-700 dark:text-blue-400'
							: 'text-slate-600 dark:text-slate-300'}"
						href={resolve('/docs/[slug]', { slug: doc.slug })}
					>
						{doc.title}
					</a>
				</li>
			{/each}
		</ul>
	{/each}
</nav>
