<script lang="ts">
	import { resolve } from '$app/paths';
	import { navLinks, site } from '$lib/site';
	const footerLink =
		'text-blue-700 transition hover:text-orange-500 dark:text-blue-400 dark:hover:text-orange-400';
</script>

<footer class="mt-auto border-t border-slate-900/10 px-5 py-10 dark:border-white/10">
	<div class="mx-auto max-w-5xl">
		<nav class="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
			<a
				class="{footerLink} inline-flex items-center gap-1.5"
				href={site.instagramUrl}
				rel="external noopener noreferrer"
				target="_blank"
			>
				<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.34 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"
					/>
				</svg>
				@badbadpower
			</a>
			<a class={footerLink} href="mailto:{site.email}">{site.email}</a>
			{#each navLinks as link (link.href)}
				<a class={footerLink} href={resolve(link.href)}>{link.label}</a>
			{/each}
			<a
				class="{footerLink} inline-flex items-center gap-1.5"
				href={site.substackUrl}
				rel="external noopener noreferrer"
				target="_blank"
			>
				Dev Blog
			</a>
		</nav>
		<p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
			Best Friend is not affiliated with, endorsed by, or sponsored by Teenage Engineering. EP-133,
			EP-1320, EP-40, and related names are trademarks of their respective owners. This app does not
			include any copyrighted material from Teenage Engineering.
		</p>
	</div>
</footer>
