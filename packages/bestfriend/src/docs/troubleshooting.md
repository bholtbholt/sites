---
title: Fix common Best Friend problems
summary: What to do when uploads fail, chords play the wrong pads, the playhead or arpeggiator will not run, or a backup will not restore.
section: Getting started
order: 6
question: Why isn't Best Friend working with my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

If the EP does not appear at all, start with
[your EP isn't showing up](/docs/connection-troubleshooting).

## The device is full

Uploads fail when the EP's memory is full. Delete samples you do not need to make room — see
[move, share, and delete samples in bulk](/docs/organise-your-samples) — or shrink the next one
before it goes on, with [fit more samples on your EP](/docs/fit-more-samples-on-your-ep).

Remaining memory is shown in [App Settings](/docs/app-settings).

## A slot says "load failed"

The slot holds a damaged sample. Delete it from the hardware: load the slot onto a pad, then hold
<kbd>SOUND</kbd> + <kbd>ERASE</kbd> until DEL flashes.

## A "device is busy" warning

Best Friend blocks uploads while the EP is in Sample Mode, to avoid corrupting samples. On the
hardware, press <kbd>MAIN</kbd> to go back to Main Mode.

## Keys and Chords don't respond

The on-screen keys pause while a sample, backup, or snapshot transfers. Playing a key mid-transfer
can crash the EP, so Best Friend holds them until it finishes.

## The EP crashes with Supertone pads

Changing a pad setting while a Supertone is sounding can crash the EP. This is a firmware bug. Let
the note stop before you change its settings, and if the EP crashes, turn it off and on again. See
[Supertone settings on the EP-40](/docs/supertone-pads-on-the-ep-40).

## Following the playhead doesn't work

Following needs MIDI clock from the hardware: turn on
[MIDI Clock Out](/docs/midi-clock-and-system-codes) (code 102).

## Scene data looks wrong

The EP does not send a live feed of its sequencer, so the roll can drift out of step. Pull down on
the piano roll to refresh. Dashed notes are ones played since the last refresh — see
[watch notes appear as you record](/docs/watch-notes-as-you-record).

## Chords aren't playing anything

The pad has to be listening on the keyboard's MIDI channel. Select a pad on the hardware and press
<kbd>KEYS</kbd>, or match its MIDI channel in the chord toolbar. See
[arm it first](/docs/midi-keyboard-and-chords).

## Chords are playing random pads

Either the EP is not in KEYS mode, so notes trigger pads across the group, or other pads share the
chord pad's MIDI channel.

- Select the pad and press <kbd>KEYS</kbd>.
- Or give the chord pad its own MIDI channel. See
  [play your EP from a keyboard](/docs/midi-keyboard-and-chords).

## Chords play one note at a time

The pad must be in **Key** play mode to play chords. One shot and Legato pads play one note at a
time. See [edit pad settings](/docs/edit-pad-settings).

## The arpeggiator doesn't play

The arpeggiator needs MIDI clock from the hardware. See
[MIDI Clock Out](/docs/midi-clock-and-system-codes).

## Previews are silent

Sample editor previews, bounce previews, and Bank Snapshot pad previews play through the EP, and
need [USB Input Monitoring](/docs/midi-clock-and-system-codes) (code 511). Without it, switch the EP
to SAMPLE to hear them.

## A backup won't restore

Backups restore only to the EP model that made them. A backup from another model still opens and
browses, but cannot be restored. See [back up and restore](/docs/back-up-and-restore).

## A Library item won't open

A row with a cloud icon is stored in iCloud only. Tap it, with an internet connection, to download
it. See [sync your Library](/docs/icloud-sync).

## Still stuck?

Email [bugs@epbf.app](mailto:bugs@epbf.app) with your device, your OS version, which EP you have,
and what you were doing.
