<script lang="ts">
	import { site } from '$lib/site';

	let { class: className = '' }: { class?: string } = $props();
</script>

<div class="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 {className}">
	<a
		class="inline-block transition hover:opacity-80"
		href={site.appStoreUrl}
		rel="external noopener noreferrer"
		target="_blank"
	>
		<!-- Apple ships a black badge; inverting it gives the sanctioned white variant on dark. -->
		<img
			src="/AppStore.svg"
			alt="Download {site.name} on the App Store"
			width="150"
			height="50"
			class="h-[50px] w-auto dark:invert"
		/>
	</a>

	<a
		class="inline-block transition hover:opacity-80"
		href={site.playStoreUrl}
		rel="external noopener noreferrer"
		target="_blank"
	>
		<!-- No dark:invert here, unlike the Apple badge: Google's badge is a colour mark on its
		     own black plate, and their brand guidelines forbid recolouring it. -->
		<img
			src="/PlayStore.svg"
			alt="Get {site.name} on Google Play"
			width="169"
			height="50"
			class="h-[50px] w-auto"
		/>
	</a>
</div>
