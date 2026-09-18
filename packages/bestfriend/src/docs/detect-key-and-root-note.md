---
title: Find a sample's key and root note automatically
summary: Best Friend listens to the audio and reports the note or key it hears — not what the filename claims.
section: Samples
order: 4
question: How do I find the key of a sample for my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Every sample you open shows its key in the label above the waveform, alongside its size in
kilobytes, its length, and its name:

```
412.0 KB · 4.10s · F min · my-loop
```

That key comes from **analysing the audio**, never from the filename. Rename a bass note to
the wrong pitch and Best Friend still reports what it actually hears. Analysis takes a couple seconds to load.

## What it reports

| Material                                         | What you get                        |
| ------------------------------------------------ | ----------------------------------- |
| A pitched one-shot — bass note, piano note, stab | A note with an octave, like `C#3`   |
| A musical loop with chords                       | A tonic and a quality, like `F min` |
| Anything unpitched — drum loop, noise, texture   | No key at all                       |

## The root note

For a pitched sample, the detected note also **seeds the Root** in the Defaults panel when you
first import the file. That is what makes the sample play at the right pitch when you trigger
it from a keyboard or from KEYS on the hardware.

The seeding happens **on import only**. Re-opening a sample you have already uploaded shows
the key in the label but leaves the Root stepper where it was — so re-editing a sample cannot
transpose a pattern you have already recorded with it.

## Multi-samples

When you build a multi-sample, each row resolves its own root from **its own audio**:

- Audio wins. A correctly-named set and the same files renamed to nonsense land on the same
  roots.
- The filename is only a backstop, used when the audio is unpitched — an unpitched file named
  `… C3` takes `C3` from its name.
- An unpitched file with nothing useful in its name sits at **C3 (MIDI 60)**.
- A root you set by hand is **never** overwritten by the resolver, even if it finishes loading
  afterwards.

Roots matter more here than anywhere else, because every keysplit boundary is drawn from
them — one wrong root moves every zone around it.

## Related

- [Build a multi-sample on the EP-1320 and EP-40](/docs/build-multi-samples)
- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Play your EP from a keyboard with chords and an arpeggiator](/docs/midi-keyboard-and-chords)
