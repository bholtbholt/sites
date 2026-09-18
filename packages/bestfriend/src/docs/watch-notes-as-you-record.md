---
title: Watch notes appear on the timeline as you record them
summary: Pads you play show up on the roll immediately as dashed notes, then go solid once the EP has actually recorded them.
section: Scenes & performance
order: 4
question: Can I see what I'm recording on the EP-133 while I play?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

The [Scenes timeline](/docs/see-scenes-and-songs) is not a snapshot. Play a pad with the
transport running and the note appears on the roll straight away — **dashed**, meaning Best
Friend has heard it but has not yet confirmed the EP kept it.

This needs [MIDI clock out](/docs/midi-clock-and-system-codes), since the position comes from
the hardware's own clock.

## Dashed, then solid — or gone

| You played it    | What happens                                                 |
| ---------------- | ------------------------------------------------------------ |
| With RECORD held | The note goes **solid** on the next pass of that bank's loop |
| Without RECORD   | The note **disappears** once the playhead carries past it    |

A dashed note is drawn at its own velocity shade, in the cell it sounded in — including on a pad
the silent-pad filter would otherwise hide.

Two pads recorded into the same step both confirm separately rather than collapsing into one. A
strike on a pad the scene **already** plays in that cell draws nothing, because the roll is
already showing it.

## Timing

An early or late hit is drawn on the step it is **quantized to**, not the one your finger landed
on. Once it replays, the note snaps to the cell the device actually sounds it in.

Pads outside the **active bank** are not drawn at all.

## Erasing

Hold **ERASE** and hit a pad on a step it plays, and the step disappears from the roll on the
pass **after** the one that lost it — the cell has to come round again for the loss to be
measurable. Only that pad's step goes; the other pads in the cell stay.

**ERASE + GROUP** clears the whole cell for that bank, and only that bank.

If a bank's pattern is shorter than the scene, every tiled repeat of the erased step goes, not
just the one under the playhead. Erasing while you are also playing along is delayed rather than
lost — the step goes once you stop playing.

## With the transport stopped

Stepping through a stopped scene with **+/-** works the same way. Strike a pad at a parked step
and it appears dashed; step off and back and it goes solid, because the device has sounded that
step again and confirmed it.

Auditioning several pads at one parked step draws only the **last** one you tried. When the step
is revisited, the pad the device really plays is the one that confirms and the rest are dropped.

Scrolling backwards and forwards without touching anything erases nothing.

## Refresh is the source of truth

All of this is inference from what the EP is sending. **Refresh** re-reads the project and
repaints from the device's own data — anything provisional clears, anything you erased by mistake
comes back, and whatever was really recorded is drawn as a real note.

## It never writes to the device

Best Friend reads the note and clock streams. It does not record for you, and it does not erase
for you — your hands on the hardware do both.

## Related

- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [Turn on MIDI clock](/docs/midi-clock-and-system-codes)
- [See the fader automation you recorded](/docs/fader-automation-lanes)
