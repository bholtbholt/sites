---
title: Crop, normalize, repitch, and add effects to a sample
summary: A real sample editor with studio-grade effects, so samples are finished before they ever reach a pad.
section: Samples
order: 2
question: Can I edit samples for my EP-133 on my phone?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Best Friend includes a full sample editor, tailored to the hardware's limits. You can fix a sample
properly before it lands on a pad instead of working around it afterwards. Every imported sample is
editable before it uploads.

**All edits are destructive** — they permanently alter your sample. To keep the original,
duplicate it to an empty slot first, as below.

## Open the editor

- Tap a sample on the **Samples** tab.
- Tap **Edit** in [Pad Settings](/docs/edit-pad-settings).
- Import a file — see [record or import a sample](/docs/record-or-import-a-sample).

## Crop and envelope

Switch the waveform between **Crop** and **Envelope**.

- In **Crop**, drag the handles to set where the sample starts and ends. Audio outside the window
  is discarded. Long-press inside to move the window.
- In **Envelope**, drag the markers to set the default attack and release. A pad can override them
  in [Pad Settings](/docs/edit-pad-settings).

Pinch to zoom and double-tap to reset.

## Processing

These rewrite the sample itself:

- **Strip** crops silence by moving the crop handles in to the first and last sound. You can still
  adjust the handles afterwards.
- **Normalize** raises the volume to its maximum non-peaking value.
- **Reverse** plays the sample backwards.
- **Repitch** halves the file size by resampling an octave up, then playing an octave down. Some
  high-frequency detail is lost, for a lo-fi character.
- **Channels** cycles through Stereo, Mono, Left, and Right. Mono, Left, and Right halve the file
  size.
- **Sample rate** maps to Teenage Engineering's recording rates: **Hi** 46,875 Hz (default),
  **Mid** 32,000 Hz, and **Lo** 26,250 Hz. Lower rates use less memory.

A sample can be up to **20 seconds in stereo or 40 seconds in mono**. Repitch doubles that to 40
seconds in stereo or 80 in mono. See [fit more samples on your EP](/docs/fit-more-samples-on-your-ep).

Best Friend also [detects the key and root note](/docs/detect-key-and-root-note) of a sample.

## Preview

Tap **Preview** at the bottom of the editor to hear your edits, and loop it with the Repeat button.
Previews play through the EP, so they are silent without
[USB Input Monitoring](/docs/midi-clock-and-system-codes) (code 511) turned on.

## Effects

Pick **EQ**, **Comp**, **Grit**, **Mod**, or **Space** to show its controls. Effects are baked into
the sample on upload. Double-tap a control to reset it.

- Three-band **EQ**
- **Compression**
- **Grit**: six types of saturation and distortion
- **Octaver**
- **Small Stone-style Phaser**
- **Juno-style Chorus**
- **Tremolo**
- **Delay**
- **Reverb**

Every control is listed in the [effects reference](/docs/sample-effects-reference).

## Split a sample into stems

Any sample can be split into isolated **drums, bass, vocals, guitar, and instruments**, then
remixed or muted before it reaches a pad. See
[Split a song into stems](/docs/split-a-song-into-stems).

## Name, slot, and default pad settings

Names can be up to **16 characters**.

**Default Pad Settings** load onto a pad when the sample is assigned to it. If your sample is
melodic, set the **Root** note so KEYS mode matches the song. The root is detected automatically on
new samples and can be changed at any time.

## Upload, replace, or duplicate

Once you have finished your edits, upload the sample.

- **Replace in place**: upload a sample that is already on the hardware with **Replace**, and it
  goes back on the pad it came from. The arrangement around it is untouched.
- **Duplicate**: change the slot number to one that is empty and upload. The edit lands on the new
  slot and the original is left as it was.

## Multi-samples

A multi-sample opens the **Multi-sample Editor** for its notes. Changes apply when you upload, and
Split Stems is not available. See [build a multi-sample](/docs/build-multi-samples).

## Related

- [Every effect in the sample editor](/docs/sample-effects-reference)
- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Record or import a sample](/docs/record-or-import-a-sample)
