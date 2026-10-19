---
title: Save and recall a bank with Bank Snapshots
summary: Capture a group's samples and pad settings, load them onto any bank on any EP, and share them as a single file.
section: Backups & bouncing
order: 2
question: How do I save a kit from my EP-133 and load it back later?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

A **Bank Snapshot** captures one group — its twelve pads, their samples, and their settings — saved
under a name you choose. It is the smallest of Best Friend's three backup sizes: build a kit,
snapshot it, and put it back whenever you want, onto another group or even a **different EP**.

## Take a snapshot

1. Select the group on the hardware.
2. In the Library, open **Bank Snapshots** and tap **+**.
3. Name it, pick a colour and icon, then tap **Save**.

The snapshot opens once it is saved, with a waveform for every pad, so you can tell your kits apart
without loading them.

## Load it back

1. Select the group you want to load it onto. **Warning**: it replaces every pad in that group.
2. Open **Bank Snapshots** in the Library.
3. Tap **Load** on the snapshot.

It loads onto any bank, on any device. Samples already on the device are reused rather than sent
twice, and missing ones upload to free slots. If it was not the group you meant, **Undo** restores
the group's pads.

On a device without Supertones, Supertone pads are left empty.

## Edit a snapshot

Tap a snapshot to open it. Changes are saved to the snapshot, not the hardware, until you load it.

- Tap the name to rename it. Tap the icon to change its colour, icon, and notes.
- **Tap** a pad to hear it.
- **Tap an empty pad** to add a sample from a file. See
  [record or import a sample](/docs/record-or-import-a-sample).
- **Double-tap** a pad to open the [sample editor](/docs/sample-editor-and-effects) on that pad's
  own audio and its stored defaults.
- **Drag** pads to swap them, or onto the trash to remove them. **Undo** restores the pad with its
  audio.

### Picking more files than you have pads

Pick a dozen files for three free pads and Best Friend tells you the free-pad count up front rather
than silently truncating your selection — so you can still use **Skip** to step past the ones you
do not want. Files fill the pad you tapped first, then the remaining empties, wrapping round to
pad 1.

When the pads run out the editor closes and a warning banner says how many files did not make it.
Combining several files into one **multi-sample** is exempt, since that is one pad however many
files went into it.

## Build one without the device

With no device connected, **+** starts an empty snapshot. Open it and tap the pads to fill them from
files.

You can also build one from samples already on the EP: on the Samples tab, select up to twelve and
tap the Bank Snapshot button. See [move, share, and delete samples in bulk](/docs/organise-your-samples).
A group inside a backup can be saved as a snapshot too — see
[back up and restore](/docs/back-up-and-restore).

## Share, duplicate, and delete

Long-press a snapshot for **Edit**, **Duplicate**, **Share**, and **Delete**, or, on Apple devices, swipe it to share
or delete.

- **Share** sends a single `<name>.epbank` file — AirDrop it, save it to Files, or upload it to
  [Bank Snapshots](/bank-snapshots) for anyone to download.
- **Duplicate** makes a copy you can change without touching the original.
- **Delete** removes it from the Library. It does not reset the pads on the EP.

`<name>.epbank` files are archives, so you can rename to `<name>.zip` and unzip to access both the
samples and the group's settings.

## Import one

`.epbank` files can be imported in several ways:

- The **import** button in the top right of the Library, then pick the file.
- **Open in Best Friend** from your phone's Files app.
- AirDrop or wireless transfer from another device.

## Related

- [Back up and restore your EP](/docs/back-up-and-restore)
- [Build a multi-sample on the EP-1320 and EP-40](/docs/build-multi-samples)
- [Search and organise your Library](/docs/library-search-and-organise)
