<script lang="ts">
	import { site } from '$lib/index';
	const tagline = 'The companion app for Teenage Engineering EP-Series samplers.';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={tagline} />
</svelte:head>

<div class="space-y-8 my-18">
	<h1
		class="text-5xl sm:text-9xl mb-3 sm:mb-8 font-bold tracking-tight text-orange-500 dark:text-orange-400"
	>
		{site.name}
	</h1>

	<p class="text-lg sm:text-3xl leading-relaxed text-stone-600 dark:text-stone-300">
		{tagline}
		<a
			class="block my-2"
			href="https://apps.apple.com/app/best-friend/id6782250723"
			rel="external noopener noreferrer"
			target="_blank"
		>
			<img src="/AppStore.svg" alt="Apple App Store logo" class="inline" />
		</a>
	</p>

	<p class="text-stone-600 dark:text-stone-300 mb-0">
		Follow the development Substack for releases, updates, and tips!
	</p>

	<iframe
		src="https://epbf.substack.com/embed?transparent=1"
		width="360"
		height="150"
		style="border: 0; background: transparent"
		frameborder="0"
		scrolling="no"
	></iframe>
</div>
