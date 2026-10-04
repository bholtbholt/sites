CREATE TABLE snapshots (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	notes TEXT NOT NULL DEFAULT '',
	author TEXT NOT NULL DEFAULT '',
	-- JSON arrays: tags is string[], pads is { name: string }[]
	tags TEXT NOT NULL DEFAULT '[]',
	pads TEXT NOT NULL,
	download_count INTEGER NOT NULL DEFAULT 0,
	ip_hash TEXT NOT NULL,
	created_at INTEGER NOT NULL
);

CREATE INDEX snapshots_newest ON snapshots (created_at DESC);
CREATE INDEX snapshots_popular ON snapshots (download_count DESC, created_at DESC);
CREATE INDEX snapshots_uploader ON snapshots (ip_hash, created_at);
