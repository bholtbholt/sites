<script lang="ts">
	import {
		CallToAction,
		Compatibility,
		Faq,
		faq,
		FeatureBand,
		FeatureGrid,
		Hero,
		homeSchema,
		PhoneFan,
		PhoneShot,
		Platforms,
		Reviews,
		Seo,
		seo,
		StickyBar,
		VideoFacade,
	} from '$lib/index';
	import bank from '$lib/assets/bank.png?enhanced';
	import bounce from '$lib/assets/bounce.png?enhanced';
	import library from '$lib/assets/library.png?enhanced';
	import midiController from '$lib/assets/midi-controller.png?enhanced';
	import samples from '$lib/assets/samples.png?enhanced';
	import scenes from '$lib/assets/scenes.png?enhanced';
	import stems from '$lib/assets/stems.png?enhanced';
	import edit from '$lib/assets/edit.png?enhanced';

	let { data } = $props();

	// StickyBar goes solid once this element scrolls out of view.
	let sentinel = $state<HTMLElement | null>(null);
</script>

<Seo title={seo.title} description={seo.description} schema={homeSchema(data.rating)} />

<StickyBar {sentinel} />

<div id="top"></div>

<Hero />

<div bind:this={sentinel} aria-hidden="true"></div>

<VideoFacade />

<!--
	Bands alternate tinted/plain the whole way down, and the tinted ones are also the
	mirrored ones, so the screenshot swaps sides every time.
-->
<FeatureBand eyebrow="Bounce audio tracks" title="Export the real thing." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={bounce}
			alt="A bounce being set up with all eight tracks selected and stereo mixdown, group mixdowns, and MIDI file toggled on"
		/>
	{/snippet}

	<p>
		Bounce multi-track audio stems of a Scene or your whole Song straight off the hardware. Every
		one of the 48 pads comes out isolated, built from the real samples and the real pad data — no AI
		separation involved, nothing guessed at.
	</p>
	<p>
		Take all 48 individually, group mixdowns, or a stereo mixdown, with the fader automation baked
		in. Export the MIDI while you're there, then open the whole thing in your DAW.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Scenes" title="See the whole arrangement.">
	{#snippet visual()}
		<PhoneShot
			src={scenes}
			alt="A Scene timeline showing sequenced notes across every bank, with the playhead partway through the bars"
		/>
	{/snippet}

	<p>
		Every sequenced note across every bank in a Scene or Song, laid out on one timeline, with the
		fader automation lanes underneath. The playhead follows along as it plays.
	</p>
	<p>Finally see what you actually programmed, instead of inferring it from a 3-char display.</p>
</FeatureBand>

<FeatureBand eyebrow="MIDI Controller" title="Play chords the pads can't." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={midiController}
			alt="The MIDI chord controller with a major 9th selected, the arpeggiator rate set, and a chord held on the keyboard"
		/>
	{/snippet}

	<p>
		Play your EP from a velocity-sensitive keyboard. Build a major, minor, suspended, or diminished
		triad with a button, then add a 6th, 7th, or 9th for flavour — or the lower octave for weight.
	</p>
	<p>
		Save your own chords onto any Chord or Extension button, split the keys into up to three zones
		for alternate positions, and run the arpeggiator — 4 modes, 6 rates, 3 octaves — locked to the
		hardware clock.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Pads" title="Every setting on one screen.">
	{#snippet visual()}
		<PhoneFan />
	{/snippet}

	<p>
		Trim, envelope, volume, pitch, pan, play mode, time-stretch, MIDI channel — visible and editable
		without diving through a menu. And of course, the waveform itself.
	</p>
	<p>Themes for the EP-133, EP-40, EP-1320, or the system in both light and dark mode.</p>
</FeatureBand>

<FeatureBand eyebrow="Performance Effects" title="See the whole bank at once." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={bank}
			alt="A pad group laid out as a grid of waveforms across banks A, B, C, and D"
		/>
	{/snippet}

	<p>
		Every pad in the group, waveform and name, laid out the way the hardware is. Move through A, B,
		C, and D without losing your place then drag and drop to reassign samples.
	</p>
	<p>
		And apply momentary performance effects like individual pad mutes, pitch changes, or reverse
		playback.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Edit" title="A real editor, before it hits a pad.">
	{#snippet visual()}
		<PhoneShot
			src={edit}
			alt="The sample editor showing a clavinet waveform with its envelope drawn over it and a three-band EQ curve below"
		/>
	{/snippet}

	<p>
		Reduce the file size with crop, repitch, stereo to mono flattening, and changing the sample
		rate. While you're there, normalize to get more volume out of the sample, and let Best Friend
		detect and set its key for you.
	</p>
	<p>
		Then stack studio-grade effects on top: three-band EQ, 1176-style compression, distortion and
		saturation, Octaver, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.
	</p>
	<p>
		On the EP-40 and EP-1320, layer several samples into one multi-sample — crop and loop each
		layer, preview it, then save the lot as a single waveform.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Stem-splitting" title="Pull a sample apart." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={stems}
			alt="A sample split into drums, bass, vocals, guitar, and instrument faders with bass muted"
		/>
	{/snippet}

	<p>
		Split any sample you bring in into isolated drums, bass, vocals, guitar, and instruments. Remix
		the levels or mute a track entirely, then send it to a pad.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Samples" title="Move samples by the handful.">
	{#snippet visual()}
		<PhoneShot
			src={samples}
			alt="A sample list with three samples selected and delete, share, and move actions showing"
		/>
	{/snippet}

	<p>
		Bulk upload from Files or straight out of a video. Then select what you want and move, share, or
		delete it in one pass — or edit a sample and replace it in place.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Library" title="Everything you've saved, in one place." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={library}
			alt="The Library listing dated project and system backups, with tabs for Bank Snapshots, Backups, and Bounces"
		/>
	{/snippet}

	<p>
		Bank Snapshots, Project and System backups, and your bounces, arranged together. Snapshot a bank
		you've built and recall it later — even on another EP. Preview a backup's audio before you
		restore it, or pull a single Project back out of a full System backup.
	</p>
	<p>
		On Apple devices iCloud keeps all of it in sync across your iPhone, iPad, and Mac,
		automatically, without you thinking about it.
	</p>
</FeatureBand>

<FeatureGrid />

<Reviews rating={data.rating} />

<Platforms />

<Compatibility />

<Faq items={faq} tinted />

<CallToAction />
