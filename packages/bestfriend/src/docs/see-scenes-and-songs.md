---
title: See your Scenes and Songs on a full timeline
summary: Every sequenced note across every group as a piano roll — one scene, the whole song, or a group's patterns — with fader automation and a playhead that follows along.
section: Scenes & performance
order: 1
question: Can I see my EP-133 Scenes on a screen?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

The EP's display can hint at what you programmed. It cannot show it to you. Best Friend puts
the whole arrangement on a timeline.

## What you see

- **Every sequenced note across all four groups**, as a piano roll. Rows follow the keypad layout,
  and a note's length is drawn as recorded.
- **Fader automation lanes** for each group, underneath the notes.
- **A playhead** that follows the hardware as it plays.

## Choose what to show

The current scene loads when you open the tab. Tap the menu in the top left to switch:

- **Song** plays through the scene chain — see [song mode](/docs/song-mode). Start the song chain on
  the hardware by holding <kbd>MAIN</kbd> + <kbd>PLAY</kbd>.
- **Scene** shows one scene.
- **Group A–D** stacks one group's patterns, one after the other, in number order. Each block is
  labelled with its pattern, length, and the scenes that play it — `A.01 • 2 Bars • S01, S03` — or
  just `A.04 • 1 Bar` when no scene uses it. A group with nothing recorded is listed but disabled.

## The layout

Bar width follows the **meter**, so a 3/4 or 9/8 scene is drawn at its own width with the ruler
numbers on the bar lines. Bar lines cross the bank gaps; beat lines stop at each bank. A held
note draws as a bar, a short hit as a single cell. A bank with a shorter pattern than the scene
tiles across the full width with its repeats dimmed.

The transport row reads the scene at a glance:

```
00:12 · 96 BPM · 4/4 · 8 Bars
```

The bar count is the **scene's** longest pattern. In group mode it reads `96 BPM · 7 Patterns`
instead.

## The bottom panel

The panel shows the active pad, the tempo, time signature, and length. Tap the collapse button to
hide it, and the floating button to bring it back; your note selection is kept.

- The **follow** button on the left keeps the playhead in view — see below.
- The **automation** button shows the fader lanes — see
  [fader automation](/docs/fader-automation-lanes).
- The **note** button switches between one row per pad and one row per pitch — see below.
- The **pad names** button shows each pad's slot and sample name over the grid, pinned to the left
  edge as you scroll.
- The **eye** button at the top of the pad column shows or hides silent pads.

## Loading Scenes

Best Friend reads the project **once** when the app starts up. After that it stays silent: changing scene, pinching, toggling filters, and switching tabs all issue no reads. Only two things re-read — pulling down on
the piano roll to **refresh**, and changing the project on the hardware.

Reading the project briefly holds pad input on the EP, so Best Friend reads once and then
stays quiet. A project switch you make while you are on another tab is **held** until you return to the
Scenes tab rather than interrupting your playing.

The timeline opens on whichever scene the device is sitting on, including an empty one — it
tells you there are no recorded notes rather than silently opening somewhere else.

## Zoom and pan

- Drag to pan. Vertical and horizontal move independently, and the grid never drifts off the
  ruler or the pad column.
- Pinch to zoom the **step axis** only — rows and pad icons keep their size. Zoom stays anchored
  under your fingers.
- Double-tap to return to 100%.
- Tap a note to select it; the detail card below names its pad, sample, position, pitch, and
  velocity — `B9 · Rimshot · 2.3 · D4 · vel 96`. Tap empty grid to clear it.

## Follow the playhead

With [MIDI clock out enabled](/docs/midi-clock-and-system-codes), arm follow in the toolbar and
the playhead tracks the transport. One thing moves at a time: the playhead runs to about a fifth
of the width while the grid stays still, then parks while the grid slides underneath it, then
runs to the end once the last bar is on screen. On stop, the grid stays where the playhead left
it and hand-scrolling picks up from there.

The timer sits before the BPM in `MM:SS`, in tabular digits that roll as they change. It tracks
the **playhead**, not the wall clock: a stop freezes it where the playhead froze, and a continue
picks up from there. A looping scene snaps back to `00:00` at the top of each loop.

With no clock arriving, a hint replaces the timer rather than showing you a frozen playhead.

## A KEYS pad's pitches on their own rows

A pad played chromatically is more useful spread out than stacked. Tap the note button in the
bottom panel and a melodic pad becomes **one row per distinct pitch**, lowest at the bottom.
A repeated pitch shares its row, and a chord shows both of its notes.

Turn it off and the pad collapses back to one row, where a chord shows only its longest note.
Single-pitch drum pads never split either way. Tapping a note rings **that** note's row, and the
detail card names the pitch you tapped.

## It is read-only

Nothing on this screen changes anything on your EP.

The EP does not send a live feed of its sequencer, so Best Friend combines the project it read with
the notes it hears. **Dashed** notes are ones it heard that differ from what it read — see
[watch notes appear as you record](/docs/watch-notes-as-you-record). If the roll ever looks wrong,
pull down on it to re-sync.

## What it shows you that the hardware cannot

The EP's display tells you which pattern you are on. It cannot show you that the hat on bank C
lands a step early, or that a fader move from weeks ago is still pulling a bank down.

Tap **Bounce** in the top right to [bounce multi-track stems](/docs/bounce-stems-to-your-daw) of the
Scene or the whole Song, with the fader automation and the MIDI data alongside it.

## Related

- [See your whole Song end to end](/docs/song-mode)
- [See the fader automation you recorded](/docs/fader-automation-lanes)
- [Watch notes appear as you record them](/docs/watch-notes-as-you-record)
- [Bounce multi-track stems into your DAW](/docs/bounce-stems-to-your-daw)
