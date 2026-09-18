import { error } from '@sveltejs/kit';
import { docBySlug, docs } from '$lib/docs';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => docs.map((doc) => ({ slug: doc.slug }));

export const load: PageLoad = ({ params }) => {
	const doc = docBySlug(params.slug);
	if (!doc) error(404, 'Unknown doc');

	return { doc };
};
