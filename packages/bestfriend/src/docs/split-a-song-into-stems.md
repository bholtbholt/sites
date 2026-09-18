---
title: Split a song into drums, bass, vocals, and instruments
summary: Pull isolated parts out of any sample, remix the levels, and send just the part you want to a pad.
section: Samples
order: 7
question: Can I split a song into stems for my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Any sample in Best Friend can be split into its parts: **drums, bass, vocals, guitar, and
instruments**. From there you can remix the levels between them, mute a part entirely, or
send a single isolated part to a pad.

Take the drum break without the horns over it, or the vocal without the beat under it.

## Split one

Open a sample, go to the **Split Stems** tab, and tap **Split stems**. The separation model
ships inside the app: nothing to install, and it runs **on your device** — no upload, no account.

A single progress bar takes you through it: _Loading model…_, _Processing audio…_, _Splitting
stems…_. A fifteen-second section takes tens of seconds, not minutes.

There is **no cancel**, by design. The progress bar holds the screen until it finishes; leaving
the screen abandons the split.

## It splits your crop, not the whole file

Best Friend separates **the trim you have set**, not the whole import. Trimming fifteen seconds
out of a five-minute track and splitting that is quick; splitting the whole track would not be.

- **Nudging the crop a few seconds** either way, or shrinking it, costs nothing: no re-split, the
  faders stay live, the mix is unchanged.
- **Moving the crop well outside** the section you split greys the faders and puts **Split stems**
  back. Your fader positions are kept behind it, so the re-split comes back with the mix you had
  rather than resetting to unity.
- **Structural changes never cost a re-split**: stereo to mono, mono to stereo, repitch, fidelity,
  and EQ moves all leave the stems intact.

## The mix

Each part gets a fader. Double-tap one to send it back to 100.

If you leave **every** fader at unity, Best Friend bypasses the mixdown entirely and uploads bytes
identical to an unsplit upload — so an accidental split costs you nothing in quality.

Stems are **session-scoped**. Dismiss the editor and they are gone, along with their temporary
files; re-opening the same sample offers **Split stems** again. Nothing accumulates on your device.

## How it fits the workflow

1. Get the source audio into Best Friend — import from Files, or pull the audio straight out
   of a video. See [Get samples onto your EP in bulk](/docs/upload-samples-in-bulk).
2. Trim to the section you actually want.
3. Split it into stems.
4. Remix the levels or mute the parts you do not want.
5. Edit the result — crop, normalize, repitch — and send it to a pad.

You can keep the preview playing through all of it. Splitting, muting a part, and moving a fader
all happen under the playhead without stopping playback.

## Splitting is not bouncing

Two different features:

- **Splitting stems** (this page) separates parts out of a finished piece of audio. It is an
  estimate of what was in the mix.
- **[Bouncing stems](/docs/bounce-stems-to-your-daw)** exports your own arrangement off the
  hardware. Every pad that plays comes out isolated from the real samples and pad data — not
  separation, the actual source audio. Those stems are exact.

If you want your own tracks out of your EP and into a DAW, you want bouncing.

## Related

- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Every effect in the sample editor](/docs/sample-effects-reference)
- [Bounce multi-track stems into your DAW](/docs/bounce-stems-to-your-daw)
