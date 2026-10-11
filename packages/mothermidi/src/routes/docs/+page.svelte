<script lang="ts">
	import { resolve } from '$app/paths';
	import { CallToAction, docsBySection, Seo, site } from '$lib/index';

	const groups = docsBySection();

	const title = `Guides — ${site.name}`;
	const description = `How to play chords, inversions and arpeggios with ${site.name}, and how to connect it to Logic Pro, Ableton Live, FL Studio and GarageBand.`;
</script>

<Seo {title} {description} path="/docs" />

<div class="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-5 sm:pt-40 sm:pb-28">
	<p class="smallcaps text-ash-400">Guides</p>
	<h1 class="mt-4 text-5xl tracking-tight sm:text-6xl">Scriptures</h1>
	<div class="mt-16 space-y-14">
		{#each groups as group (group.section)}
			<section>
				<h2 class="smallcaps text-oxblood-400">{group.section}</h2>
				<ul class="divide-ash-800 border-ash-800 mt-4 divide-y border-y">
					{#each group.items as doc (doc.slug)}
						<li>
							<a
								class="group block py-6 transition"
								href={resolve('/docs/[slug]', { slug: doc.slug })}
							>
								<span
									class="group-hover:decoration-oxblood-500 text-2xl underline decoration-transparent underline-offset-4 transition"
									>{doc.title}</span
								>
								<span class="text-ash-400 mt-1 block text-lg leading-relaxed">{doc.summary}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>

<CallToAction />
