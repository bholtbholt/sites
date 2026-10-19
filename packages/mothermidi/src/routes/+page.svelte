<script lang="ts">
	import {
		CallToAction,
		Faq,
		faq,
		FeatureBand,
		FeatureGrid,
		Hero,
		homeSchema,
		PhoneShot,
		Seo,
		seo,
		site,
		TabletShot,
	} from '$lib/index';
	import { resolve } from '$app/paths';
	import arp from '$lib/assets/arp-iphone.png?enhanced';
	import chord from '$lib/assets/chord-iphone.png?enhanced';
	import extensions from '$lib/assets/extensions-iphone.png?enhanced';
	import latch from '$lib/assets/latch-ipad.png?enhanced';
	import zones from '$lib/assets/zones-ipad.png?enhanced';
</script>

<Seo title={seo.title} description={seo.description} schema={homeSchema()} />

<Hero />

<FeatureBand numeral={1} eyebrow="Chord Generator" title="Sacred harmonies.">
	{#snippet visual()}
		<PhoneShot
			src={chord}
			alt="The iPhone layout with Maj held and a C major triad lit across the keyboard"
		/>
	{/snippet}
	<p>
		Touch the root key, a chord button, and extension to build rich chords. Double-tap to latch.
	</p>
	<p>And each of the four chord and four extension slots are fully customizable.</p>
</FeatureBand>

<FeatureBand numeral={2} eyebrow="Arpeggiator" title="A litany of notes." mirrored>
	{#snippet visual()}
		<PhoneShot
			src={arp}
			alt="The arpeggiator settings on iPhone: turned on, 16th-note rate, down pattern, one octave"
		/>
	{/snippet}
	<p>
		Six rates, four patterns, and one to three octaves, with Root +12 and double notes. Synced to
		your hardware or software MIDI clock, or to its own tempo.
	</p>
</FeatureBand>

<FeatureBand numeral={3} eyebrow="Expression" title="A touch of the divine.">
	{#snippet visual()}
		<PhoneShot
			src={extensions}
			alt="A suspended chord with a 9th extension held, notes spread across the keyboard zones"
		/>
	{/snippet}
	<p>
		Velocity sensitive from bottom to top, set with a customized range. Drag up on a held key to
		raise modulation, down to lower it. And a pitch wheel for bends.
	</p>
</FeatureBand>

<FeatureBand numeral={4} eyebrow="Inversions" title="Three voices in one." mirrored bleed>
	{#snippet visual()}
		<TabletShot
			class="w-full"
			sizes="(min-width: 1280px) 900px, (min-width: 1024px) 780px, 125vw"
			src={zones}
			alt="Settings on iPad with root position, first inversion, and second inversion zones turned on, over a keyboard split by dashed lines"
		/>
	{/snippet}
	<p>
		Each key holds up to three zones: root position, first inversion, and second inversion. Where
		you touch the key decides which voicing sounds.
	</p>
</FeatureBand>

<FeatureBand numeral={5} eyebrow="Destinations" title="Submit to her will." bleed>
	{#snippet visual()}
		<TabletShot
			class="w-full"
			sizes="(min-width: 1280px) 900px, (min-width: 1024px) 780px, 125vw"
			src={latch}
			alt="{site.name} on iPad sending on channel 10, with Maj latched and its notes lit across the keyboard"
		/>
	{/snippet}
	<p>
		Send MIDI to any of your connected hardware or software instruments. To reach a DAW on a Mac,
		connect a cable and enable the device in Audio MIDI Setup. <a
			class="link"
			href={resolve('/docs/[slug]', { slug: 'connecting-to-a-mac' })}>The setup guide</a
		> has the rest.
	</p>
</FeatureBand>

<section class="border-ash-800 border-t px-4 py-20 sm:px-5 sm:py-28">
	<div class="mx-auto max-w-2xl text-center">
		<p class="smallcaps text-ash-400">Lineage</p>
		<h2 class="mt-4 text-4xl tracking-tight text-balance sm:text-5xl">Born of Best Friend.</h2>
		<p class="text-ash-300 mt-6 text-xl leading-relaxed">
			{site.name} began as the Chord Generator inside
			<a class="link" href={site.bestFriendUrl} rel="external noopener noreferrer" target="_blank"
				>{site.bestFriendName}</a
			>, the unrivalled companion app for Teenage Engineering EP-Series samplers. Now she answers to
			any hardware or software instrument that speaks MIDI.
		</p>
	</div>
</section>

<FeatureGrid />

<Faq items={faq} />

<CallToAction />
