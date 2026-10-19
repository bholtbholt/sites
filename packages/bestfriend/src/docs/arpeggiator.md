---
title: Use the arpeggiator on your EP-133, EP-40, or EP-1320
summary: Four modes, six rates, three octaves, locked to the EP's own clock so the phrase lands on the hardware's grid.
section: Playing
order: 5
question: Does the EP-133 have an arpeggiator?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

The EP has an arpeggiator, but it is limited to note repeat and as-played notes. Best Friend adds a more robust one, that syncs to the clock of the EP-133, EP-1320, or EP-40.

## Before you start

The arpeggiator needs the EP to be sending MIDI clock:
<kbd>SHIFT</kbd> + <kbd>SYSTEM</kbd> → <kbd>102</kbd> → <kbd>ENTER</kbd>. See
[turn on MIDI clock](/docs/midi-clock-and-system-codes).

With the clock off, the toolbar reads **No clock** with a warning triangle and the arpeggiator
toggle is disabled.

## How to use Best Friend's arpeggiator

1. Tap the arp icon in the top-right toolbar.
2. Press a root note on the keyboard.
3. Optionally, add chords and/or extensions.

The arp toggle latches it on, but phrases will not begin until the root note is held down. The arp toggle always starts **off** on app start-up.

## Controls

| Control      | Options                                            | Default |
| ------------ | -------------------------------------------------- | ------- |
| Rate         | 4, 8, 8T, 16, 16T, 32 (1/4 to 1/32, with triplets) |         |
| Mode         | Up, Down, Up-Down, Down-Up                         |         |
| Oct          | One to three octaves                               |         |
| Root +12     | Adds the root note one octave up                   | On      |
| Double notes | Plays every note twice                             | Off     |

Rate, Mode, and Oct sit beside the Pitch wheel; tap one to cycle through its options. **Root +12**
and **Double notes** are in the **Arpeggiator** tab of Settings.

**Root +12 is on by default**, which is the extra closing note you hear at the top of a
phrase.

## Recording the arpeggiator

The arpeggiator sends MIDI note-on/note-off commands to the EP, which can be recorded as if from any other MIDI controller. The EP's **Time Correction** and **Swing** settings will apply to the incoming notes. Ensure the rate in Best Friend matches the hardware for the most reliable and predictable results.

## On other gear

Want this arpeggiator for a synth or a DAW? It is also in [Mother MIDI](https://mothermidi.app), the
standalone chord controller from the same developer.

## Related

- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
- [Turn on MIDI clock](/docs/midi-clock-and-system-codes)
- [Build your own chords and extensions](/docs/custom-chords-and-extensions)
