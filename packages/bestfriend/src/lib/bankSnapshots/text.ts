// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0009\u000b-\u001f\u007f]/g;

export function cleanText(value: unknown, max: number, { multiline = false } = {}): string {
	if (typeof value !== 'string') return '';

	let text = value.replace(CONTROL_CHARS, '');
	text = multiline ? text.replace(/\n{3,}/g, '\n\n') : text.replace(/\s+/g, ' ');

	return text.trim().slice(0, max).trim();
}

export function slugify(value: string): string {
	return (
		value
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 60) || 'bank-snapshot'
	);
}
