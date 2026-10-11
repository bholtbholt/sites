import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import svelteConfig from 'svelte-config';
import { rehypeLinks } from './rehype-links.js';

// Same as the shared config, but with our own link handling on top of mdsvex. See
// rehype-links.js for why mdsvex's defaults are not what we want here.
export default {
	...svelteConfig,
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'], rehypePlugins: [rehypeLinks] })],
};
