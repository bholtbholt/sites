import { error } from '@sveltejs/kit';
import { slugify } from '$lib/bankSnapshots/text';
import { bankKey } from '$lib/server/bankSnapshots';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ params, platform, url }) => {
	if (!platform) error(503, 'Downloads are unavailable right now.');
	const { BANKS, DB } = platform.env;

	const row = await DB.prepare('SELECT name FROM snapshots WHERE id = ?')
		.bind(params.id)
		.first<{ name: string }>();
	if (!row) error(404, 'Snapshot not found.');

	const object = await BANKS.get(bankKey(params.id));
	if (!object) error(404, 'Snapshot not found.');

	platform.context.waitUntil(
		DB.prepare('UPDATE snapshots SET download_count = download_count + 1 WHERE id = ?')
			.bind(params.id)
			.run(),
	);

	// Same bytes either way; .epbank is a zip with a different extension.
	const zip = url.searchParams.get('format') === 'zip';

	return new Response(object.body as unknown as ReadableStream, {
		headers: {
			'Content-Type': zip ? 'application/zip' : 'application/octet-stream',
			'Content-Length': String(object.size),
			'Content-Disposition': `attachment; filename="${slugify(row.name)}.${zip ? 'zip' : 'epbank'}"`,
			'Cache-Control': 'no-store',
		},
	});
};
