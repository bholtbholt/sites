---
title: Pull one project out of a system backup
summary: Open a full system backup, see only the projects it actually uses, and restore, bounce, or share any one of them on its own.
section: Backups & bouncing
order: 4
question: Can I restore a single project from an EP-133 system backup?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

A system backup is the whole device. Restoring one to get a single project back means throwing
away everything you have done since. Best Friend opens the container instead.

## Open it

Tap a **system** backup's row. The trailing affordance is a chevron, not a Restore button, and the
row body toggles it open.

Inside you see **only the projects the backup actually uses** — empty ones are not listed. Each is
titled `Project <n>` with its own lit cell in the grid icon, drawn exactly like a top-level project
backup, and takes the parent's colour until you give it one of its own.

The first open shows a brief "Opening backup…". Closing and re-opening is instant, and adds no
duplicate rows.

## What you can do with a revealed project

Everything you can do with a project backup you imported directly:

- **Preview** it — see [hear a backup before you restore it](/docs/preview-a-backup).
- **Restore** it to any of the nine project slots.
- **Bounce** it, with no EP connected — see
  [bounce from a backup](/docs/bounce-from-a-backup).
- **Edit** its note and colour.
- **Share** it out as a `.ppak`, which Teenage Engineering's own EP Sample Tool can open.
- **Delete** it, like any other row.

The long-press menu reads Restore, Share, Bounce, Edit, Delete, with the first three as large icon
buttons.

## Restoring to a chosen slot

Restoring a project offers the nine targets as large numerals, laid out in the keypad's own order:

```
7  8  9
4  5  6
1  2  3
```

The project's original slot is pre-selected. **Whichever one you tap is the one it overwrites** —
restoring to the wrong slot replaces a different project, with no second prompt.

## Deleting and restoring rows

- Deleting the parent system backup takes its revealed projects with it, and one **Undo** puts the
  whole group back, still nested.
- An opened system row also offers **Restore Deleted Projects**, which brings back only what is
  missing — never a duplicate of one that is already there.

## Searching

A search lists matching projects flat, with no parent row above them, so you can find a project
inside a system backup you have not opened.

## A backup from a different model

A system backup this EP cannot restore still **opens and browses**. Its subtitle keeps the type,
model, size, and date and appends "Incompatible", and only Restore is greyed out.

## Related

- [Back up and restore your EP](/docs/back-up-and-restore)
- [Hear a backup before you restore it](/docs/preview-a-backup)
- [Import backups and Bank Snapshots](/docs/import-backups-and-snapshots)
