<script lang="ts">
	import '../app.css';
	import { Nav, siteIntro } from '$lib/index';
	let { children } = $props();
</script>

<svelte:head>
	<title>Portfolio | brianholt.ca</title>
	<meta name="description" content={siteIntro} />
</svelte:head>

<Nav />

{@render children()}
