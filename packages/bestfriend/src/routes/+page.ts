import { appRating } from '$lib/rating';
import type { PageLoad } from './$types';

// Runs at build time: the page is prerendered, so the rating is fetched once per deploy.
export const load: PageLoad = async ({ fetch }) => ({ rating: await appRating(fetch) });
