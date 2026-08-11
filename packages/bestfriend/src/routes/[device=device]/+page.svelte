<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		AppStoreBadge,
		CallToAction,
		Compatibility,
		deviceSchema,
		devices,
		deviceTitle,
		Faq,
		PhoneFrame,
		platforms,
		Seo,
		site,
		StickyBar,
	} from '$lib/index';
	import padEp133 from '$lib/assets/pad-ep133.png?enhanced';
	import padEp40 from '$lib/assets/pad-ep40.png?enhanced';
	import padEp1320 from '$lib/assets/pad-ep1320.png?enhanced';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Each device page shows its own themed screenshot — the same reason the pages
	// exist at all is that they should not look or read alike.
	const shots: Record<string, typeof padEp133> = {
		'ep-133': padEp133,
		'ep-40': padEp40,
		'ep-1320': padEp1320,
	};

	const device = $derived(data.device);
	const others = $derived(devices.filter((other) => other.slug !== device.slug));

	let sentinel = $state<HTMLElement | null>(null);
</script>

<Seo
	title={deviceTitle(device)}
	description={device.description}
	path="/{device.slug}"
	schema={deviceSchema(device)}
/>

<StickyBar {sentinel} />

<section class="px-5 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="mx-auto max-w-5xl">
		<nav class="mb-8 text-sm" aria-label="Breadcrumb">
			<a
				class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
				href={resolve('/')}>&larr; {site.name}</a
			>
		</nav>

		<div class="grid items-center gap-10 sm:gap-16 lg:grid-cols-2">
			<div>
				<p
					class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
				>
					Teenage Engineering {device.name}
				</p>
				<h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
					{site.name} for the {device.full}
				</h1>
				<p class="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
					{device.intro}
				</p>

				<div class="mt-8 flex flex-col items-start gap-3">
					<AppStoreBadge />
					<p class="text-sm text-slate-500 dark:text-slate-400">
						{platforms.join(' · ')} — one purchase
					</p>
				</div>
			</div>

			<div class="mx-auto max-w-[16rem] sm:max-w-xs">
				<PhoneFrame>
					<enhanced:img
						src={shots[device.slug]}
						alt="{site.name} showing the {device.full} pad settings in the {device.name} theme"
						sizes="(min-width: 640px) 320px, 64vw"
						class="block w-full"
					/>
				</PhoneFrame>
			</div>
		</div>
	</div>
</section>

<div bind:this={sentinel} aria-hidden="true"></div>

<section
	class="bg-gradient-to-b from-white to-slate-100 px-5 py-16 sm:py-24 dark:from-slate-800 dark:to-slate-900"
>
	<div class="mx-auto max-w-5xl">
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
			What {site.name} adds to the {device.name}
		</h2>

		<div class="mt-10 grid gap-8 sm:gap-10 lg:grid-cols-2">
			{#each device.highlights as highlight (highlight.title)}
				<div
					class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
				>
					<h3 class="text-lg font-semibold text-blue-700 dark:text-blue-400">{highlight.title}</h3>
					<p class="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{highlight.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<Faq items={device.faq} title="{device.full} questions" />

<section
	class="bg-gradient-to-b from-white to-slate-100 px-5 py-16 sm:py-24 dark:from-slate-800 dark:to-slate-900"
>
	<div class="mx-auto max-w-5xl">
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Other EP-Series gear</h2>
		<ul class="mt-8 grid gap-4 sm:grid-cols-2">
			{#each others as other (other.slug)}
				<li>
					<a
						class="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:ring-white/10 dark:hover:ring-blue-400/30"
						href={resolve('/[device=device]', { device: other.slug })}
					>
						<span class="text-lg font-semibold text-blue-700 dark:text-blue-400"
							>{site.name} for the {other.full} &rarr;</span
						>
						<span class="mt-2 block leading-relaxed text-slate-600 dark:text-slate-300"
							>{other.description}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<Compatibility />

<CallToAction />
