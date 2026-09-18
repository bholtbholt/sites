---
title: Edit trim, pitch, pan, and every other pad setting
summary: Every parameter for a pad on one screen, with the waveform above it, instead of buried behind hardware menus.
section: Pads
order: 2
question: How do I edit pad settings on my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

On the hardware, pad parameters live behind menus and read out through a three-character
display. Best Friend puts the whole set on one screen with the waveform above it, so you can
see what you are changing while you change it.

## What you can set

- **Trim** — the start and end of the sample, set against the waveform, with hardware control
  over the trim window.
- **Attack** and **release** envelopes.
- **Amp**, **Pitch**, and **Pan**.
- **Play Mode** and **Time Mode**.
- **MIDI channel**.
- **Mute**, per pad.
- **Supertone**, on the EP-40 — see below.

Every pad also shows its waveform, name, and length, so you can tell pads apart at a glance
rather than by memory.

## Where this fits

- The whole group as a grid of waveforms and names:
  [see every pad in a bank at once](/docs/see-a-bank-of-pads).
- Mute, pitch up, pitch down, and reverse per pad:
  [performance effects](/docs/performance-effects-and-mute).
- Moving a sample to another pad:
  [reassign pads by dragging](/docs/reassign-pads).

## It stays in step with the hardware

Trim and envelope changes are **written when you let go**, not continuously through the drag,
so dragging a handle across a long sample does not flood the device.

It works the other way too: change the active pad's start, end, attack, or release **on the
EP** with the pad screen open and the handles and envelope overlay move to match. There is
nothing to refresh.

## Save default pad settings

If you always want the same starting point for a new sample, save it as the default and stop
setting it by hand every time. Save pad defaults by editing the sample and uploading it with Best Friend, or by holding **SHIFT** + **SOUND** on the hardware.

### On the EP-40 Riddim

A Supertone pad shows its engine, its waveform, and its two named parameters alongside
the ordinary pad controls. Those parameter gauges are a **readout, not an editor** — see
[Supertone settings on the EP-40](/docs/supertone-pads-on-the-ep-40). Best Friend is not able to edit Supertone parameters due to them being hidden on the hardware.

### On the EP-1320 Medieval and EP-133 K.O. II

The full pad parameter set is available on both. Play Mode offers One shot, Key, and Legato —
**Loop** is an EP-40 exclusive.

## Related

- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Build a multi-sample across pads](/docs/build-multi-samples)
