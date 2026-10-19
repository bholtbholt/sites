---
title: Best Friend's App Settings
summary: Theme, Library sort order, the sample cache, audio inputs, the default import folder, and resetting preferences.
section: Getting started
order: 5
question: Where are the settings in Best Friend?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-10-19
---

App Settings holds the app-wide options that mostly work in the background.

## Open App Settings

On iPhone, tap the **Library** tab twice. On iPad and Mac, choose **Settings** in the sidebar.

## Theme

Choose from four themes: **Apple System**, **EP-133**, **EP-1320**, and **EP-40**. By default,
Best Friend uses the theme that matches the EP you connect. Every theme has light, dark, and
high-contrast variants that follow your device.

The themes are purely aesthetic. Nothing else changes.

## List sort order

Set the order of Library items: **Newest**, **Oldest**, **Ascending A–Z**, or **Descending Z–A**.

## Storage and cache

EP samplers move all their data over MIDI SysEx, at a maximum of roughly 31 kB/s. To stay fast and
stable, Best Friend caches everything it reads and works from the cache instead of the hardware.

The cache builds itself whenever Best Friend meets a sample it has not seen. To get the benefit
straight away, build it ahead of time:

- The **project cache** loads only the samples on the current project's pads, and finishes
  quickly.
- The **sample cache** loads every sample on the device. It takes around 10–15 minutes, depending
  on how many samples you have, and can be stopped at any time with no risk or loss.

The cache invalidates itself, but it can occasionally go stale. A waveform that does not update, or
a name that will not change, is likely a caching issue — please email
[bugs@epbf.app](mailto:bugs@epbf.app). If it persists, clear the cache, then rebuild it or let it
rebuild on demand.

Remaining memory on the EP is shown here too.

## Audio inputs

The input used for [real-time capture](/docs/bounce-stems-to-your-daw) and
[recording samples](/docs/record-or-import-a-sample). Every available connection is listed, and your
choice is remembered. Pick your EP explicitly if a capture sounds wrong.

## Default import path

File imports take a bulk selection, and iOS does not let apps remember the folder for one — the
picker opens in its own default every time. Set a starting folder here if that gets in your way.

## Reset preferences

Reset theme, sort order, import path, and the onboarding walkthroughs to their install defaults. Your
Library, samples, and cache are kept.

## Related

- [Search and organise your Library](/docs/library-search-and-organise)
- [Record or import a sample](/docs/record-or-import-a-sample)
- [Fix common problems](/docs/troubleshooting)
