import { error } from '@sveltejs/kit';
import type { Headers as WorkerHeaders } from '@cloudflare/workers-types';
import { MAX_PADS } from '$lib/bankSnapshots/constants';
import { padKey } from '$lib/server/bankSnapshots';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ params, platform, request }) => {
	if (!platform) error(503, 'Previews are unavailable right now.');

	const index = Number(params.index);
	if (!Number.isInteger(index) || index < 0 || index >= MAX_PADS) error(404, 'Pad not found.');

	// Safari won't play <audio> unless Range requests get a 206.
	const object = await platform.env.BANKS.get(padKey(params.id, index), {
		range: request.headers as unknown as WorkerHeaders,
	});
	if (!object || !('body' in object)) error(404, 'Pad not found.');

	const headers = new Headers({
		'Content-Type': 'audio/wav',
		'Accept-Ranges': 'bytes',
		'Cache-Control': 'public, max-age=31536000, immutable',
	});

	const range = object.range as { offset?: number; length?: number; suffix?: number } | undefined;
	if (request.headers.has('range') && range) {
		const offset = range.suffix !== undefined ? object.size - range.suffix : (range.offset ?? 0);
		const length = range.suffix ?? range.length ?? object.size - offset;
		headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
		headers.set('Content-Length', String(length));
		return new Response(object.body as unknown as ReadableStream, { status: 206, headers });
	}

	headers.set('Content-Length', String(object.size));
	return new Response(object.body as unknown as ReadableStream, { headers });
};
