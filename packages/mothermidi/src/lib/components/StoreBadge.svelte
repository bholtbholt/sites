<script lang="ts">
	import { site } from '$lib/site';
</script>

<a
	class="inline-block transition hover:opacity-80"
	href={site.appStoreUrl}
	rel="external noopener noreferrer"
	target="_blank"
>
	<!-- Apple ships a black badge; inverting it gives the sanctioned white variant on dark.
	     On the light paper the black original stands as is. -->
	<img
		src="/AppStore.svg"
		alt="Download {site.name} on the App Store"
		width="150"
		height="50"
		class="h-[50px] w-auto dark:invert"
	/>
</a>
