---
title: Turn on MIDI clock so the playhead and arpeggiator work
summary: Two features need the EP's MIDI clock sent out — System Code 102 switches it on, 100 switches it off.
section: Getting started
order: 4
question: How do I turn on MIDI clock out on the EP-133 K.O. II?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Most of Best Friend works the moment you plug in. Two things do not, because they need the EP
to broadcast its clock: the **moving playhead** on the Scenes timeline and the
**arpeggiator** in the MIDI Controller. Both read the hardware's own clock rather than
guessing at the tempo, which is why they are silent until it is switched on.

## Switch it on

On the EP itself:

1. Hold **SHIFT** and press **SYSTEM**.
2. Type **102**.
3. Press **ENTER**.

That is MIDI clock **out**. Best Friend picks it up within about a second — no reconnect, no
relaunch.

## Switch it off

Same sequence with **100** instead of 102. Use code **101** for MIDI in.

## What changes when it is on

|                 | Clock off                                                   | Clock on                                                   |
| --------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Scenes timeline | Notes, lanes, and Song mode all work; no playhead, no timer | Playhead follows the transport, timer counts `MM:SS`       |
| Arpeggiator     | A held key sounds its root, but no phrase                   | Steps land on the EP's own 16ths, and follow tempo changes |

Everything else — the pad editor, sample editing, backups, bouncing, Bank Snapshots — is
unaffected either way.

## If it still says OFF

Best Friend shows the clock state in the MIDI Controller's settings sheet, with a warning
triangle and the code to use when nothing is arriving. If it reads **OFF** after you have
entered 102:

- Re-enter the code. It is easy to miss the **ENTER** at the end.
- Check the EP is connected over a **data** cable, not a charge-only one. See
  [which cable you need](/docs/cables-and-adapters).
- The arpeggiator toggle in Best Friend always starts **off** after a launch — arm it again.

## Related

- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
- [Use the arpeggiator](/docs/arpeggiator)
