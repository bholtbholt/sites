<script lang="ts">
	import AppStoreBadge from './AppStoreBadge.svelte';
	import { site } from '$lib/site';
</script>

<section
	class="bg-gradient-to-b from-white to-slate-100 px-5 py-16 sm:py-24 dark:from-slate-800 dark:to-slate-900"
>
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
			Your EP needs a Best Friend.<br/>Download now.
		</h2>
		<div class="mt-8 flex flex-col items-center gap-4">
			<AppStoreBadge />
		</div>
	</div>
</section>
