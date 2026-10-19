---
title: Turn on MIDI clock so the playhead and arpeggiator work
summary: System Code 102 sends the EP's MIDI clock, 511 lets you hear previews, and 120 sets channel 10 — the hardware settings Best Friend relies on.
section: Getting started
order: 4
question: How do I turn on MIDI clock out on the EP-133 K.O. II?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Most of Best Friend works the moment you plug in. A few things do not, because they depend on
settings in the EP's System Menu. Set them once by System Code, or by stepping through the system
menu with <kbd>-</kbd> and <kbd>+</kbd>.

## Enter a system code

1. Hold <kbd>SHIFT</kbd> + <kbd>SYSTEM</kbd>.
2. Type the number on the keypad.
3. Press <kbd>ENTER</kbd>.

## MIDI Clock Out: code 102

<kbd>SHIFT</kbd> + <kbd>SYSTEM</kbd> → <kbd>102</kbd> → <kbd>ENTER</kbd>

Sends the hardware's MIDI clock over USB. Best Friend reads the EP's own clock rather than guessing
at the tempo, so these are silent until it is on:

- The moving **playhead** on the [Scenes timeline](/docs/see-scenes-and-songs).
- The [arpeggiator](/docs/arpeggiator).
- Playing an imported [MIDI pattern](/docs/import-midi-patterns) at the device tempo.
- Lining up [real-time capture](/docs/bounce-stems-to-your-daw) takes with the song.

Best Friend picks it up within about a second — no reconnect, no relaunch. Switch it off with
**100** instead of 102. Use code **101** for MIDI in.

|                 | Clock off                                                   | Clock on                                                   |
| --------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Scenes timeline | Notes, lanes, and Song mode all work; no playhead, no timer | Playhead follows the transport, timer counts `MM:SS`       |
| Arpeggiator     | A held key sounds its root, but no phrase                   | Steps land on the EP's own 16ths, and follow tempo changes |

## USB Input Monitoring: code 511

<kbd>SHIFT</kbd> + <kbd>SYSTEM</kbd> → <kbd>511</kbd> → <kbd>ENTER</kbd>

Routes USB audio back to the EP. Best Friend uses it for:

- Audio previews in the [sample editor](/docs/sample-editor-and-effects).
- Bounce previews in the Library.
- Bank Snapshot pad previews.

Without it, you must switch to SAMPLE on the hardware to hear playback.

## MIDI Channel 10: code 120

<kbd>SHIFT</kbd> + <kbd>SYSTEM</kbd> → <kbd>120</kbd> → <kbd>ENTER</kbd>

Sets the default MIDI channel to 10, the universal standard for drum machines and percussion.
Channels are configurable in Best Friend, so channel 10 is recommended rather than required — the
hardware behaves more predictably with a single channel set than with all of them.

Best Friend uses it for the [chord controller](/docs/midi-keyboard-and-chords) and imported
[MIDI patterns](/docs/import-midi-patterns).

## If the clock still reads off

With no clock arriving, the keyboard's toolbar reads **No clock** with a warning triangle, the
arpeggiator toggle is disabled, and the Arpeggiator settings tab names the code to use. If it stays
that way after you have entered 102:

- Re-enter the code. It is easy to miss the <kbd>ENTER</kbd> at the end.
- Check the EP is connected over a **data** cable, not a charge-only one. See
  [which cable you need](/docs/cables-and-adapters).
- The arpeggiator toggle in Best Friend always starts **off** after a launch — arm it again.

## Related

- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
- [Use the arpeggiator](/docs/arpeggiator)
