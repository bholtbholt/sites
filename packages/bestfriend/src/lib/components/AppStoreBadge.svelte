<script lang="ts">
	import { site } from '$lib/site';

	let { class: className = '' }: { class?: string } = $props();
</script>

<a
	class="inline-block transition hover:opacity-80 {className}"
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
