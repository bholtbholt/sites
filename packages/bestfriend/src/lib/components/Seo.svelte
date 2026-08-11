<script lang="ts">
	import { site } from '$lib/site';
	import { ldJsonTag, seo } from '$lib/seo';

	let {
		title,
		description,
		path = '',
		schema,
	}: {
		title: string;
		description: string;
		/** Path portion of the canonical URL, e.g. '/ep-133'. Empty for the home page. */
		path?: string;
		schema?: unknown;
	} = $props();

	const canonical = $derived(`${site.domain}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Safari's Smart App Banner. Not SEO, but this is the one place every page shares. -->
	<meta name="apple-itunes-app" content="app-id={site.appId}" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={seo.imageAlt} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={seo.image} />
	<meta name="twitter:image:alt" content={seo.imageAlt} />

	{#if schema}
		<!-- Structured data. Not user input: the payload is built from our own data and
		     `<` is escaped during serialisation, so there is nothing to inject. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html ldJsonTag(schema)}
	{/if}
</svelte:head>
