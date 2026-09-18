---
title: Play your EP from a keyboard with chords and an arpeggiator
summary: A velocity-sensitive keyboard with one-button triads, custom chords, split zones, and an arpeggiator locked to the hardware clock.
section: Playing
order: 1
question: Can I use Best Friend as a MIDI controller for my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Best Friend includes a velocity-sensitive keyboard that plays your EP-133 K.O. II, EP-40
Riddim, or EP-1320 Medieval directly over the same USB-C connection.

## Arm it first

The keyboard plays **one pad, chromatically**:

1. On the EP, press **KEYS** and pick the pad you want to play.
2. If the pad has a MIDI channel set, sync it with Best Friend. In Best Friend, open the
   keyboard's settings sheet and set MIDI to the same channel. The stepper runs **0 to 16,
   where 0 is Off** — on Off the keyboard sends nothing.

Play the keyboard and you get that one sample pitched across the keys. A **different pad per
note** means the channel does not match or the pad is not in keys mode.

Each pad's MIDI channel is editable alongside its other parameters. See
[edit pad settings](/docs/edit-pad-settings).

## How the keys behave

The keyboard is **monophonic**, and the newest finger wins. Slide across several keys without
lifting and each new key retriggers while the previous one stops; a wobble inside one key does
not retrigger. Land a second finger while the first is down and the newest sounds; lift it and
you fall back to the finger still held.

Nothing rings on after the last lift.

## Octave and range

- The **octave stepper** shifts the range and **keeps a held note**, retriggering it an octave
  away at the same velocity.
- The **scroll bar** moves the window a key at a time and **releases** a held note rather than
  retriggering it, because the window now points at unrelated pitches.
- The readout names the pitch of the leftmost key.

Changing the MIDI channel while a key is held stops the note — the release goes to the channel
it started on, so nothing is left ringing on the old one.

## Pitch bend

Drag the pitch wheel and release: it springs back and lands **exactly** at rest, so a note held
through the return ends in tune rather than a few cents off. Grabbing it again mid-return takes
over cleanly.

## Chords

- **One-button triads**: major, minor, suspended, and diminished.
- **Extensions**: add a 6th, 7th, or 9th.
- **Lower octave**: add it to any chord.
- **Custom chords**: save your own to any Chord or Extension button.
- **Split zones**: divide each key into one to three zones for alternate chord positions.

### Latching

- **Single tap** a chord to move the latch to it.
- **Double tap** to latch or unlatch.
- **Press and hold** a chord to override the latch for as long as you hold it; the previous latch
  comes back on release.

A slide across the chord column that ends over a different button is not treated as a tap, so the
latch does not move by accident.

Two extensions can be held at once with two fingers. Adding an extension **adds its note** without
restriking the chord, and lifting it drops only that note while the rest keeps ringing.

### Sub

**Sub** adds a note an octave below the root, underneath the whole chord. Toggling it mid-hold
adds or drops only that note — the chord above it does not restrike. A bare key with no triad
armed still gets its sub, and a sub that would fall below the bottom of the MIDI range is
dropped rather than wrapping.

With the arpeggiator running, the sub is walked as an ordinary tone: C–E–G plus a sub is a
**four**-step phrase, lowest first.

## Arpeggiator

Four modes, six rates, and a three-octave range, **synced to the hardware clock**. It needs
[MIDI clock out](/docs/midi-clock-and-system-codes) — see
[the arpeggiator](/docs/arpeggiator) for the detail.

## This screen writes nothing

The keyboard plays your EP. It does not alter a single pad setting while doing it — open the pad
afterwards and it is exactly as you left it.

## Related

- [Chord positions and inversions](/docs/chord-positions-and-inversions)
- [Build your own chords and extensions](/docs/custom-chords-and-extensions)
- [Velocity and modulation](/docs/velocity-and-modulation)
- [Use the arpeggiator](/docs/arpeggiator)
- [Connect your EP](/docs/connect-your-ep)
