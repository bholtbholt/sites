const MB = 1024 * 1024;

export const MAX_BANK_BYTES = 36 * MB;
// Declared sizes from the zip directory, checked before anything is inflated.
export const MAX_UNCOMPRESSED_BYTES = 48 * MB;
// 20s × 46875Hz × 2ch × 16-bit ≈ 3.75MB, plus header room.
export const MAX_WAV_BYTES = 4 * MB;
export const MAX_JSON_BYTES = 64 * 1024;
export const MAX_PADS = 12;

export const MAX_NAME_LENGTH = 60;
export const MAX_NOTES_LENGTH = 500;
export const MAX_AUTHOR_LENGTH = 40;
export const MAX_PAD_NAME_LENGTH = 60;

export const TAGS = [
	'drums',
	'bass',
	'keys',
	'synth',
	'vocals',
	'guitars',
	'strings',
	'horns',
	'fx',
	'other',
] as const;

export type Tag = (typeof TAGS)[number];

export const IP_UPLOADS_PER_HOUR = 10;
// Circuit breaker against distributed spam filling the bucket.
export const GLOBAL_UPLOADS_PER_DAY = 200;

export const PAGE_SIZE = 24;
