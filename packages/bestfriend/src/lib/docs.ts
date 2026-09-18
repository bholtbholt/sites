import type { Component } from 'svelte';

/**
 * Sections in nav order. A doc's `section` frontmatter has to match one of these — the
 * loader throws otherwise, so a typo fails the build instead of silently hiding a page.
 */
export const docSections = [
	'Getting started',
	'Samples',
	'Pads',
	'Scenes & performance',
	'Playing',
	'Backups & bouncing',
	'Library',
	'The EP-Series',
] as const;

export type DocSection = (typeof docSections)[number];

export type DocMeta = {
	title: string;
	/** One sentence. Reused as the meta description, the index blurb, and the llms.txt line. */
	summary: string;
	section: DocSection;
	/** Position within the section. */
	order: number;
	/** The question this page answers, phrased the way it gets typed into a search box. */
	question: string;
	/** Device slugs this doc applies to. Drives the cross-links to the device pages. */
	devices: readonly string[];
	updated: string;
};

export type Doc = DocMeta & {
	slug: string;
	content: Component;
	/** Raw markdown source, for llms-full.txt. */
	source: string;
};

type MarkdownModule = { metadata?: Partial<DocMeta>; default: Component };

/**
 * YAML turns an unquoted `2026-09-16` into a Date, which then renders as a full ISO
 * timestamp on the page and in llms-full.txt. Pull it back to a plain calendar date —
 * the day is the only part that is true, and `dateModified` should not imply midnight UTC.
 */
const asDate = (value: unknown) =>
	value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);

const modules: Record<string, MarkdownModule> = import.meta.glob('/src/docs/*.md', {
	eager: true,
});

// A second pass over the same files for the raw text. mdsvex compiles the first glob to
// components, which llms-full.txt cannot serialise back into prose.
const sources: Record<string, string> = import.meta.glob('/src/docs/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
});

const slugOf = (path: string) => path.replace('/src/docs/', '').replace('.md', '');

function toDoc(path: string): Doc {
	const slug = slugOf(path);
	const meta = modules[path].metadata;

	if (!meta?.title || !meta.summary || !meta.section || !meta.question || !meta.updated) {
		throw new Error(`src/docs/${slug}.md is missing required frontmatter`);
	}

	if (!docSections.includes(meta.section)) {
		throw new Error(`src/docs/${slug}.md has an unknown section: ${meta.section}`);
	}

	return {
		content: modules[path].default,
		devices: meta.devices ?? [],
		order: meta.order ?? 0,
		question: meta.question,
		section: meta.section,
		slug,
		source: sources[path] ?? '',
		summary: meta.summary,
		title: meta.title,
		updated: asDate(meta.updated),
	};
}

/** Every doc, in nav order: by section, then by `order` within the section. */
export const docs: readonly Doc[] = Object.keys(modules)
	.map(toDoc)
	.sort(
		(first, second) =>
			docSections.indexOf(first.section) - docSections.indexOf(second.section) ||
			first.order - second.order,
	);

export const docBySlug = (slug: string) => docs.find((doc) => doc.slug === slug);

export const docsForDevice = (slug: string) => docs.filter((doc) => doc.devices.includes(slug));

/** The docs grouped for the index page and the sidebar, empty sections dropped. */
export const docsBySection = () =>
	docSections
		.map((section) => ({ section, items: docs.filter((doc) => doc.section === section) }))
		.filter((group) => group.items.length > 0);

/**
 * Docs pages lead with the task and put the brand last. The device pages do the opposite
 * (see `deviceTitle`) because they are brand pages; these exist to answer unbranded
 * searches, so the query has to be the visible head of the SERP title.
 */
export const docTitle = (doc: Doc) => `${doc.title} — Best Friend`;
