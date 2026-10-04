import { unzipSync, type UnzipFileInfo } from 'fflate';
import {
	MAX_BANK_BYTES,
	MAX_JSON_BYTES,
	MAX_NAME_LENGTH,
	MAX_NOTES_LENGTH,
	MAX_PAD_NAME_LENGTH,
	MAX_PADS,
	MAX_UNCOMPRESSED_BYTES,
	MAX_WAV_BYTES,
} from './constants';
import { cleanText } from './text';

export class EpbankError extends Error {}

export type ValidatedPad = { name: string; wav: Uint8Array };
export type ValidatedBank = { name: string; notes: string; pads: ValidatedPad[] };

const JSON_ENTRY = 'snapshot.json';
const WAV_ENTRY = /^pads\/[\w.-]+\.wav$/i;
const WAV_FILE = /^[\w.-]+\.wav$/i;

// Best Friend writes entries with a leading slash ("/snapshot.json").
const entryName = (name: string) => name.replace(/^\/+/, '');

const isDirectory = (name: string) => name.endsWith('/');

function isWav(bytes: Uint8Array): boolean {
	const ascii = (start: number) => String.fromCharCode(...bytes.subarray(start, start + 4));
	return bytes.length >= 12 && ascii(0) === 'RIFF' && ascii(8) === 'WAVE';
}

function unzip(bytes: Uint8Array) {
	let total = 0;
	let jsonCount = 0;

	const filter = (file: UnzipFileInfo) => {
		const name = entryName(file.name);
		if (isDirectory(name) && file.originalSize === 0) return false;

		if (name === JSON_ENTRY) {
			jsonCount++;
			if (file.originalSize > MAX_JSON_BYTES) throw new EpbankError('snapshot.json is too large.');
		} else if (WAV_ENTRY.test(name)) {
			if (file.originalSize > MAX_WAV_BYTES) throw new EpbankError(`${name} is too large.`);
		} else {
			throw new EpbankError(`Unexpected file in archive: ${name}`);
		}

		total += file.originalSize;
		if (total > MAX_UNCOMPRESSED_BYTES) throw new EpbankError('Archive is too large.');

		return true;
	};

	let files: Record<string, Uint8Array>;
	try {
		files = unzipSync(bytes, { filter });
	} catch (error) {
		if (error instanceof EpbankError) throw error;
		throw new EpbankError('Not a valid .epbank file.');
	}

	if (jsonCount !== 1) throw new EpbankError('Archive must contain one snapshot.json.');

	return Object.fromEntries(Object.entries(files).map(([name, data]) => [entryName(name), data]));
}

type RawPad = { name?: unknown; wavFile?: unknown };

function parseSnapshot(bytes: Uint8Array) {
	let json: unknown;
	try {
		json = JSON.parse(new TextDecoder().decode(bytes));
	} catch {
		throw new EpbankError('snapshot.json is not valid JSON.');
	}

	const snapshot = (json as { snapshot?: unknown } | null)?.snapshot as
		{ name?: unknown; notes?: unknown; pads?: unknown } | undefined;

	if (!snapshot || typeof snapshot !== 'object' || !Array.isArray(snapshot.pads)) {
		throw new EpbankError('snapshot.json is missing its pads.');
	}

	const pads = snapshot.pads as RawPad[];
	if (pads.length < 1 || pads.length > MAX_PADS) {
		throw new EpbankError(`A snapshot must have between 1 and ${MAX_PADS} pads.`);
	}

	for (const pad of pads) {
		if (!pad || typeof pad.wavFile !== 'string' || !WAV_FILE.test(pad.wavFile)) {
			throw new EpbankError('snapshot.json has a pad without a valid sample.');
		}
	}

	return {
		name: cleanText(snapshot.name, MAX_NAME_LENGTH) || 'Untitled snapshot',
		notes: cleanText(snapshot.notes, MAX_NOTES_LENGTH, { multiline: true }),
		pads: pads as { name?: unknown; wavFile: string }[],
	};
}

export function validateEpbank(bytes: Uint8Array): ValidatedBank {
	if (bytes.length > MAX_BANK_BYTES) throw new EpbankError('File is larger than 36MB.');

	const files = unzip(bytes);
	const snapshot = parseSnapshot(files[JSON_ENTRY]);

	const wavEntries = Object.keys(files).filter((name) => name !== JSON_ENTRY);
	if (wavEntries.length !== snapshot.pads.length) {
		throw new EpbankError('Sample count does not match the pads in snapshot.json.');
	}

	const used = new Set<string>();
	const pads = snapshot.pads.map((pad) => {
		// The archive names samples "<pad-name>-<wavFile>", the JSON only stores "<wavFile>".
		const matches = wavEntries.filter((name) => {
			const base = name.slice('pads/'.length);
			return base === pad.wavFile || base.endsWith(`-${pad.wavFile}`);
		});
		if (matches.length !== 1 || used.has(matches[0])) {
			throw new EpbankError(`Could not match sample ${pad.wavFile}.`);
		}
		used.add(matches[0]);

		const wav = files[matches[0]];
		if (!isWav(wav)) throw new EpbankError(`${matches[0]} is not a WAV file.`);

		return { name: cleanText(pad.name, MAX_PAD_NAME_LENGTH) || 'Untitled', wav };
	});

	return { name: snapshot.name, notes: snapshot.notes, pads };
}
