---
title: Bounce a project from a backup, with no EP connected
summary: Any project backup can be bounced to stems offline — the samples and pad data are already in the file.
section: Backups & bouncing
order: 7
question: Can I bounce stems from an EP-133 backup without the device?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Best Friend rebuilds a scene or song from the project data and the samples, which means a
**backup** already contains everything a bounce needs. You do not have to restore it first.

## Bounce one

1. Open the Library's **Backups** page.
2. Long-press a **project** backup and choose **Bounce**.
3. Walk the wizard through to a finished bounce.

The wizard opens on that backup's own project: its scenes, its pad names, first scene selected.
**Change** picks any other scene the backup holds, or the whole **Song**.

No device reads happen at any point — the samples come out of the backup file.

## It does not have to be the project you are on

The project loaded on your EP is irrelevant. Bounce a project you replaced weeks ago without
restoring it first, and without losing what is on the device now.

## Projects inside a system backup

A **system** backup itself offers Restore but not Bounce — it is a container, not a project. Open
it and the projects revealed inside each offer Bounce, exactly like an imported `.ppak`. See
[pull one project out of a system backup](/docs/extract-a-project-from-a-system-backup).

## The extras still work

Turn on **Samples** and **MIDI** in the wizard's extras and both land in the zip. The samples
exported are the backup's own WAVs, with their metadata intact. See
[what's inside a bounce](/docs/whats-in-a-bounce).

## Where it lands

In the Library's **Bounces** page, tagged with the backup's project number, alongside bounces you
made from the device.

## Backups from the official EP Sample Tool

A `.pak` or `.ppak` exported from Teenage Engineering's EP Sample Tool bounces the same way, once
imported.

## Related

- [Bounce multi-track stems into Ableton, Logic, or FL Studio](/docs/bounce-stems-to-your-daw)
- [What's inside a bounce](/docs/whats-in-a-bounce)
- [Back up and restore your EP](/docs/back-up-and-restore)
