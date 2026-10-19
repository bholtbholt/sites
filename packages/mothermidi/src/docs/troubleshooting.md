---
title: Troubleshooting
summary: 'Fixes for no sound, doubled notes, and a silent arpeggiator.'
section: connecting
order: 130
---

## Nothing plays

- Connect an instrument, or open a music app that listens to Mother MIDI.
- Match the channel in the toolbar to your instrument's.
- Check your instrument is on in the MIDI tab of Settings.
- Some iOS instruments don't receive inter-app MIDI. Use [AUM](/docs/aum) or [Audiobus](/docs/audiobus) to route Mother MIDI to it.

## The DAW can't see Mother MIDI

- Check **Enable** is on for your device in Audio MIDI Setup. Unlock the device, click Enable again, and restart the DAW.
- If you picked destinations by hand, turn on **IDAM MIDI Host**.

See [Connecting to a Mac](/docs/connecting-to-a-mac).

## The arpeggiator is silent

The toolbar reads **No clock**. Press play in the DAW and check it sends clock to your device, or switch to **Internal**. See [Syncing the arpeggiator](/docs/syncing-the-arpeggiator).

## Notes play twice

The DAW is echoing Mother MIDI back to the same instrument. Turn off MIDI thru on that track.

## Notes land late

A cable adds a small, steady delay. Set the DAW's recording delay rather than quantizing.

## A note won't stop

Tap the key again. If it still holds, reconnect the instrument.

## The bend is too wide or too narrow

The bend range is set on your instrument.
