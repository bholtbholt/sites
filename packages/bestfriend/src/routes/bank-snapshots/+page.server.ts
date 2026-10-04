import { error, fail } from '@sveltejs/kit';
import {
	GLOBAL_UPLOADS_PER_DAY,
	IP_UPLOADS_PER_HOUR,
	MAX_AUTHOR_LENGTH,
	MAX_BANK_BYTES,
} from '$lib/bankSnapshots/constants';
import { cleanText } from '$lib/bankSnapshots/text';
import { EpbankError, validateEpbank } from '$lib/bankSnapshots/validate';
import {
	bankKey,
	hashIp,
	isTag,
	listSnapshots,
	newId,
	padKey,
	recentUploads,
	verifyTurnstile,
} from '$lib/server/bankSnapshots';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ platform, url }) => {
	if (!platform) error(503, 'Bank Snapshots are unavailable right now.');

	const sort = url.searchParams.get('sort') === 'popular' ? 'popular' : 'new';
	const tagParam = url.searchParams.get('tag');
	const tag = isTag(tagParam) ? tagParam : null;
	const page = Math.max(1, Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1);

	const { snapshots, hasMore } = await listSnapshots(platform.env.DB, { sort, tag, page });

	return { snapshots, hasMore, sort, tag, page };
};

export const actions: Actions = {
	upload: async ({ request, platform, getClientAddress }) => {
		if (!platform) return fail(503, { error: 'Uploads are unavailable right now.' });
		const { BANKS, DB, TURNSTILE_SECRET } = platform.env;

		// Reject oversized bodies before buffering them; the multipart wrapper adds a little.
		const contentLength = Number(request.headers.get('content-length') ?? 0);
		if (contentLength > MAX_BANK_BYTES + 64 * 1024) {
			return fail(413, { error: 'File is larger than 36MB.' });
		}

		const form = await request.formData();
		const ip = getClientAddress();

		const token = form.get('cf-turnstile-response');
		if (!(await verifyTurnstile(TURNSTILE_SECRET, typeof token === 'string' ? token : '', ip))) {
			return fail(400, { error: 'Could not verify you are human. Please try again.' });
		}

		const now = Date.now();
		const ipHash = await hashIp(ip, TURNSTILE_SECRET);
		const uploads = await recentUploads(DB, ipHash, now);
		if (uploads.ip >= IP_UPLOADS_PER_HOUR) {
			return fail(429, { error: 'Too many uploads. Please try again in an hour.' });
		}
		if (uploads.total >= GLOBAL_UPLOADS_PER_DAY) {
			return fail(429, { error: 'Uploads are paused for today. Please try again tomorrow.' });
		}

		const file = form.get('file');
		if (!(file instanceof File) || !file.name.toLowerCase().endsWith('.epbank')) {
			return fail(400, { error: 'Choose a .epbank file exported from Best Friend.' });
		}
		if (file.size > MAX_BANK_BYTES) return fail(413, { error: 'File is larger than 36MB.' });

		const bytes = new Uint8Array(await file.arrayBuffer());
		let bank;
		try {
			bank = validateEpbank(bytes);
		} catch (err) {
			if (err instanceof EpbankError) return fail(400, { error: err.message });
			throw err;
		}

		const author = cleanText(form.get('author'), MAX_AUTHOR_LENGTH);
		const tags = [...new Set(form.getAll('tags'))].filter(isTag);
		const id = newId();

		await Promise.all([
			BANKS.put(bankKey(id), bytes, {
				httpMetadata: { contentType: 'application/octet-stream' },
			}),
			...bank.pads.map((pad, index) =>
				BANKS.put(padKey(id, index), pad.wav, { httpMetadata: { contentType: 'audio/wav' } }),
			),
		]);

		// Written last: if R2 fails there is no row, so partial uploads stay invisible.
		await DB.prepare(
			`INSERT INTO snapshots (id, name, notes, author, tags, pads, ip_hash, created_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		)
			.bind(
				id,
				bank.name,
				bank.notes,
				author,
				JSON.stringify(tags),
				JSON.stringify(bank.pads.map((pad) => ({ name: pad.name }))),
				ipHash,
				now,
			)
			.run();

		return { uploaded: bank.name };
	},
};
