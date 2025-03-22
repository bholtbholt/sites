<script lang="ts">
	import '../app.css';
	import { Nav, site } from '$lib/index';
	let { children } = $props();
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Nav />

{@render children()}
