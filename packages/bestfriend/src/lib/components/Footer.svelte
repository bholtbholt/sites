<script lang="ts">
	import { resolve } from '$app/paths';
	import { navLinks, site } from '$lib/site';
	const footerLink = 'text-teal-700 transition hover:text-orange-500 dark:text-teal-400 dark:hover:text-orange-400';
</script>

<footer class="mt-auto border-t border-stone-200/80 pt-8 dark:border-stone-700/60">
	<nav class="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
		<a
			class={footerLink}
			href="https://www.instagram.com/badbadpower"
			rel="external noopener noreferrer"
			target="_blank"
		>
			<img src="/InstagramGradient.svg" alt="Instagram logo" class="w-[2ch] inline"/> @badbadpower
		</a>
		{#each navLinks as link (link.href)}
			<a
				class={footerLink}
				href={resolve(link.href)}>{link.label}</a
			>
		{/each}
		<a
			class={footerLink}
			href="https://forms.gle/jvMsX5sYRAZZVqPu7"
			rel="external noopener noreferrer"
			target="_blank"
		>
			Sign up for the beta
		</a>
	</nav>
	<p class="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
		Best Friend is not affiliated with, endorsed by, or sponsored by Teenage Engineering. EP-133, EP-1320, EP-40, and related names are trademarks of their respective owners. This app does not include any copyrighted material from Teenage Engineering.
	</p>
</footer>
