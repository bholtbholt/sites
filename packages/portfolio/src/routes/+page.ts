import type { PageLoad } from './$types';
import type { Work, MarkdownFiles } from '$lib/types';

export const load: PageLoad = async () => {
	const works = await getWork();
	return { works };
};

function slugToTitle(slug: string) {
	return slug
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}

async function getWork() {
	let works: Work[] = [];

	const paths: MarkdownFiles = import.meta.glob('/src/work/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		// prepare to extract the date and slug from the filename
		const filename = path.replace('/src/work/', '').replace('.md', '');
		const date = filename.slice(0, 10);
		const slug = filename.slice(11);
		const work: Work = {
			byline: file.metadata?.byline ?? 'published on',
			category: file.metadata?.category ?? 'article',
			content: file.default,
			date,
			jump_line: file.metadata?.jump_line ?? '',
			published: file.metadata?.published ?? true,
			publisher: file.metadata?.publisher ?? 'brianholt.ca',
			publisher_url: file.metadata?.publisher_url ?? '',
			slug,
			title: file.metadata?.title ?? slugToTitle(slug),
		};

		if (work.published !== false) works.push(work);
	}

	// sort by newest first
	works = works.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
	);

	return works;
}
