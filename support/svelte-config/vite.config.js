import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// enhancedImages must come before sveltekit
	plugins: [enhancedImages(), tailwindcss(), sveltekit()],
	server: { port: 3000 },
});
