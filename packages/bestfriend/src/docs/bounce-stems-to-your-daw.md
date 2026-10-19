---
title: Bounce multi-track stems into Ableton, Logic, or FL Studio
summary: Export every pad that plays as isolated audio, plus mixdowns and MIDI — rendered offline, or captured live off the hardware.
section: Backups & bouncing
order: 5
question: How do I get stems from my EP-133 into Ableton?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Best Friend bounces multi-track audio stems of a Scene or an entire Song directly off your
EP-133 K.O. II, EP-40 Riddim, or EP-1320 Medieval, ready to open in a DAW.

## These are real stems

**Every pad that plays** comes out isolated, built from the **real samples and pad data** on the
hardware. This is not AI source separation guessing at a finished mix — it is the actual audio,
reconstructed per pad. The stems are exact.

Fader automation is **included**, so the moves you programmed survive the trip. See
[fader automation lanes](/docs/fader-automation-lanes).

**Note**: an offline bounce cannot capture **Supertone** tracks, punch-in effects, or the main FX,
because it is rendered in the app rather than recorded from the hardware. Use
real-time capture, below, to include them.

## Make a bounce

1. Tap **Bounce** on the Scenes tab, or **+** on the Library's **Bounces** page.
2. Choose a source — **Scene**, **Song**, or **Real-time capture** — then tap **Next**.
3. Choose the tracks and extras, then tap **Next**.
4. Name it, then tap **Bounce**.

On the source step, tap **Change** to pick another scene, and **Preview** to hear the source before
you bounce it.

## What you can export

Select the individual tracks to export, one file per pad. Pads sharing a mute group come out as a
single stem, but stay separate in the MIDI export. Under **Include**:

- **Stereo Mixdown** — the whole source as one stereo file.
- **Group Mixdowns** — one file per group.
- **MIDI File** — the notes, ready for a DAW or a [MIDI pattern](/docs/import-midi-patterns).
- **Sample Sources** — the samples the source plays.

**Fader Effects** lists the faders the source moves. Toggle one off to bounce as if that fader were
at rest.

Everything exports as **24-bit / 48 kHz WAV**, which every DAW imports without conversion. See
[what's inside a bounce](/docs/whats-in-a-bounce).

## Real-time capture

Real-time capture records the hardware's output as takes while you play — FX, punch-ins, and
Supertones included.

1. Choose **Real-time capture** as the source, then tap **Next**.
2. Record a take, then tap **Keep Take**.
3. Repeat for as many takes as you need.
4. Name the bounce, then tap **Save**.

Tap a take's type to label it **MIX**, **A**, **B**, **C**, **D**, **FX**, or **SU**. The type
prefixes the file name, so a DAW import reads `B_Drums`.

With [MIDI Clock Out](/docs/midi-clock-and-system-codes) on, recording arms and starts when you
press play on the EP, so every take lines up with the start of the song. Without it, a take starts
when you press Record and is marked unsynced.

Choose your EP as the input in [App Settings](/docs/app-settings) if a capture sounds wrong. To add
takes to an offline bounce later, open it in the Library and tap **Capture**.

## Listen and share

Tap a bounce in the Library to open it. Tap a file to show its waveform, and tap play to hear it.
Tap or drag on the waveform to jump.

- Tap **Share** in the top right to share the whole bounce.
- Swipe a file to share or delete it.
- Tap a name to rename it.
- Tap the **MIDI** row to open it as a [MIDI pattern](/docs/import-midi-patterns) and play it back
  at the hardware.

## Into your DAW

The export is standard WAV and standard MIDI, so it opens anywhere: Ableton Live, Logic Pro,
FL Studio, Reaper, Pro Tools, Bitwig, GarageBand. Import the stems onto their own tracks, drop the
MIDI in alongside if you want to re-trigger parts with other instruments, and mix from there.

Bounces are filed in the Library next to your backups, and on Apple devices iCloud syncs them
across your iPhone, iPad, and Mac — bounce on the phone, open them on the Mac.

A backup can be bounced without the hardware connected. See
[bounce from a backup](/docs/bounce-from-a-backup).

## Not the same as splitting stems

[Splitting a song into stems](/docs/split-a-song-into-stems) estimates the parts inside a finished
piece of audio. Bouncing exports your own arrangement from the hardware. If you want your tracks in
a DAW, you want bouncing.

## Related

- [What's inside a bounce](/docs/whats-in-a-bounce)
- [See your Scenes and Songs on a full timeline](/docs/see-scenes-and-songs)
- [Back up and restore your EP](/docs/back-up-and-restore)
