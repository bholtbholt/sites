<script lang="ts">
	import { featureGroups } from '$lib/features';
</script>

<section class="px-5 py-16 sm:py-24">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Everything it does</h2>

		<div class="mt-10 grid gap-8 sm:gap-10 lg:grid-cols-3">
			{#each featureGroups as group (group.title)}
				<div
					class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
				>
					<h3 class="text-lg font-semibold text-blue-700 dark:text-blue-400">{group.title}</h3>
					<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{group.blurb}</p>

					<ul class="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
						{#each group.items as item (item)}
							<li class="flex gap-2">
								<svg
									class="mt-1.5 h-2 w-2 shrink-0 fill-orange-500"
									viewBox="0 0 8 8"
									aria-hidden="true"
								>
									<circle cx="4" cy="4" r="4" />
								</svg>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>
