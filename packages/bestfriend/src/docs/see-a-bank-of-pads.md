---
title: See every pad in a bank at once
summary: A grid of waveforms, slot numbers, and names laid out like the hardware — and the place to swap, copy, chop, and bulk-edit pads.
section: Pads
order: 1
question: How do I see all the samples on my EP-133 pads?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
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
  unassigns them together. Select pads by tapping them in the app or on the hardware. Settings apply
  as you change them, and selections stay within one group.
- **Copy Mode** copies one pad onto another. Tap the pad to copy, in the app or on the hardware,
  then tap the pad to copy it to. The target takes the copied pad's sample and every setting.
- **Chop Mode** slices one sample across pads — see
  [chop a sample across pads](/docs/chop-a-sample-across-pads).
- **Performance mode** latches mute, pitch, and reverse effects per pad — see
  [mute, pitch, and reverse per pad](/docs/performance-effects-and-mute).

## Related

- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Save and recall a bank with Bank Snapshots](/docs/bank-snapshots)
