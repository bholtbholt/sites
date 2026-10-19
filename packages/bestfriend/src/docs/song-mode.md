---
title: See your whole Song end to end
summary: Song mode draws every chained scene in one continuous timeline, with continuous bar numbers and each scene's own meter.
section: Scenes & performance
order: 2
question: How do I see the whole Song on my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

A Song on the EP is a chain of scenes. On the hardware you see one position at a time. Song
mode in Best Friend draws **the entire chain as one timeline**, in the order the device plays
it.

Choose **Song** from the menu in the top left of the
[Scenes timeline](/docs/see-scenes-and-songs). On the hardware, hold <kbd>MAIN</kbd> +
<kbd>PLAY</kbd> to play the chain.

## What you get

- **Every chained scene, end to end, in chain order** — which is not the same as scene number
  order. A song can run `S1 → S4 → S2`, and it may name sparse numbers like `S94`.
- **Continuous bar numbers** across the whole song, rather than each scene restarting at 1.
- A label at the start of each segment, in the accent colour, naming the scene it belongs to —
  `8 • Scene 02`. A single scene shows plain numbers with no label.
- **Each scene keeps its own meter.** A 3/4 scene sitting among 4/4 scenes gets 12-step bars
  and three beat divisions, at its own bar width.
- **The union of every pad row** across the whole song. A pad that is silent in the first scene
  still has its row, so nothing appears or disappears halfway along. The automation lane badges
  likewise list every lane that any scene in the song automates.

While song mode is on, the menu shows **Song** with a checkmark. Pick a scene from the same menu to
leave it.

## Playback

With [MIDI clock out enabled](/docs/midi-clock-and-system-codes):

- The playhead crosses a scene change **without resetting** — the device sends no song position
  there, and the timer keeps counting straight through.
- At the end of the song the playhead **stops on the last step** and the timer freezes rather
  than wrapping to bar 1. Press play again and both restart from zero.

In song mode the bar count on the transport row is the song's.

## Two things that are not bugs

**Song is listed but disabled** when the chain has fewer than two resolvable scenes. There is no
song to draw.

**The song changed on the device.** Song mode draws the chain Best Friend last read. Cut or add a
chain position on the EP, then pull down on the piano roll to refresh, and the roll matches the
EP's own song screen.

## It never touches the device

Song mode is a second reading of the project Best Friend already loaded. It issues no reads and
writes nothing.

## Related

- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [See the fader automation lanes](/docs/fader-automation-lanes)
- [Bounce multi-track stems into Ableton, Logic, or FL Studio](/docs/bounce-stems-to-your-daw)
