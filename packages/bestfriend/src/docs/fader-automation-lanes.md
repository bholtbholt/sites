---
title: See the fader automation you recorded
summary: Level, pitch, time, filter, and FX automation drawn as curves under the notes, four lanes at a time.
section: Scenes & performance
order: 3
question: How do I see fader automation on the EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

The EP records fader moves alongside your notes. There is no way to see them on the hardware.
Best Friend draws them as curves beneath the notes on the
[Scenes timeline](/docs/see-scenes-and-songs).

## The lanes

| Lane | What it automates |
| ---- | ----------------- |
| LVL  | Level             |
| PTC  | Pitch             |
| TIME | Time / stretch    |
| LPF  | Low-pass filter   |
| HPF  | High-pass filter  |
| FX   | Effect send       |

A badge row appears above the timeline listing **only the lanes this scene actually has
automation on**. A scene with no automation gets no badge row at all.

## Showing and hiding them

Tap the automation icon in the transport row and Best Friend selects the **first four lanes in
device order**. Then tap individual badges to change the selection.

**Four curves is the maximum.** Adding a fifth turns off the longest-shown lane and takes its
colour; a sixth takes the next, cycling around the four slots. Turning a lane **off** ends that
cycle, so the next lane you add fills the freed slot and evicts nobody. Lanes you have not
touched never change colour.

Each badge is filled with the exact colour its curve is drawn in, and the pairing holds as the
selection changes. The selection — gaps included — survives leaving the tab and relaunching the
app.

On a fresh install, the first scene that has automation opens with its lanes **already
showing**. Turning every lane off is remembered, and is not undone by opening a scene that has
no automation.

If a bank uses only lanes outside the first four, nothing is drawn until you pick one by hand.

## How the curves are drawn

- Over the bar shading, under the notes, as a line.
- A bank whose pattern is **shorter** than the scene repeats its lane across the full width,
  the same way its notes tile.
- A bank showing fewer than three rows gains labelled silent rows to give the curve somewhere
  to live — gaps first, then upward. Banks without that lane keep their own height.
- In follow mode the curves track the window with no dropout at either edge.

## It never touches the device

The badges and curves are read from the project Best Friend already loaded. Showing a lane
issues no read and writes nothing.

## Automation and bouncing

Fader automation is **included when you bounce**, so the stems carry the moves you recorded.

A group whose fader is parked away from rest with nothing recorded on that lane bounces at the
parked value — that static base is what the hardware plays.

FX and FX automation are not included in bounces.

## Related

- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [See your whole Song end to end](/docs/song-mode)
- [Bounce multi-track stems into Ableton, Logic, or FL Studio](/docs/bounce-stems-to-your-daw)
