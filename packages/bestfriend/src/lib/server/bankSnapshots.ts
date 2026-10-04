import type { D1Database } from '@cloudflare/workers-types';
import { PAGE_SIZE, TAGS, type Tag } from '$lib/bankSnapshots/constants';

export type SnapshotSort = 'new' | 'popular';

export type SnapshotRow = {
	id: string;
	name: string;
	notes: string;
	author: string;
	tags: string;
	pads: string;
	download_count: number;
	created_at: number;
};

export type Snapshot = {
	id: string;
	name: string;
	notes: string;
	author: string;
	tags: Tag[];
	pads: { name: string }[];
	downloads: number;
	createdAt: number;
};

export const bankKey = (id: string) => `snapshots/${id}/bank.epbank`;
export const padKey = (id: string, index: number) => `snapshots/${id}/pads/${index}.wav`;

const ID_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';

export function newId(length = 10): string {
	const bytes = crypto.getRandomValues(new Uint8Array(length));
	return Array.from(bytes, (byte) => ID_ALPHABET[byte % ID_ALPHABET.length]).join('');
}

export async function hashIp(ip: string, salt: string): Promise<string> {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
	if (!token) return false;

	const body = new FormData();
	body.append('secret', secret);
	body.append('response', token);
	body.append('remoteip', ip);

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body,
	});
	const result: { success?: boolean } = await response.json();
	return result.success === true;
}

export async function recentUploads(db: D1Database, ipHash: string, now: number) {
	const hourAgo = now - 60 * 60 * 1000;
	const dayAgo = now - 24 * 60 * 60 * 1000;

	const row = await db
		.prepare(
			`SELECT
				(SELECT COUNT(*) FROM snapshots WHERE ip_hash = ?1 AND created_at > ?2) AS ip,
				(SELECT COUNT(*) FROM snapshots WHERE created_at > ?3) AS total`,
		)
		.bind(ipHash, hourAgo, dayAgo)
		.first<{ ip: number; total: number }>();

	return { ip: row?.ip ?? 0, total: row?.total ?? 0 };
}

export function isTag(value: unknown): value is Tag {
	return TAGS.includes(value as Tag);
}

function toSnapshot(row: SnapshotRow): Snapshot {
	return {
		id: row.id,
		name: row.name,
		notes: row.notes,
		author: row.author,
		tags: (JSON.parse(row.tags) as unknown[]).filter(isTag),
		pads: JSON.parse(row.pads),
		downloads: row.download_count,
		createdAt: row.created_at,
	};
}

export async function listSnapshots(
	db: D1Database,
	{ sort, tag, page }: { sort: SnapshotSort; tag: Tag | null; page: number },
) {
	const order = sort === 'popular' ? 'download_count DESC, created_at DESC' : 'created_at DESC';
	const where = tag
		? 'WHERE EXISTS (SELECT 1 FROM json_each(snapshots.tags) WHERE value = ?3)'
		: '';

	// One extra row tells us whether there is a next page.
	const { results } = await db
		.prepare(
			`SELECT id, name, notes, author, tags, pads, download_count, created_at
			FROM snapshots ${where} ORDER BY ${order} LIMIT ?1 OFFSET ?2`,
		)
		.bind(PAGE_SIZE + 1, (page - 1) * PAGE_SIZE, ...(tag ? [tag] : []))
		.all<SnapshotRow>();

	return {
		snapshots: results.slice(0, PAGE_SIZE).map(toSnapshot),
		hasMore: results.length > PAGE_SIZE,
	};
}
