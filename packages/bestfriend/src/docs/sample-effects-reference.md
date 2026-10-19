---
title: Every effect in the sample editor, and what each control does
summary: A reference for the EQ, compressor, distortion, modulation, and space effects, with the range and default of every control.
section: Samples
order: 3
question: What effects does Best Friend have for EP-133 samples?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Effects in Best Friend are **baked into the sample** before it is uploaded, so the EP plays
the processed audio and spends none of its own resources on it. Everything here is audible
live: the preview follows each control while it is playing, with no restart.

Every fader and knob **resets on a double-tap**, and with VoiceOver on, each one exposes a
Reset action in the rotor. The one exception is the delay's Time / Repeats pad — see below.

## EQ

A low shelf, a mid band, and a high shelf, each with frequency and gain. Select a node and drag
up or down to change it.

| Control    | Range                                       |
| ---------- | ------------------------------------------- |
| Low Shelf  | ±12 dB gain                                 |
| High Pass  | At -6 dB, the Low Shelf becomes a High Pass |
| Parametric | ±12 dB gain                                 |
| High Shelf | ±12 dB gain                                 |
| Low Pass   | At -6 dB, the High Shelf becomes a Low Pass |

## Compressor

| Control | Range                                  | Default   |
| ------- | -------------------------------------- | --------- |
| Input   | Off to 40 dB input gain                | Off       |
| Attack  | `0.10 ms` – `10.00 ms`, in `0.1` steps | `0.20 ms` |
| Release | `40 ms` – `1000 ms`, in `20 ms` steps  | `200 ms`  |
| Ratio   | 2, 4, 8, 20                            | 4         |

Increase the Input to set the threshold and output volume. The defaults are a good start for punchy
drums.

## Grit (Distortion and Saturation)

Increase the Gain to turn it on, and shape it with the Tone fader.

| Control | Range                                  | Default |
| ------- | -------------------------------------- | ------- |
| Gain    | Off to 50                              | Off     |
| Tone    | ±50 high pass / low pass               | `0`     |
| Type    | Tube, Tape, Analog, Radio, Vinyl, Fuzz | Tube    |

## Mod

| Control | Type   | Range                       | Default |
| ------- | ------ | --------------------------- | ------- |
| Octaver | Blend  | ±50 Octave down / octave up | `0`     |
| Phaser  | Blend  | Off to 50                   | Off     |
| Chorus  | Toggle | I, II, Both                 | Off     |
| Tremolo | Depth  | Off to full                 | Off     |
|         | Rate   | 0.63 Hz to 14 Hz            | `38`    |

- **Octaver** blends in a pitched copy: up adds an octave up, down adds an octave down, and the
  middle is off.
- **Phaser** is inspired by the EHX Small Stone. Slide up to increase the blend.
- **Chorus** is Juno-inspired. Toggle I for a little, II for more, or both for a lot.

## Space

| Control | Type    | Range           | Default |
| ------- | ------- | --------------- | ------- |
| Delay   | Blend   | Off to 100% wet | Off     |
|         | Time    | 60ms to 600ms   | 400ms   |
|         | Repeats | 0-100%          | 30%     |
| Reverb  | Blend   | Off to 100% wet | Off     |

Time and Repeats share one XY pad, and it is the only control in the editor with **no
double-tap reset** — set it by hand.

Delay and Reverb are 50/50 dry/wet at 40.

## How effects interact with the envelope

The EP applies its own pad envelope _after_ your baked effects. Pulling the release down
**fades the reverb tail with it**. At the default maximum release, a reverb tail rings on past
the end of the clip instead of being cut. It is not possible to change this.

## Editing a sample twice

Effects are baked, so a second pass **compounds the first** — re-opening an already-processed
sample and adding more EQ stacks on top of the EQ that is already in the audio. If you want a
different treatment rather than more of the same one, start from the original file.

## Related

- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Split a song into drums, bass, vocals, and instruments](/docs/split-a-song-into-stems)
- [Fit more samples on your EP](/docs/fit-more-samples-on-your-ep)
