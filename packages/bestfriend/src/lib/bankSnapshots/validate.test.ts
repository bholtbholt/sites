import { strToU8, zipSync, type Zippable } from 'fflate';
import { describe, expect, it } from 'vitest';
import { EpbankError, validateEpbank } from './validate';

const wav = (bytes = 64) => {
	const data = new Uint8Array(bytes);
	data.set(strToU8('RIFF'), 0);
	data.set(strToU8('WAVE'), 8);
	return data;
};

const snapshotJson = (pads: { name: string; wavFile: string }[], extra = {}) =>
	strToU8(
		JSON.stringify({ version: 1, snapshot: { name: 'Kit', notes: 'Notes', pads, ...extra } }),
	);

const twoPads = [
	{ name: 'kick', wavFile: 'aaaa1111.wav' },
	{ name: 'snare', wavFile: 'bbbb2222.wav' },
];

const bank = (overrides: Zippable = {}) =>
	zipSync({
		'/snapshot.json': snapshotJson(twoPads),
		'/pads/kick-aaaa1111.wav': wav(),
		'/pads/snare-bbbb2222.wav': wav(),
		...overrides,
	});

const expectError = (bytes: Uint8Array, message: RegExp) => {
	expect(() => validateEpbank(bytes)).toThrow(EpbankError);
	expect(() => validateEpbank(bytes)).toThrow(message);
};

describe('validateEpbank', () => {
	it('returns name, notes, and pads in snapshot order', () => {
		const result = validateEpbank(bank());

		expect(result.name).toBe('Kit');
		expect(result.notes).toBe('Notes');
		expect(result.pads.map((pad) => pad.name)).toEqual(['kick', 'snare']);
		expect(result.pads[0].wav.length).toBe(64);
	});

	it('accepts entries without a leading slash and skips directory entries', () => {
		const bytes = zipSync({
			'snapshot.json': snapshotJson(twoPads),
			'pads/': new Uint8Array(0),
			'pads/kick-aaaa1111.wav': wav(),
			'pads/bbbb2222.wav': wav(),
		});

		expect(validateEpbank(bytes).pads).toHaveLength(2);
	});

	it('cleans control characters and caps text', () => {
		const bytes = bank({
			'/snapshot.json': snapshotJson(
				[
					{ name: 'ki\u0000ck', wavFile: 'aaaa1111.wav' },
					{ name: 'snare', wavFile: 'bbbb2222.wav' },
				],
				{ name: `  ${'x'.repeat(100)}  ` },
			),
		});
		const result = validateEpbank(bytes);

		expect(result.name).toHaveLength(60);
		expect(result.pads[0].name).toBe('kick');
	});

	it('rejects files that are not zips', () => {
		expectError(strToU8('hello'), /not a valid/i);
	});

	it('rejects unexpected files', () => {
		expectError(bank({ '/readme.txt': strToU8('hi') }), /unexpected file/i);
		expectError(bank({ '/__MACOSX/pads/._kick.wav': wav() }), /unexpected file/i);
		expectError(bank({ '/pads/../evil.wav': wav() }), /unexpected file/i);
		expectError(bank({ '/pads/nested/kick.wav': wav() }), /unexpected file/i);
	});

	it('rejects a missing snapshot.json', () => {
		expectError(
			zipSync({ '/pads/kick-aaaa1111.wav': wav(), '/pads/snare-bbbb2222.wav': wav() }),
			/one snapshot\.json/i,
		);
	});

	it('rejects invalid JSON', () => {
		expectError(bank({ '/snapshot.json': strToU8('{nope') }), /not valid JSON/i);
	});

	it('rejects too many pads', () => {
		const pads = Array.from({ length: 13 }, (_, i) => ({ name: `p${i}`, wavFile: `p${i}.wav` }));
		const files: Zippable = { '/snapshot.json': snapshotJson(pads) };
		for (const pad of pads) files[`/pads/${pad.wavFile}`] = wav();

		expectError(zipSync(files), /between 1 and 12/i);
	});

	it('rejects extra samples', () => {
		expectError(bank({ '/pads/extra-cccc3333.wav': wav() }), /count does not match/i);
	});

	it('rejects a sample that does not match its pad', () => {
		expectError(
			zipSync({
				'/snapshot.json': snapshotJson(twoPads),
				'/pads/kick-aaaa1111.wav': wav(),
				'/pads/snare-zzzz9999.wav': wav(),
			}),
			/could not match/i,
		);
	});

	it('rejects samples that are not WAVs', () => {
		expectError(bank({ '/pads/kick-aaaa1111.wav': strToU8('not a wav at all') }), /not a WAV/i);
	});

	it('rejects samples that are too large before inflating them', () => {
		expectError(
			bank({ '/pads/kick-aaaa1111.wav': [wav(5 * 1024 * 1024), { level: 9 }] }),
			/too large/i,
		);
	});
});
