---
title: See Supertone settings on the EP-40 Riddim
summary: Supertone pads show their engine index, their two named parameters, and their baked waveform instead of a blank editor.
section: Pads
order: 5
question: What are the Supertone settings on the Teenage Engineering EP-40?
devices: [ep-40]
updated: 2026-09-17
---

The EP-40 Riddim has **Supertone** pads: synthesised voices rather than samples. On the
hardware there is very little to see. Best Friend gives each one a proper readout.

## What the pad screen shows

- A header naming the voice — there are ten Supertones, each with its own header.
- The pad's **baked waveform**, drawn per engine, so each Supertone looks like itself rather
  than like a placeholder.
- Two **named parameter gauges**, sitting between Pitch and Pan.
- The rest of the ordinary pad controls: Amp, Pan, envelope, Play Mode, MIDI channel.

## They are a display, not an editor

The gauges are **read-only**. Best Friend never writes a Supertone's engine parameters because it is not possible. Instead, it shows you what the voice is set to so you can see where you are, and you make the change on the hardware. The Sample Editor is hidden on a Supertone pad, since there is no sample to edit.

## Elsewhere in the app

- **Swapping pads** works normally in both directions. The Supertone keeps its engine index.
- **Bouncing** skips Supertone pads — they are synthesised on the device, so there is no audio
  for Best Friend to rebuild. Skipped pads are named on the result screen and in the bounce's
  `Notes.txt`.
- **Loop** is an EP-40 exclusive too: it appears as a fourth Play Mode on the EP-40
  and is absent on the EP-133 and EP-1320, which offer One shot, Key, and Legato.

## Related

- [Edit trim, pitch, pan, and every other pad setting](/docs/edit-pad-settings)
- [Best Friend for the EP-40 Riddim](/ep-40)
- [What's inside a bounce](/docs/whats-in-a-bounce)
