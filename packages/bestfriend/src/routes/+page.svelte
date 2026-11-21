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
		site,
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
</script>

<Seo title={seo.title} description={seo.description} schema={homeSchema(data.rating)} />

<Hero />

<VideoFacade />

<!--
	Bands alternate tinted/plain the whole way down, and the tinted ones are also the
	mirrored ones, so the screenshot swaps sides every time.
-->
<FeatureBand eyebrow="Bounce audio tracks" title="Export tracks for mixing." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={bounce}
			alt="A bounce being set up with all eight tracks selected and stereo mixdown, group mixdowns, and MIDI file toggled on"
		/>
	{/snippet}

	<p>
		Bounce multi-track audio stems of a Scene or your whole Song extracted from the hardware. All 48
		pads are isolated, rendered in Best Friend from the real samples and the real pad data — no AI
		separation involved.
	</p>
	<p>
		Or capture real time performances, Supertone tracks, or punch-in effects. Every take is
		MIDI-synced, so it lines up the moment it lands in a DAW.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Scenes and Patterns" title="See it. Edit it.">
	{#snippet visual()}
		<PhoneShot
			src={scenes}
			alt="The Scenes editor with a note selected on group A, fader automation curves drawn under group C, and the Notes, Fader, Pitch, Step, and Song tabs below"
		/>
	{/snippet}

	<p>
		See every sequence across every bank in your Scene along with its fader automation. Add, move,
		lengthen, and erase notes, nudge velocity and pitch, ratchet, and draw fader automation with the
		note editor, fader editor, piano roll, and step sequencer. When you're ready, build your song
		with the Song List editor.
	</p>
</FeatureBand>

<FeatureBand eyebrow="MIDI Controller" title="Rich chords at your fingertips." mirrored tinted>
	{#snippet visual()}
		<PhoneShot
			src={midiController}
			alt="The MIDI chord controller with a minor 7th held on MIDI channel 10, and the arpeggiator set to 16ths, Up, one octave"
		/>
	{/snippet}

	<p>
		Play from a velocity-sensitive keyboard. Build a triad with a button, then add an extension,
		with fully customizable slots.
	</p>
	<p>
		Want it for any synth, not just your EP? Get
		<a
			class="font-medium text-blue-700 underline underline-offset-4 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400"
			href={site.motherMidiUrl}
			rel="external noopener noreferrer"
			target="_blank">Mother MIDI</a
		>.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Pad Settings" title="Every setting on one screen.">
	{#snippet visual()}
		<PhoneFan />
	{/snippet}

	<p>
		Trim, envelope, volume, pitch, pan, play mode, time-stretch, MIDI channel — visible and editable
		without diving through a menu. And of course, the waveform itself.
	</p>
	<p>
		Change several pads at once, map a group to an electronic drum kit, and tune a pad by ear with
		the built-in tuner.
	</p>
	<p>Themes for the EP-133, EP-40, EP-1320, or the system in both light and dark mode.</p>
</FeatureBand>

<FeatureBand
	eyebrow="Group Editing and Performance Effects"
	title="Play the whole bank at once."
	mirrored
	tinted
>
	{#snippet visual()}
		<PhoneShot
			src={bank}
			alt="Group D of a 909 kit in performance mode, with the snare and closed hat pads muted"
		/>
	{/snippet}

	<p>
		Change pads across any group at once. Move and copy pads, edit settings in bulk, and apply
		customizable MIDI templates. Or chop samples across pads in lazy, equal, and transient modes.
	</p>
	<p>
		Apply momentary performance effects to individual pads while you play — mute, pitch up, pitch
		down, reverse.
	</p>
</FeatureBand>

<FeatureBand eyebrow="Edit samples" title="A real editor, before it hits a pad.">
	{#snippet visual()}
		<PhoneShot
			src={edit}
			alt="The sample editor showing a clavinet waveform with its envelope drawn over it and a three-band EQ curve below"
		/>
	{/snippet}

	<p>
		Reduce the file size with crop, repitch, stereo to mono flattening, and changing the sample
		rate. Then stack studio-grade effects on top: three-band EQ, 1176-style compression, distortion
		and saturation, Octaver, Small Stone phaser, Juno chorus, tremolo, delay, and reverb.
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
		Bulk upload from Files or videos, record audio, or sample the system audio from other audio
		apps. Then organize your sample slots, share, or delete them.
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
		Bank Snapshots, Project and System backups, your bounces, and MIDI patterns, arranged together.
		Snapshot a bank you've built and recall it later — even on another EP — or build one without the
		hardware connected.
	</p>
	<p>
		Open any backup and browse it, no EP needed: its projects, scenes, groups, patterns, and
		samples. Hear a scene before you restore, then take back only what you want — one group, a few
		samples, a pattern as MIDI — or pull a single Project out of a full System backup.
	</p>
</FeatureBand>

<FeatureGrid />

<Reviews rating={data.rating} />

<Platforms />

<Compatibility />

<Faq items={faq} tinted />

<CallToAction />
