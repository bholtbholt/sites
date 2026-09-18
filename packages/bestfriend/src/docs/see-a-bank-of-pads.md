---
title: See every pad in a bank at once
summary: A grid of waveforms, slot numbers, and names laid out like the hardware, so you can tell a whole group of pads apart without triggering them.
section: Pads
order: 1
question: How do I see all the samples on my EP-133 pads?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
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

Move between groups A, B, C, and D without losing your place, and the grid follows whichever
group the hardware is on.

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
- In performance mode, **tap** a cell to toggle its effect and **long-press** it to choose
  which effect that pad carries, with the whole bank still in view — see
  [mute, pitch, and reverse per pad](/docs/performance-effects-and-mute).

## Related

- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Save and recall a bank with Bank Snapshots](/docs/bank-snapshots)
