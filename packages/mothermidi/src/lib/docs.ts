import type { Component } from 'svelte';

/** Nav order. An unknown section in a guide's frontmatter fails the build. */
const sectionLabels = {
	playing: 'Playing',
	connecting: 'Connecting',
} as const;

type SectionId = keyof typeof sectionLabels;

type DocSection = (typeof sectionLabels)[SectionId];

type DocMeta = {
	title: string;
	/** One sentence. Reused as the meta description, the index blurb, and the llms.txt line. */
	summary: string;
	section: SectionId;
	/** Position across all guides; sections are ordered by their first guide. */
	order: number;
};

export type Doc = Omit<DocMeta, 'section'> & {
	slug: string;
	section: DocSection;
	content: Component;
	/** Raw markdown source, for llms-full.txt. */
	source: string;
};

type MarkdownModule = { metadata?: Partial<DocMeta>; default: Component };

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

const isSection = (value: unknown): value is SectionId =>
	typeof value === 'string' && value in sectionLabels;

function toDoc(path: string): Doc {
	const meta = modules[path].metadata;

	if (!meta?.title || !meta.summary || meta.order === undefined) {
		throw new Error(`${path} is missing required frontmatter`);
	}

	if (!isSection(meta.section)) {
		throw new Error(`${path} has an unknown section: ${meta.section}`);
	}

	return {
		content: modules[path].default,
		order: meta.order,
		section: sectionLabels[meta.section],
		slug: path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
		source: sources[path] ?? '',
		summary: meta.summary,
		title: meta.title,
	};
}

/** Every doc, in reading order. */
export const docs: readonly Doc[] = Object.keys(modules)
	.map(toDoc)
	.sort((first, second) => first.order - second.order);

export const docBySlug = (slug: string) => docs.find((doc) => doc.slug === slug);

/** The docs grouped for the index page and the sidebar. */
export const docsBySection = () =>
	[...new Set(docs.map((doc) => doc.section))].map((section) => ({
		section,
		items: docs.filter((doc) => doc.section === section),
	}));

/** Task first, brand last: these pages exist to answer unbranded searches. */
export const docTitle = (doc: Doc) => `${doc.title} — Mother MIDI`;
