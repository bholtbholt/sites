<script lang="ts">
	import { resolve } from '$app/paths';
	import {
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
		StoreBadges,
	} from '$lib/index';
	import padEp133 from '$lib/assets/pad-ep133.png?enhanced';
	import padEp40 from '$lib/assets/pad-ep40.png?enhanced';
	import padEp1320 from '$lib/assets/pad-ep1320.png?enhanced';
	import ep133Scenes from '$lib/assets/ep133-scenes.png?enhanced';
	import ep133Samples from '$lib/assets/ep133-samples.png?enhanced';
	import ep133Library from '$lib/assets/ep133-library.png?enhanced';
	import ep133Chords from '$lib/assets/ep133-chords.png?enhanced';
	import ep40Scenes from '$lib/assets/ep40-scenes.png?enhanced';
	import ep40Samples from '$lib/assets/ep40-samples.png?enhanced';
	import ep40Library from '$lib/assets/ep40-library.png?enhanced';
	import ep40Chords from '$lib/assets/ep40-chords.png?enhanced';
	import ep1320Scenes from '$lib/assets/ep1320-scenes.png?enhanced';
	import ep1320Samples from '$lib/assets/ep1320-samples.png?enhanced';
	import ep1320Library from '$lib/assets/ep1320-library.png?enhanced';
	import ep1320Chords from '$lib/assets/ep1320-chords.png?enhanced';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Each device page shows its own themed screenshots — the same reason the pages
	// exist at all is that they should not look or read alike.
	const shots: Record<string, typeof padEp133> = {
		'ep-133': padEp133,
		'ep-40': padEp40,
		'ep-1320': padEp1320,
	};

	// The four screens worth showing off, in each device's own theme. Labels are shared
	// because the screens are the same app — only the palette changes.
	const galleries: Record<string, (typeof padEp133)[]> = {
		'ep-133': [ep133Scenes, ep133Samples, ep133Library, ep133Chords],
		'ep-40': [ep40Scenes, ep40Samples, ep40Library, ep40Chords],
		'ep-1320': [ep1320Scenes, ep1320Samples, ep1320Library, ep1320Chords],
	};

	const galleryLabels = ['Scenes', 'Samples', 'Library', 'Chords'];

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
					<StoreBadges class="items-start" />
					<p class="text-sm text-slate-500 dark:text-slate-400">
						{platforms.join(' · ')}
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

<section class="px-5 py-16 sm:py-24">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
			Themed for the {device.name}
		</h2>
		<p class="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
			Every screen picks up the {device.full} palette, in light and dark mode.
		</p>

		<ul class="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
			{#each galleries[device.slug] as shot, i (galleryLabels[i])}
				<li>
					<PhoneFrame>
						<enhanced:img
							src={shot}
							alt="{galleryLabels[i]} in {site.name} in the {device.name} theme"
							sizes="(min-width: 1024px) 220px, 42vw"
							loading="lazy"
							class="block w-full"
						/>
					</PhoneFrame>
					<p class="mt-3 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
						{galleryLabels[i]}
					</p>
				</li>
			{/each}
		</ul>
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
