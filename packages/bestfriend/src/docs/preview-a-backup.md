---
title: Hear a backup before you restore it
summary: Play a rendered take of a project backup straight from the Library, so you restore the right one.
section: Backups & bouncing
order: 3
question: Can I listen to an EP-133 backup before restoring it?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Backups are named and dated, which tells you when you made one and not what is in it. Best Friend
renders a **preview** so you can hear it before you overwrite anything.

## Play one

Tap the **▶** on a project backup's row. It flips to **■**; tap that to stop. When the take
finishes on its own the glyph returns to ▶ without you pressing anything.

The first press shows a short "Preparing preview…" while the take is rendered. After that it is
instant, including across a relaunch, because the rendered audio is cached.

## What you hear

The take is the **busiest scene in the file** — the one most likely to tell you which project this
is. It is rebuilt from the backup's own samples and pad data, so pitch, pan, trim, choke groups,
and reverse all match what the hardware would play.

## The row has two hit targets

- The **▶** plays audio.
- The **body** of the row — icon, title, subtitle — opens Restore, and never sounds anything.

A **system** backup row carries a disclosure chevron instead of a ▶, because it is a container:
open it and preview any of the projects inside. See
[pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup).

## Exceptions

- A backup of a project with **nothing recorded** in it shows a greyed-out ▶. There is nothing to
  play, and you get no error for it.
- A backup from a **different EP model** than the one you have connected still previews. Only
  restoring it is unavailable.
- A backup imported from Teenage Engineering's official EP Sample Tool previews like any other.
- Deleting a backup while its preview is playing silences it.

A preview is built the same way a bounce is, so it is a fair representation of the project —
though a bounce reflects any pad changes you have made on the hardware since.

## Related

- [Back up and restore your EP](/docs/back-up-and-restore)
- [Pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup)
- [Bounce a project from a backup, with no EP connected](/docs/bounce-from-a-backup)
