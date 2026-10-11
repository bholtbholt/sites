---
title: Connecting to a Mac
summary: 'Connect your iPhone or iPad to a Mac with a cable and turn on Inter-Device Audio and MIDI.'
section: connecting
order: 70
---

Play and record Mother MIDI in a DAW on your Mac. Mother MIDI sends notes to the DAW, and the DAW sends back MIDI clock to run the arpeggiator.

A cable alone isn't enough. The Mac only sees your iPhone or iPad as a MIDI device once you turn on Inter-Device Audio and MIDI.

1. Connect your iPhone or iPad to the Mac with a cable. Unlock it, and tap **Trust** if asked.
2. Open Mother MIDI.
3. On the Mac, open **Audio MIDI Setup** and choose **Window > Show Audio Devices**.
4. Select your iPhone or iPad in the list and click **Enable**.

Your DAW now lists a MIDI port named after your iPhone or iPad, such as "Brian's iPhone". It doesn't say "Mother MIDI".

On the iPhone or iPad, Mother MIDI picks up the new connection by itself as long as **All destinations** is on. If you've chosen destinations by hand, open Settings, choose the MIDI tab, and turn on **IDAM MIDI Host**.

The connection drops when the cable comes out or the Mac restarts. Click **Enable** again to reconnect. If the port appears in Audio MIDI Setup but not in your DAW, restart the DAW.
