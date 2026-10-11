const table = [
	[10, 'X'],
	[9, 'IX'],
	[5, 'V'],
	[4, 'IV'],
	[1, 'I'],
] as const;

/** Section marks only ever count a handful of bands, so this stops at the tens. */
export function roman(value: number): string {
	let rest = value;
	let out = '';
	for (const [n, glyph] of table) {
		while (rest >= n) {
			out += glyph;
			rest -= n;
		}
	}
	return out;
}
