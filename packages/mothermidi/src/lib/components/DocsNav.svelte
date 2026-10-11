<script lang="ts">
	import { resolve } from '$app/paths';
	import { docsBySection } from '$lib/docs';

	let { current = '' }: { current?: string } = $props();

	const groups = docsBySection();
</script>

<nav aria-label="Guides">
	{#each groups as group (group.section)}
		<p class="smallcaps text-ash-400 mt-8 mb-3 first:mt-0">{group.section}</p>
		<ul class="border-ash-800 space-y-2 border-l">
			{#each group.items as doc (doc.slug)}
				<li>
					<a
						aria-current={doc.slug === current ? 'page' : undefined}
						class="hover:text-bone -ml-px block border-l py-0.5 pl-4 leading-snug transition {doc.slug ===
						current
							? 'border-oxblood-500 text-bone'
							: 'text-ash-400 border-transparent'}"
						href={resolve('/docs/[slug]', { slug: doc.slug })}
					>
						{doc.title}
					</a>
				</li>
			{/each}
		</ul>
	{/each}
</nav>
