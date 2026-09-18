---
title: Fit more samples on your EP when it runs out of space
summary: Repitch, sample rate, and mono conversion shrink a file before it is uploaded — and deleting slots frees space for a retry.
section: Samples
order: 5
question: My EP-133 is full — how do I fit more samples on it?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

The EP has a fixed amount of sample memory, and a long stereo file eats a lot of it. Best
Friend gives you four ways to make a sample smaller **before** it goes on the device, all of
them audible live while the preview plays.

Reductions stack: a 100 kB hi-fi stereo sample becomes a 50 kB mono sample, then a 12.5 kB
lo-fi sample, then a 6 kB repitched one. Stacked that far, the audio is audibly different in
most cases.

## Crop first

The cheapest saving is the audio you were never going to trigger. Drag the trim handles to
the part you actually want and **permanently crop** it — the upload carries only the crop, not
the whole file. On a song-length import this is usually the difference between one slot and
ten.

## Repitch

Repitch drops the sample an octave and plays it back correspondingly slower, which halves the
data. Pitch it back up on the pad to get the sound back, grainier.

## Sample rate

Lowering the sample rate cuts the file proportionally. The editor's fidelity control moves
between the settings audibly, so you can hear exactly how far you can push a given sound
before it stops being the sound you wanted. A hi-hat survives far more of this than a pad
chord does.

Re-opening a sample you have already uploaded floors the rate at the rate of the audio on the
device — fidelity the upload discarded is gone.

## Stereo to mono

Collapsing a stereo file to mono halves it. For most one-shots — kicks, snares, bass notes —
the stereo image was never doing anything for you. Keep stereo for room recordings, wide pads,
and anything with a deliberate left-right move.

You can also take just the **left** or just the **right** channel rather than summing them,
which is occasionally the better-sounding option on a mid-side recording.

## When the device is already full

An upload to a full device fails with a clear error rather than wedging — the app stays
responsive and the EP takes no harm. Delete some slots and the retry succeeds:

1. Open **Samples**.
2. Turn on select mode and pick the slots you no longer want.
3. Delete them. If you change your mind, **Undo** restores every slot in one go.

## Related

- [Crop, normalize, repitch, and add effects to a sample](/docs/sample-editor-and-effects)
- [Move, share, and delete samples in bulk](/docs/organise-your-samples)
- [Get samples onto your EP in bulk](/docs/upload-samples-in-bulk)
