---
title: Logic Pro
summary: 'Play, record and quantize Mother MIDI in Logic Pro, and send it clock for the arpeggiator.'
section: connecting
order: 90
---

## Playing and recording

1. Create a Software Instrument track and record-enable it.
2. Play Mother MIDI. Logic hears every MIDI input by default.

To limit a track to Mother MIDI, open the inspector (<kbd>I</kbd>) and set **MIDI In Port** to your iPhone or iPad. If nothing plays, open **Logic Pro > Settings > MIDI > Inputs** and make sure the port is turned on.

## Sending clock

1. Choose **File > Project Settings > Synchronization**, then the **MIDI** tab.
2. Set **Destination** to your iPhone or iPad and turn on **Clock**.
3. Press play.

If the arpeggio runs slightly ahead of or behind Logic, adjust **Delay** on the same tab.

## Quantizing while you record

Logic can't quantize notes as you play them, but it can quantize each new recording. Click an empty part of the Tracks area so no region is selected. The Region inspector now reads **MIDI Thru**. Set **Quantize** there, and every region you record on that track uses it. You can change it or turn it off later.
