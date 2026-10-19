---
title: Pull one project out of a system backup
summary: Open a full system backup, see only the projects it actually uses, and restore, bounce, or extract any one of them on its own.
section: Backups & bouncing
order: 4
question: Can I restore a single project from an EP-133 system backup?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

A system backup is the whole device. Restoring one to get a single project back means throwing
away everything you have done since. Best Friend opens the container instead.

## Open it

Tap a **system** backup's row. Its trailing affordance is a chevron, not a ▶.

Inside is one list: **All Samples** first, then **only the projects the backup actually uses** —
empty ones are not listed. Each reads like `Project 02 · 12 samples · 4 scenes`.

Opening a large backup is quick, and re-opening it is instant and lands where you left it.

## Restore just that project

Open the project, then tap **Restore** in the top right. Restoring a project offers the nine
targets as large numerals, laid out in the keypad's own order:

```
7  8  9
4  5  6
1  2  3
```

The project's original slot is pre-selected. **Whichever one you tap is the one it overwrites** —
restoring to the wrong slot replaces a different project, with no second prompt.

Only that project and its samples are written; nothing else on the device changes.

## Everything else you can do with it

- **Preview** it — see [hear a backup before you restore it](/docs/preview-a-backup).
- **Bounce** it, with no EP connected — see [bounce from a backup](/docs/bounce-from-a-backup).
- **Rename** it in its card. The name sticks, and an extracted copy takes it.
- **Restore one group**, send samples, or open a pattern as MIDI — see
  [take pieces out without restoring](/docs/back-up-and-restore).

## Extract it as its own backup

Long-press a project inside a system backup and tap **Extract Project**. It is saved to Backups as
its own top-level project backup, named `…_P0N_backup.ppak`, in the source backup's colour.

The extracted file holds only that project and the samples its pads use. It previews, bounces,
shares, and restores like any other `.ppak` — including in Teenage Engineering's own EP Sample
Tool.

Extraction is for organising and sharing. You can restore a project from inside the system backup
without extracting it. Extracting twice makes two copies, and deleting the system backup leaves the
extracted copies in place.

## A backup from a different model

A system backup this EP cannot restore still **opens and browses**. Only Restore is greyed out.

## Related

- [Back up and restore your EP](/docs/back-up-and-restore)
- [Hear a backup before you restore it](/docs/preview-a-backup)
- [Import backups and Bank Snapshots](/docs/import-backups-and-snapshots)
