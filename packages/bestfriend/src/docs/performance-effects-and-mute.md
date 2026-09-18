---
title: Mute, pitch, and reverse individual pads while you play
summary: Per-pad performance effects and mutes, toggled with the whole bank still on screen.
section: Pads
order: 3
question: How do I mute or reverse a single pad on the EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Best Friend puts five performance effects on every pad, switchable while the rest of the
bank stays in view. Each one is a **latch**: the effect applies for as long as it is on.

- **Mute**
- **Mute Group**
- **Pitch up**
- **Pitch down**
- **Reverse**

The grid stays on screen, so you can see which pads are affected rather than tracking it in
your head.

## Entering and exiting performance mode

Toggle the finger icon in the top-right toolbar. Any pad you tap is latched into the new
state, and stays there until you tap it again.

Leaving performance mode **reverts every pad automatically**, so you do not have to undo your
own set.

## Each pad carries one effect

A pad holds one effect at a time, and it is **Mute** until you change it. To change it,
**long-press the pad while performance mode is on** and pick from the sheet. Tapping the pad
then toggles whichever effect it carries.

The assignment is remembered across launches, and it is keyed to the bank and the pad
position — so pad 5 in bank A keeps its effect whether or not the sample on it changes.

## What each one does

- **Mute** drops that pad's amplitude to zero.
- **Mute Group** mutes a set of pads together, across groups.
- **Pitch up** and **Pitch down** shift the pad by an octave, **clamped** to the device's
  range. A pad already near the ±12 limit shifts as far as it can rather than having the
  write rejected.
- **Reverse** plays the sample backwards.

## Fixing stuck pads

Performance effects are written over MIDI, and the connection can only carry so much at
once. Saturate it — a fast run of toggles across several pads — and a write can be dropped.
When that happens the pad keeps the effect and the revert never arrives, so it stays changed
after you leave performance mode. There is no automatic recovery.

Set it back by hand, on the pad's own screen:

| Stuck effect      | Reset with           |
| ----------------- | -------------------- |
| Mute / Mute Group | **Amp** fader        |
| Pitch Up / Down   | **Pitch** fader      |
| Reverse           | **Time Mode** picker |

Double-tap a fader to reset it. Time Mode is a picker, so set it back rather than resetting
it. On the hardware, press **SHIFT** + **SOUND** and use the XY knobs.

## Three different mutes

The word covers three separate things:

1. **Pad settings ▸ Mute** writes the device's own choke-group flag. It silences **other**
   pads when this one plays. See
   [edit pad settings](/docs/edit-pad-settings).
2. **Performance ▸ Mute** drops **this** pad's amplitude to zero, and nothing else.
3. **Performance ▸ Mute Group** is a **Best Friend-only** set of pads that mute together,
   and can span groups. It never writes the device's choke flag.

## Related

- [See every pad in a bank at once](/docs/see-a-bank-of-pads)
- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Move a sample to a different pad by dragging it](/docs/reassign-pads)
