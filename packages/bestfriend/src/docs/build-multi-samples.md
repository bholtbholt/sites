---
title: Build a multi-sample on the EP-1320 and EP-40
summary: Map up to eight pitches onto one pad, with a sustaining loop per note, then come back and edit a single note without rebuilding the rest.
section: Samples
order: 6
question: How do I build a multi-sample on the EP-1320?
devices: [ep-40, ep-1320]
updated: 2026-11-21
---

A multi-sample combines several pitches into a single waveform on one pad, so playing it in KEYS
keeps the character of each note instead of stretching one recording across the keyboard. Best
Friend builds and edits them on the **EP-1320 Medieval** and the **EP-40 Riddim**.

A multi-sample holds up to **8 notes**, each with its own root note and an optional loop that
sustains for as long as you hold the key.

**Tip**: convert a single-pitch sample into a multi-sample, set its loop point, and it sustains
indefinitely.

## Create one

### Combine files

1. On **Pads** or **Samples**, tap **+** in the toolbar.
2. Tap **Choose file…** or **Choose from Photos…**.
3. Turn on **Convert to multi-sample**.

All the files are combined into a single file that you edit in the following steps.

### Record it

1. On **Pads** or **Samples**, tap **+** in the toolbar.
2. Tap **Record audio…**.
3. Turn on **Convert to multi-sample**.

Record up to 8 notes in one take, pausing between them if you need to. Trimming and editing come
next.

### Convert a sample already on the EP

1. On **Samples**, long-press the sample.
2. Choose **Convert to multi-sample**.

## The Multi-sample Editor

The editor sets where each note begins and ends, its loop, and its root. Best Friend detects pitch
and transient changes and places the notes for you — see
[find a sample's key and root note](/docs/detect-key-and-root-note).

### Place notes

In the **All** tab:

- Tap below the waveform to add a note, up to 8.
- Drag a note's handle left or right to move where it starts.
- Drag a note's handle down to remove it.
- Use the stepper on the right to add or remove notes. **+** adds a note at the next pitch or
  transient change Best Friend detects; **−** removes the note with the weakest change.

### Edit a note

Tap the note's tab. The stepper beside **Root** sets its root note.

The buttons between the dividers act on this note only:

- **Strip** crops away silence at the start and end.
- **Normalize** matches this note's loudness to the middle of the set, so notes play evenly across
  the keys. Its caption shows the change, like `+3.2 dB`. A quiet note is raised only as far as it
  can go without clipping.
- **Reverse** plays the note backwards.
- **Loop** finds a clean sustain loop. Tap again to try the next one: long loops through the body
  of the note, short loops near the tail, or early loops just after the attack for sounds that
  fade. The dots under Loop show how many it found and which one is playing. Tap past the last dot
  to turn the loop off.
- **Detect** finds the root note again from the cropped audio, replacing a value you set by hand.

### Crop a note

1. Tap the note's tab.
2. Select **Crop**.
3. Drag the handles.

### Sustain it with a loop

A note loops for as long as the key is held once it has loop points.

1. Tap the note's tab.
2. Select **Loop**.
3. Tap **Loop** to place the handles, or drag them yourself.
4. Turn on the loop button beside **Play**, then tap **Play** to hear the loop repeat. Listen for a
   click where it joins.

With loop playback off, Play plays the whole crop once.

### Length

Multi-samples have the same limits as any sample: 20 seconds in stereo, or 40 in mono.

### Finish

Tap the checkmark to merge the notes and return to the sample editor, then upload as usual. Tap
**Back** to discard your changes.

## Edit one later

A multi-sample built in Best Friend stays editable. Open it and change one note — re-crop it,
re-loop it, move it — without rebuilding everything around it. Changes apply when you upload.

A multi-sample does not support stem-splitting.

## Device support

Multi-samples are available on the **EP-1320 Medieval** and the **EP-40 Riddim**. The
**EP-133 K.O. II** does not support them. Everything else in Best Friend works on the EP-133 exactly
as it does on the others.

## Related

- [Record or import a sample](/docs/record-or-import-a-sample)
- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Best Friend for the EP-1320 Medieval](/ep-1320)
- [Best Friend for the EP-40 Riddim](/ep-40)
