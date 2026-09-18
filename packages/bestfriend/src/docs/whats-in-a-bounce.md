---
title: What's inside a bounce
summary: The folder layout, the stem naming, the MIDI file, the sample sources, and what sums to what.
section: Backups & bouncing
order: 6
question: What files does Best Friend export when it bounces an EP-133 scene?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
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
P8_A94.midi
Notes.txt
```

- **One folder per bank** — `A/`, `B/` — holding that bank's stems.
- **Group mixdowns live inside their own bank's folder**, alongside the individual pads.
- The **stereo mixdown** — named after the bounce — and the **MIDI file** sit at the root.
- `Samples/` holds the source samples the render used.
- `Notes.txt` carries the notes you typed in the wizard, and a list of anything that was skipped.

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

`P8_A94.midi` — project and scene in the name — opens with **one named track per pad**, on the same
grid, at the same pitches.

## What gets skipped

**Supertone pads** are skipped: they are synthesised on the EP, so there is no audio to rebuild
from. They are named on the result screen and in `Notes.txt`.

If the EP is disconnected mid-render, the pads it could not read are reported as skipped rather
than the bounce hanging.

## Pad settings are read when you press Bounce

Not when you opened the wizard. Change a pad's Pitch, Pan, or Play Mode on the hardware while the
wizard is open and the render uses the **new** value.

## Related

- [Bounce multi-track stems into Ableton, Logic, or FL Studio](/docs/bounce-stems-to-your-daw)
- [Bounce a project from a backup, with no EP connected](/docs/bounce-from-a-backup)
- [See the fader automation you recorded](/docs/fader-automation-lanes)
