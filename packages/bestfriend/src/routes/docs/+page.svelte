<script lang="ts">
	import { resolve } from '$app/paths';
	import { CallToAction, Seo, site } from '$lib/index';
	import { docsBySection } from '$lib/docs';

	const groups = docsBySection();

	const title = 'EP-133, EP-40 & EP-1320 guides — Best Friend documentation';
	const description =
		'How to connect, back up, edit, and bounce stems from a Teenage Engineering EP-133 K.O. II, EP-40 Riddim, or EP-1320 Medieval using Best Friend.';
</script>

<Seo {title} {description} path="/docs" />

<div class="mx-auto max-w-5xl px-5 py-16 sm:py-24">
	<nav class="mb-8 text-sm" aria-label="Breadcrumb">
		<a
			class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
			href={resolve('/')}>&larr; {site.name}</a
		>
	</nav>

	<h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">Guides</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
		Everything you can do with a Teenage Engineering EP-133 K.O. II, EP-40 Riddim, or EP-1320
		Medieval and {site.name} — written as tasks, so you can find the one you came for.
	</p>

	<div class="mt-12 space-y-12">
		{#each groups as group (group.section)}
			<section>
				<h2
					class="text-sm font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400"
				>
					{group.section}
				</h2>
				<ul class="mt-5 grid gap-4 sm:grid-cols-2">
					{#each group.items as doc (doc.slug)}
						<li>
							<a
								class="block h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:ring-white/10 dark:hover:ring-blue-400/30"
								href={resolve('/docs/[slug]', { slug: doc.slug })}
							>
								<span class="text-lg font-semibold text-blue-700 dark:text-blue-400"
									>{doc.title}</span
								>
								<span class="mt-2 block leading-relaxed text-slate-600 dark:text-slate-300"
									>{doc.summary}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>

<CallToAction />
