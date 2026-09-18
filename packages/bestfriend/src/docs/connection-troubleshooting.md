---
title: Your EP isn't showing up in Best Friend — what to check
summary: Work through these in order; the overwhelming majority of connection problems are the cable.
section: Getting started
order: 3
question: Why won't my EP-133 connect to Best Friend?
devices: [ep-133, ep-40, ep-1320]
updated: 2026-09-17
---

Best Friend needs a wired data connection to your EP-133 K.O. II, EP-40 Riddim, or EP-1320
Medieval. When it cannot see the hardware, one of the links in that chain is broken. Work
through these in order — they are sorted by how often each one turns out to be the cause.

## 1. Swap the cable

Most often the cause. A **charge-only** USB-C cable powers the EP while carrying no data, so
the hardware looks healthy and the app sees nothing.

Try a cable you know carries data — the one that came with a phone, a laptop, or an external
drive. See [Which USB-C cable and adapter you need](/docs/cables-and-adapters) for how to
tell them apart.

## 2. Remove hubs, docks, and extensions

Connect the EP directly to your device. If it works, the hub was the problem.

## 3. Check the adapter, on a Lightning device

On a Lightning iPhone or iPad, you need an **MFi-certified** Lightning to USB adapter and a
**USB-IF certified** USB-A to USB-C cable. Uncertified adapters fail intermittently, which is
worse than failing outright because it looks like an app bug.

USB-C to Lightning cables **DO NOT work**, including the one bundled with Lightning iPhones.

## 4. Check USB OTG, on Android

Your Android device needs USB OTG support to host the connection. Without it the EP charges
but never appears. Most Android devices from the last several years have OTG; a few budget
models do not.

## 5. Check your OS version

Best Friend requires iOS 26, iPadOS 26, or macOS 26 or later, or Android 12 or later. On the
Mac it requires Apple silicon (M1 or later).

## 6. Power-cycle the EP

Turn the EP off and on again with the cable connected, then reopen Best Friend.

## 7. Check the firmware

Keep your EP on the latest firmware — you may need to [update your EP](https://teenage.engineering/apps/update).

## Still stuck?

Email [bugs@epbf.app](mailto:bugs@epbf.app) with your device, your OS version, which EP you
have, and the cable and adapter you are using. Those four details resolve most reports
immediately.
