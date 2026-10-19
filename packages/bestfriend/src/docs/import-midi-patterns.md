---
title: Play a MIDI file on your EP and record it into a pattern
summary: Import a .mid, assign its tracks to pads, and play it at the EP in time with its clock — then record it straight into a pattern.
section: Playing
order: 6
question: How do I import a MIDI file into the EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

The EP cannot open a MIDI file. Best Friend can: import a `.mid`, point its tracks at pads, and play
it at the hardware so the EP records it into a pattern. Use it to bring in a drum part or a
bassline from a DAW, or a pattern from a backup.

## Import a pattern

Open **MIDI Patterns** in the Library, tap the import button in the top right, and choose a `.mid`
file. A file timed in SMPTE frames cannot be played, because the EP follows beats.

MIDI from a [bounce](/docs/bounce-stems-to-your-daw) or a [backup](/docs/back-up-and-restore) opens
from there instead: tap a bounce's MIDI row, or a pattern inside a backup. Those open already
mapped to their pads, and are not listed on the MIDI Patterns page — search finds them.

## Map tracks to pads

Each track gets a row. Tap a track's icon to switch it between **Drums** and **Keys**, and tap its
name to rename it.

### Drums

A drum track lists one lane per note. Tap a lane's pad, then press a pad on your EP to assign it. A
lane's notes take the colour of the pad they will play. Set the channel with the stepper on the
track's row.

### Keys

A Keys track plays as one part. Transpose it up to 24 semitones either way, and set its channel.

## Play it

Tap play in the panel at the top. It plays in time with the EP, so it needs
[MIDI Clock Out](/docs/midi-clock-and-system-codes) (code 102).

- Pinch to zoom, and double-tap to reset.
- Drag the handles to set what plays. They snap to bars.
- Tap **Mute** or **Solo** to isolate parts while it plays.

Mapping changes take effect while it plays.

## Record it onto the EP

1. Turn on [MIDI Clock Out](/docs/midi-clock-and-system-codes).
2. Turn off quantization with <kbd>TIMING</kbd> → <kbd>+</kbd>, so the MIDI records accurately.
3. Arm the EP with <kbd>RECORD</kbd>.
4. Tap play in Best Friend.

The EP records one group at a time. Use Mute and Solo to stop notes doubling up — though parts
assigned to another group are harmless to leave playing.

## Share and organise

Tap **Share** in the top right to share the pattern. Long-press a pattern for **Delete**, **Edit**,
and **Share**, or on Apple devices swipe it to share or delete.

Mappings and track names are saved in the app. The `.mid` file itself is not changed.

## Related

- [Turn on MIDI clock](/docs/midi-clock-and-system-codes)
- [What's inside a bounce](/docs/whats-in-a-bounce)
- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
