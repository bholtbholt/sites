<script lang="ts">
	import {
		CallToAction,
		Compatibility,
		FeatureBand,
		FeatureGrid,
		Hero,
		PhoneFan,
		PhoneFrame,
		Platforms,
		site,
		StickyBar,
		VideoFacade,
	} from '$lib/index';
	import bank from '$lib/assets/bank.png?enhanced';
	import backups from '$lib/assets/backups.png?enhanced';
	import library from '$lib/assets/library.png?enhanced';
	import multiSamples from '$lib/assets/multi-samples.png?enhanced';
	import stems from '$lib/assets/stems.png?enhanced';
	import edit from '$lib/assets/edit.png?enhanced';

	const tagline = 'The companion app for Teenage Engineering EP-Series samplers.';

	// StickyBar goes solid once this element scrolls out of view.
	let sentinel = $state<HTMLElement | null>(null);
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={tagline} />
	<link rel="canonical" href={site.domain} />
</svelte:head>

<StickyBar {sentinel} />

<div id="top"></div>

<Hero />

<div bind:this={sentinel} aria-hidden="true"></div>

<VideoFacade />

<FeatureBand eyebrow="Pads" title="Every setting on one screen.">
	{#snippet visual()}
		<PhoneFan />
	{/snippet}

	<p>
		Trim, envelope, volume, pitch, pan, play mode, time-stretch, MIDI channel — visible and editable
		without diving through a menu. And of course, the waveform itself.
	</p>
	<p>
		Themes for the EP-133, EP-40, EP-1320, or the system in both light and dark mode.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Sample Library" title="Move samples by the handful." mirrored tinted>
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={library}
					alt="A sample list with several samples selected and move, share, and delete actions"
					sizes="(min-width: 640px) 320px, 64vw"
					loading="lazy"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Bulk upload from Files or straight out of a video. Then select what you want and move, share, or
		delete it in one pass — or edit a sample and replace it in place.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Edit" title="A real editor, before it hits a pad." tinted>
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={edit}
					alt="The sample editor with crop, normalize, reverse, and repitch above tube, tape, and analog saturation"
					sizes="(min-width: 640px) 320px, 64vw"
					loading="lazy"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Reduce the file size with crop, repitch, stereo to mono flattening, and changing the sample rate. While you're there, normalize to get more volume out of the sample.
	</p>
	<p>
		Then stack studio-grade effects on top: three-band EQ, 1176-style compression, distortion and
		saturation, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Stems" title="Pull a sample apart." mirrored>
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={stems}
					alt="Splitting a sample into drums, bass, vocals, guitar, and instrument stems"
					sizes="(min-width: 640px) 320px, 64vw"
					loading="lazy"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Split any sample into isolated drums, bass, vocals, guitar, and instruments. Remix the levels or mute a
		track entirely.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Performance Effects" title="See the whole bank at once." tinted>
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={bank}
					alt="A pad group laid out as a grid of waveforms across banks A, B, C, and D"
					sizes="(min-width: 640px) 320px, 64vw"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Every pad in the group, waveform and name, laid out the way the hardware is. Move through A, B,
		C, and D without losing your place.
	</p>
	<p>And apply togglable performance effects like individual pad mutes, pitch changes, or reverse playback.</p>
</FeatureBand>

<FeatureBand eyebrow="Multi-samples" title="Each note, as it should sound." mirrored tinted>
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={multiSamples}
					alt="Building a multi-sample from several guitar recordings, each with its own crop and loop"
					sizes="(min-width: 640px) 320px, 64vw"
					loading="lazy"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Build and edit multi-samples on your EP-40 or EP-1320. Set the length, crop and
		loop of each layer, preview it, then save it as a single waveform.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Bank Snapshots" title="Build and recall your own kits.">
	{#snippet visual()}
		<div class="mx-auto max-w-[16rem] sm:max-w-xs">
			<PhoneFrame>
				<enhanced:img
					src={backups}
					alt="Bank snapshots, project backups, and system backups listed with load and restore actions"
					sizes="(min-width: 640px) 320px, 64vw"
					loading="lazy"
					class="block w-full"
				/>
			</PhoneFrame>
		</div>
	{/snippet}

	<p>
		Arrange a bank on your hardware, then take a Bank Snapshot to instantly recall later - even across devices. Backup your project and system directly from Best Friend.
	</p>
</FeatureBand>

<FeatureGrid />

<Platforms />

<Compatibility />

<CallToAction />
