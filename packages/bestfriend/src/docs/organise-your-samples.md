---
title: Move, share, and delete samples in bulk
summary: Select mode, drag-to-move, swipe-to-delete, bulk share, and an undo for all of it.
section: Samples
order: 8
question: How do I delete or rearrange samples on my EP-133?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

The Samples list is every slot on your EP, with a waveform, name, and length for each. It is
also where you reorganise the device rather than the app — everything here writes straight to
the hardware, and every destructive action has an **Undo**.

## Select mode

Turn on select mode and pick as many slots as you like. The action bar then works on all of
them at once:

- **Delete** — every slot goes in a _single_ undo group, so one Undo brings all of them back.
- **Share** — hands you one WAV per selected slot. Slots that are not cached locally download
  first, behind a progress HUD, then the share sheet opens.

## Move a selection to new slots

With two or more slots selected, long-press one of them and drag onto an empty slot. The drop
highlight lights the slots it is about to fill — in the accent colour if the selection fits
from there, in the danger colour if it does not — and the rows relocate on release.

## Delete one slot

Swipe a row left and choose Delete. An undo banner appears; tapping Undo re-uploads the slot
and confirms the device took it, so the slot is audible again exactly as it was.

## Load a sample to the active pad

Long-press any row and choose **Load**. The badge on the menu item names the pad it will land
on, using the hardware's own bank and key — `A7`, for instance. The EP reassigns that pad and
loads the sample's own defaults with it: envelope, Pitch, Pan, and Play Mode.

Undo restores both the previous sample **and** its previous settings, so trying a sound on a
pad is not a decision you have to commit to.

## Search

You can search for any sample name.

## Related

- [Get samples onto your EP in bulk](/docs/upload-samples-in-bulk)
- [Fit more samples on your EP when it runs out of space](/docs/fit-more-samples-on-your-ep)
- [Search and organise your Library](/docs/library-search-and-organise)
