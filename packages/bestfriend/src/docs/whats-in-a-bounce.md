---
title: What's inside a bounce
summary: The folder layout, the stem naming, the MIDI file, the sample sources, the takes, and what sums to what.
section: Backups & bouncing
order: 6
question: What files does Best Friend export when it bounces an EP-133 scene?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

A bounce is a single `.zip`. This is what you find when you open it, and what each part is for.

## The layout

```
A/
  A_Kick.wav
  A_Snare.wav
  A_MuteGroup.wav
B/
  B_Bass.wav
  …
Samples/
  …
<your bounce name>.wav
<your bounce name>.midi
Notes.txt
```

- **One folder per bank** — `A/`, `B/` — holding that bank's stems.
- **Group mixdowns live inside their own bank's folder**, alongside the individual pads.
- The **stereo mixdown** and the **MIDI file** — both named after the bounce — sit at the root.
- `Samples/` holds the source samples the render used.
- `Notes.txt` carries the notes you typed in the wizard, the MIDI track and note table, and a list
  of anything that was skipped.

## The audio

Every file is **48 kHz, 24-bit, stereo**.

- Every stem **starts at zero** and lines up, so you can drop the whole folder into your DAW at
  bar 1 and it fits.
- There is **no end padding**: a track that plays once keeps its own tail rather than being
  stretched to the length of the scene.
- Dropped in at unity, the stems **sum to the stereo mixdown**, post-fader.

## Tracks are stems, not pads

The track list in the wizard is not a list of every pad:

- **Silent pads are absent.** Nothing playing means nothing exported.
- A **mute group is one row, and one file** — labelled with its bank letter, like `BM`. The pads
  folded into it get no file of their own, and each hit is cut where the next one starts, matching
  what the hardware silences. No doubling.
- Unnamed, a group reads as `<first sample> mute group`. Tap the name to rename it inline, and the
  name you give it becomes the filename.

The MIDI file still carries the folded pads **separately**, so you have the individual parts even
where the audio is mixed.

## The MIDI file

The `.midi` is named after the bounce and opens on the same grid, at the same tempo and meter. Its
tracks are grouped by what the notes mean:

- **One track per group** for its percussion — `Group A`, `Group B` — on channel **10**. Every pad
  plays its own note: A 36–47, B 48–59, C 60–71, D 72–83.
- **One `Loops` track** for loop pads across every group, also on channel 10.
- **A track of its own per melodic pad**, named like `B7 <sample>`, at its recorded pitches, on
  channels from 1 upward, skipping 10. A pad armed to its own MIDI channel keeps that channel.

The `Notes.txt` MIDI section lists each track, its channel, and the pad-to-note table.

Imported back into Best Friend's [MIDI Patterns](/docs/import-midi-patterns), the group and `Loops`
tracks arrive as drums, one lane per pad, and the melodic tracks as keys.

## Renaming inside a bounce

Open the bounce in the Library and tap a file's name to rename it. The pad or group prefix stays:
`A8` stays `A8`, so a renamed pad becomes `A/A8_<name>.wav`. Tap the bounce's own name under the
waveform to rename the whole bounce.

## Real-time takes

Takes from [real-time capture](/docs/bounce-stems-to-your-daw) are prefixed with the type you gave
them — `MIX`, `A`–`D`, `FX`, or `SU` — so a DAW import reads `B_Drums`. A take recorded without MIDI
clock is filed under `Takes/Unsynced/`.

## What gets skipped

**Supertone pads**, punch-in effects, and the main FX are not in an offline bounce: they are
produced on the EP, so there is no audio to rebuild from. Skipped Supertone pads are named on the
result screen and in `Notes.txt`, and their notes are still in the MIDI file. Use real-time
capture to record them.

If the EP is disconnected mid-render, the pads it could not read are reported as skipped rather
than the bounce hanging.

## Pad settings are read when you press Bounce

Not when you opened the wizard. Change a pad's Pitch, Pan, or Play Mode on the hardware while the
wizard is open and the render uses the **new** value.

## Related

- [Bounce multi-track stems into Ableton, Logic, or FL Studio](/docs/bounce-stems-to-your-daw)
- [Bounce a project from a backup, with no EP connected](/docs/bounce-from-a-backup)
- [See the fader automation you recorded](/docs/fader-automation-lanes)
