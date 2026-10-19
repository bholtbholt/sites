---
title: Back up and restore your EP-133, EP-40, or EP-1320
summary: Bank Snapshots, Project backups, and full System backups — named, dated, browsable, and restorable in one tap.
section: Backups & bouncing
order: 1
question: How do I back up my EP-133 K.O. II?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Best Friend backs your EP up at three different sizes, depending on how much you want to put
back later. Every backup is **named and dated**, and any of them restores in one tap.

## The three kinds

### 1. Bank Snapshot

A single group's samples and pad settings. Arrange a group the way you want it, snapshot it, and
load it later — onto any bank, even on a **different EP**. Use it for a kit you will want again.

Bank Snapshots function like a kit builder, a feature popular on other samplers but not available
for the EP series natively. See [Bank Snapshots](/docs/bank-snapshots).

### 2. Project backup

The active project: its patterns, pads, and samples. Use it before a set, before a big edit, or
before you start moving samples around in bulk.

### 3. System backup

Every project, sample, and setting on the device. The full safety net. It takes longer and makes a
much larger file.

## Make a backup

1. In the Library, open **Backups** and tap **+**.
2. Choose the current project or **System**.
3. Optionally pick a colour and add notes, then tap **Back Up**.

The backup lands in the Library with a "Backup saved to Library." banner. A backup in progress can
be stopped partway; nothing is saved.

## Browse a backup

Tap a backup to open it — no restore, and no device needed.

- A **System** backup lists **All Samples** and the projects that have something in them.
- A **project** lists its **Samples**, **Scenes**, and **Groups A–D**.
- A **group** lists its **Samples** (its 12 pads) and its patterns.

Tap ▶ on a scene or pattern to hear it, rendered from the backup's own samples. Tap the project's
name at the top to rename it. See [hear a backup before you restore it](/docs/preview-a-backup).

## Restore

Tap **Restore** in the top right of an open backup, or long-press a backup and tap **Restore**.

- **System** erases everything on the device and replaces it with the backup.
- **Project** asks which project to restore to, 1 to 9, then replaces that project.

Backups from different EP models are incompatible: they still open and browse, but Restore is
greyed out.

## Take pieces out without restoring

You do not have to restore a whole backup to get something back:

- **Send samples to the device.** Open **Samples** or **All Samples** and long-press a sample, or
  tap **Select**, pick several, and tap **Send**. The samples open in the
  [sample editor](/docs/sample-editor-and-effects) before they upload.
- **Restore one group.** Open a group's **Samples** and use the menu in the top right.
  **Restore to Group** writes its 12 pads into the device's current group with their trim, pitch,
  volume, and other pad settings; empty pads are cleared, and samples the device already has are
  not sent again. **Save as Bank Snapshot** keeps the group in the Library instead.
- **Open a pattern as MIDI.** Tap a pattern to open it as a
  [MIDI pattern](/docs/import-midi-patterns), its drum lanes already mapped to pads.
- **Extract one project** from a System backup — see
  [pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup).
- **Bounce** a project straight from the backup — see
  [bounce from a backup](/docs/bounce-from-a-backup).

A pad marked with a warning uses a sample the backup does not carry, such as an internal factory
sample or a Supertone. It is restored only if that slot has a sample on the device.

## Where backups live

Backups sit in the Library alongside your bounces. On Apple devices, **iCloud keeps everything in
sync** across your iPhone, iPad, and Mac — take a backup on your phone, restore it from your Mac.
See [sync your Library](/docs/icloud-sync).

Android backups are stored on the device. Google Play and the App Store are separate purchases and
separate storage; there is no sync between the two ecosystems.

## Importing existing backups

Projects and Systems exported from Teenage Engineering's official EP Sample Tool can be imported
into Best Friend. Tap the import button in the top right of the Library.

## Related

- [Save and recall a bank with Bank Snapshots](/docs/bank-snapshots)
- [Hear a backup before you restore it](/docs/preview-a-backup)
- [Pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup)
- [Import backups and Bank Snapshots](/docs/import-backups-and-snapshots)
- [Sync your Library across your Apple devices](/docs/icloud-sync)
