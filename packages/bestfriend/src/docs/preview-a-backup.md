---
title: Hear a backup before you restore it
summary: Play a backup, or any scene and pattern inside it, straight from the Library — so you restore the right one.
section: Backups & bouncing
order: 3
question: Can I listen to an EP-133 backup before restoring it?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

Backups are named and dated, which tells you when you made one and not what is in it. Best Friend
renders a **preview** so you can hear it before you overwrite anything. None of it needs the EP
connected.

## From the Backups list

Tap the **▶** on a project backup's row. It flips to **■**; tap that to stop. When the take
finishes on its own the glyph returns to ▶ without you pressing anything.

The first press shows a short "Preparing preview…" while the take is rendered. After that it is
instant, including across a relaunch, because the rendered audio is cached.

The take is the project's **song** when its chain holds one, and otherwise its **busiest scene** —
the one most likely to tell you which project this is.

## Inside a backup

Tap the body of a backup row to open it. Open backups go deeper than the list:

- A **project page** has a card at the top with the whole take's waveform. Tap **Play**, and tap or
  drag on the wave to jump.
- A **scene** has its own card, and every scene and pattern row carries its own **▶**. A scene plays
  all its groups; a pattern plays only its own group.

Only one take sounds at a time. Starting one stops the other.

## What you hear

Every take is rebuilt from the backup's own samples and pad data, so pitch, pan, trim, choke groups,
and reverse all match what the hardware would play.

## The row has two hit targets

- The **▶** plays audio.
- The **body** of the row — icon, title, subtitle — opens the backup, and never sounds anything.

A **system** backup row carries a chevron instead of a ▶, because it is a container: open it and
preview any of the projects inside. See
[pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup).

## Exceptions

- A backup, scene, or pattern with **nothing recorded** shows a greyed-out ▶. There is nothing to
  play, and you get no error for it.
- A backup from a **different EP model** than the one you have connected still previews and opens.
  Only restoring it is unavailable.
- A backup imported from Teenage Engineering's official EP Sample Tool previews like any other.
- Deleting a backup while its preview is playing silences it.

A preview is built the same way a bounce is, so it is a fair representation of the project —
though a bounce from the device reflects any pad changes you have made on the hardware since.

## Related

- [Back up and restore your EP](/docs/back-up-and-restore)
- [Pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup)
- [Bounce a project from a backup, with no EP connected](/docs/bounce-from-a-backup)
