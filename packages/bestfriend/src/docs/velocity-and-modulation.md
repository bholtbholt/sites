---
title: Set the velocity range and add modulation by dragging
summary: A two-handle velocity band with a floor and a ceiling, and modulation wound in by dragging up the key you are holding.
section: Playing
order: 4
question: How do I change velocity sensitivity on the Best Friend keyboard?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Both controls live in the keyboard's settings sheet, and both are off until you switch them on.

## Velocity

**Velocity sensitive** turns the keyboard's velocity response on. The band underneath it has
**two handles** — a floor and a ceiling — so you decide the softest and loudest a strike can be.

- Each handle moves on its own, and stops against the other rather than pushing it.
- No strike is ever quieter than your floor or louder than your ceiling.
- The numbers keep a fixed width while you drag, so the readout does not jitter.
- Turn sensitivity off and the whole control dims; no drag moves it.

The band persists when you dismiss the sheet, and across a relaunch.

### Where on the key is loudest

Velocity is read from **how far up the key** you strike:

- On a **white** key the ramp tops out at the black-key line, so full velocity is reachable
  without fighting the black keys. The bottom of the key is all floor.
- A **black** key ramps over its own full height.
- With [zones enabled](/docs/chord-positions-and-inversions), each zone is its own complete
  soft-to-loud sweep — the top of every zone is that zone's loudest, not just the top of the key.

## Modulation

**Modulation sensitive** lets you wind modulation in with the same finger that is playing:

1. Press a key.
2. Drag straight up, towards the black keys, and hold.

Full modulation is reachable on a white key at the black-key line, and the black keys do not steal
the touch. With the toggle off, dragging sends nothing at all.

### How the gesture behaves

- A fresh touch **picks up where the last one left off** — no jump back to zero.
- One gesture can wind a raised value all the way back down, dragging past the bottom edge of the
  keyboard if you struck the key low.
- Small vertical wobbles and sideways slides do nothing. A diagonal slide onto the next key
  retriggers the note **without** moving modulation.
- Once you are modulating, reaching sideways for another key keeps modulating.
- Turning the toggle off drops the value to zero immediately, and so does leaving the screen.

The modulation band clamps both ends, the same way the velocity band does — set it to 40–80 and
the drag sweeps only that range.

## With VoiceOver

The velocity band reads as **two** handles, "Softest velocity" and "Loudest velocity", each
adjustable on its own; the modulation band reads the same way as minimum and maximum. With
modulation sensitivity on, a **Modulation** control follows the keys and adjusts by swipe, since
the drag gesture itself is not reachable.

## Related

- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
- [Play chord inversions with Chord Zones](/docs/chord-positions-and-inversions)
