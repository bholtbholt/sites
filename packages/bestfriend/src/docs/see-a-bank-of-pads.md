---
title: See every pad in a bank at once
summary: A grid of waveforms, slot numbers, and names laid out like the hardware — and the place to swap, copy, chop, bulk-edit pads, and map MIDI notes for an electronic drum kit.
section: Pads
order: 1
question: How do I see all the samples on my EP-133 pads?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-11-21
---

The EP shows you one pad's name at a time, three characters wide. Best Friend shows you the
whole group as a grid, each cell carrying the pad's **waveform, slot number, and name**.

The layout matches the hardware's keypad, so the pad under your finger is the cell in the same
place on screen:

```
.  0  E
7  8  9
4  5  6
1  2  3
```

Switch groups with the hardware buttons, or tap **A**, **B**, **C**, or **D**. The grid follows
whichever group the hardware is on.

## How the waveforms load

Each cell paints from a small overview of the sample rather than the whole file, so a group of
filled pads fills in quickly on first open even when nothing is cached yet. **Tapping a cell
plays it on the EP itself** — nothing is downloaded to browse a bank. The full audio comes
down only when you open the sample editor.

## The active pad

The pad the hardware is currently on is washed in the accent colour, with a chip in the
gutter. Change pad on the device and the wash follows.

## What you can do from here

- **Tap** a cell to audition it on the EP.
- **Drag** a cell onto another to swap two pads — see
  [reassign pads by dragging](/docs/reassign-pads).
- **Drag** a cell to the trash to unassign its sample. The sample stays in its slot on the hardware.

The toolbar switches the grid into one mode at a time:

- **Select Mode** applies [pad settings](/docs/edit-pad-settings) to several pads at once, or
  unassigns them together — see below.
- **Copy Mode** copies one pad onto another. Tap the pad to copy, in the app or on the hardware,
  then tap the pad to copy it to. The target takes the copied pad's sample and every setting.
- **Chop Mode** slices one sample across pads — see
  [chop a sample across pads](/docs/chop-a-sample-across-pads).
- **Performance mode** latches mute, pitch, and reverse effects per pad — see
  [mute, pitch, and reverse per pad](/docs/performance-effects-and-mute).

## Change several pads at once

Tap the Select Mode icon, then select pads by tapping them in the app or on the hardware.
Supertones can be selected too. Selections stay within one group.

Change the settings you want, then tap **Apply**. Only the settings you changed are written, and
only to pads that don't already have them. Swipe the sheet down to close it without applying.

## Map MIDI notes to an electronic drum kit

The **MIDI Note** card in Select Mode gives the selected pads the notes you play them with — the
notes the hardware sends when you press a pad, or the notes an electronic drum kit sends. Recorded
patterns then play back on the notes you pressed.

1. Turn on **Assign MIDI notes**.
2. Pick a template. It applies to the group your selection is in.
   - **Teenage Engineering** matches the note each pad sends when pressed, so it follows the group.
   - **Electric Drum Kit** follows the General MIDI drum map: kick and snare on the bottom row,
     cymbals on 7 8 9.
3. Tap **Apply**.

**Only assign One Shots** leaves Key, Legato, and Loop pads and Supertones as they are. The pads
it skips are listed under the card. **Keep recorded notes in sync** moves the notes already
recorded on each pad by the same amount, so they keep their pitch.

> A pad's MIDI note is also its root note. On a Key or Legato pad, changing it shifts what KEYS
> plays, which is why those pads are skipped by default.

### Make your own template

1. Tap the template, then **New Template** for a blank one. To start from an existing template,
   open it and tap **Duplicate**.
2. Tap a pad to give it a note. The list opens on the kick; scroll up for lower notes, or search by
   number, note, or name.
3. Tap the title to rename it.

A pad without a note keeps the note it already has. Pads sharing a note show a warning. Built-in
templates can't be changed — duplicate one to edit it. A duplicate of Teenage Engineering takes the
notes of the group you're editing. Templates sync with your [Library](/docs/icloud-sync).

## Related

- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Save and recall a bank with Bank Snapshots](/docs/bank-snapshots)
