import { site } from './site';

export type FaqItem = { q: string; a: string };

export const faq: readonly FaqItem[] = [
	{
		q: `What is ${site.name}?`,
		a: `${site.name} is a MIDI controller and chord generator for iPhone and iPad. Hold a chord button and touch a root key, and it sends the full chord — or an arpeggio of it — to any synth, app, or DAW that takes MIDI.`,
	},
	{
		q: `Does ${site.name} make any sound?`,
		a: `No. ${site.name} sends MIDI only. Pair it with a hardware synth, an instrument app such as GarageBand, or a DAW on your Mac.`,
	},
	{
		q: 'What can it control?',
		a: `Anything that receives MIDI: hardware connected by cable, other music apps on the same device, and DAWs on a Mac. It sends to every connected destination by default, or only the ones you choose, and it also shows up in other apps as a MIDI source called ${site.name}.`,
	},
	{
		q: 'How do I use it with Logic Pro, Ableton Live, or FL Studio?',
		a: 'Connect your iPhone or iPad to the Mac with a cable, open Audio MIDI Setup, choose Window > Show Audio Devices, select your device, and click Enable. Your DAW then lists a MIDI port named after your iPhone or iPad. The DAW guide covers each DAW step by step, including sending clock back for the arpeggiator.',
	},
	{
		q: 'Why is the arpeggiator silent?',
		a: `The arpeggiator needs a MIDI clock. Set the clock to External and press play in your DAW, or set it to Internal and pick a tempo. The toolbar reads No clock when none is arriving. Chords and single notes never need a clock.`,
	},
	{
		q: 'Does it work with GarageBand?',
		a: `Yes. On iPad, open ${site.name} in Split View beside GarageBand — no cable needed. On a Mac, GarageBand hears it as soon as the device is enabled in Audio MIDI Setup. GarageBand doesn't send MIDI clock, so set ${site.name}'s clock to Internal and match the song's tempo to arpeggiate.`,
	},
	{
		q: 'Can I play it from a computer keyboard?',
		a: "Yes. With a keyboard connected to your iPhone or iPad, the keys follow Logic Pro's Musical Typing layout: A through ' play notes, Shift and Option pick inversions, 7–0 choose chords, 1–4 add extensions, Z and X change octave, and Space toggles the arpeggiator.",
	},
	{
		q: `How is it related to ${site.bestFriendName}?`,
		a: `${site.name} is extracted from ${site.bestFriendName}, the companion app for Teenage Engineering EP-Series samplers, as a standalone MIDI controller. Same developer, same keyboard.`,
	},
	{
		q: 'What does it cost?',
		a: `$${site.price} ${site.priceCurrency}, once. One purchase covers iPhone and iPad. No subscription, no in-app purchases, no ads. Requires iOS or iPadOS ${site.minOs} or later.`,
	},
] as const;
