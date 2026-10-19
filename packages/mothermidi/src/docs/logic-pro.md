---
title: Logic Pro
summary: 'Play, record, and quantize Mother MIDI in Logic Pro, and send it clock for the arpeggiator.'
section: connecting
order: 90
---

## Playing and recording on a Mac

[Connect to the Mac](/docs/connecting-to-a-mac) first.

1. Create a Software Instrument track and record-enable it.
2. Play Mother MIDI. Logic hears every MIDI input by default.

To limit a track to Mother MIDI, open the inspector (<kbd>I</kbd>) and set **MIDI In Port** to your iPhone or iPad. If nothing plays, check the port is on in **Logic Pro > Settings > MIDI > Inputs**.

## Sending clock from a Mac

1. Choose **File > Project Settings > Synchronization**, then **MIDI**.
2. Set **Destination** to your iPhone or iPad and turn on **Clock**.
3. Press play.

If the arpeggio drifts ahead or behind, adjust **Delay** on the same tab.

## Quantizing while you record

Click an empty part of the Tracks area so no region is selected. The Region inspector reads **MIDI Thru**. Set **Quantize** there, and every new recording on that track uses it.

## On iPad

1. Open Mother MIDI in Split View or Slide Over beside Logic Pro.
2. Create a Software Instrument track and record-enable it.
3. Play Mother MIDI.

To send clock, open **Project Settings > MIDI > Sync**, turn on **Clock** for **Mother MIDI**, and press play.
