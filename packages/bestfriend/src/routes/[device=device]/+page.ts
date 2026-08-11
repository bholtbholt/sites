import { error } from '@sveltejs/kit';
import { deviceBySlug, devices } from '$lib/devices';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => devices.map((device) => ({ device: device.slug }));

export const load: PageLoad = ({ params }) => {
	const device = deviceBySlug(params.device);
	if (!device) error(404, 'Unknown device');

	return { device };
};
