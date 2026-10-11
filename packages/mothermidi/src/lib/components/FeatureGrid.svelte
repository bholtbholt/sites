<script lang="ts">
	import { resolve } from '$app/paths';
	import { featureGroups } from '$lib/features';
</script>

<section class="border-ash-800 border-t px-4 py-20 sm:px-5 sm:py-28">
	<div class="mx-auto max-w-5xl">
		<p class="smallcaps text-ash-400">Features</p>
		<h2 class="mt-4 text-4xl tracking-tight text-balance sm:text-5xl">The complete canon.</h2>

		<div class="lg:divide-ash-800 mt-14 grid gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x">
			{#each featureGroups as group (group.title)}
				<div class="lg:px-8 lg:first:pl-0 lg:last:pr-0">
					<h3 class="smallcaps text-oxblood-400 text-xl">{group.title}</h3>
					<p class="text-ash-400 mt-1 italic">{group.blurb}</p>

					<ul class="text-ash-300 mt-6 space-y-3">
						{#each group.items as item (item)}
							<li class="border-ash-800 border-t pt-3 leading-snug">{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<p class="mt-14">
			<a class="link text-xl" href={resolve('/docs')}>Read the guides &rarr;</a>
		</p>
	</div>
</section>
