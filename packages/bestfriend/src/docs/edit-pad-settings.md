---
title: Edit trim, pitch, pan, and every other pad setting
summary: Every parameter for a pad on one screen, with the waveform above it, instead of buried behind hardware menus.
section: Pads
order: 2
question: How do I edit pad settings on my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

On the hardware, pad parameters live behind menus and read out through a three-character
display. Best Friend puts the whole set on one screen with the waveform above it, so you can
see what you are changing while you change it. Changes are written to the hardware as you make
them.

## Choose a pad

Pad Settings always shows the pad currently selected on the hardware. Select another pad on the EP
and the screen follows. On iPhone, tap the **Pads** tab again to switch to the
[pad grid](/docs/see-a-bank-of-pads).

## Trim and envelope

Switch the waveform between **Trim** and **Envelope**.

- In **Trim**, drag the handles to set where the pad starts and stops playing. Long-press inside to
  move the window.
- In **Envelope**, drag the markers to set attack and release.

Pinch to zoom and double-tap to reset. Both respond to the hardware <kbd>X</kbd> and <kbd>Y</kbd>
knobs.

Trimming here changes what the pad plays, not the sample itself. To crop the sample, tap **Edit** —
see [the sample editor](/docs/sample-editor-and-effects).

## Amp, Pitch, and Pan

- **Amp** sets the pad's volume, 0–200.
- **Pitch** tunes the pad up or down 12 semitones.
- **Pan** places the pad left or right, −16 to +16.

Double-tap a control to reset it.

## Play Mode

- **One shot** plays the trimmed sample once.
- **Key** plays while the pad is held.
- **Legato** plays while held. A new note continues the sample instead of restarting it.
- **Loop** toggles loop playback and mute. EP-40 only.

Changing the play mode resets the envelope's release to match, the same as changing it on the
hardware does.

## Time Mode

- **Off** plays the sample at its own speed.
- **BPM** stretches the sample to the project tempo.
- **Bar** stretches the sample to fit a number of bars.
- **Rev** plays the sample backwards.

## Tune a pad

Tap the **tuner** in Pad Settings to open a chromatic tuner. It listens to your
[audio input](/docs/app-settings) and shows the nearest note and how far off it is, so you can set
**Pitch** by ear without guessing.

## Mute group (choke group)

Pads with the mute group on cut each other off: playing one stops any other that is still sounding.
This is not the same as the Mute in [performance mode](/docs/performance-effects-and-mute).

## MIDI channel

Sets the channel the pad responds to, 1–16, or Off. Give a pad its own channel to play it from the
[chord keyboard](/docs/midi-keyboard-and-chords).

## It stays in step with the hardware

Trim and envelope changes are **written when you let go**, not continuously through the drag,
so dragging a handle across a long sample does not flood the device.

It works the other way too: change the active pad's start, end, attack, or release **on the EP**
with the pad screen open and the handles and envelope overlay move to match. There is nothing to
refresh.

## Save default pad settings

If you always want the same starting point for a sample, save it as the default and stop setting it
by hand every time. Set **Default Pad Settings** in the [sample editor](/docs/sample-editor-and-effects)
and upload, or hold <kbd>SHIFT</kbd> + <kbd>SOUND</kbd> on the hardware.

## Change several pads at once

Select mode on the pad grid applies a change to many pads together. See
[see every pad in a bank at once](/docs/see-a-bank-of-pads).

## Supertone pads on the EP-40

A Supertone pad shows its two synth values beside Amp and Pitch. They follow the hardware knobs but
cannot be changed from Best Friend, and Trim is unavailable, as it is on the hardware. See
[Supertone settings on the EP-40](/docs/supertone-pads-on-the-ep-40).

> **Warning:** changing a Supertone pad's settings in Best Friend while the Supertone is playing
> often crashes the EP. This appears to be a firmware bug. Let the note stop first; if the EP
> crashes, turn it off and on again.

## Related

- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Mute, pitch, and reverse individual pads while you play](/docs/performance-effects-and-mute)
- [Move a sample to a different pad by dragging it](/docs/reassign-pads)
