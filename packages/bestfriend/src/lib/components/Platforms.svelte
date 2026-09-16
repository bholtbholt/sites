<script lang="ts">
	import { platforms } from '$lib/site';
</script>

<section
	class="bg-gradient-to-b from-white to-slate-100 px-5 py-16 sm:py-24 dark:from-slate-800 dark:to-slate-900"
>
	<div class="mx-auto max-w-5xl text-center">
		<p
			class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
		>
			Universal
		</p>
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
			One app for every device you own.
		</h2>
		<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
			Buy it once and run it on every device you own — iPhone, iPad, and Mac, or your Android phones
			and tablets. On Apple devices iCloud keeps your Library in sync across all of them.
		</p>

		<ul class="mt-8 flex flex-wrap justify-center gap-3">
			{#each platforms as platform (platform)}
				<li
					class="rounded-full bg-white px-5 py-2 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10"
				>
					{platform}
				</li>
			{/each}
		</ul>

		<p class="mt-6 text-slate-500 dark:text-slate-400">
			Separate purchases are required for Apple and Android devices.
		</p>
	</div>
</section>
