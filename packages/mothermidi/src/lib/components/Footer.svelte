<script lang="ts">
	import { resolve } from '$app/paths';
	import { navLinks, site } from '$lib/site';

	const footerLink = 'smallcaps text-ash-400 transition hover:text-bone';
</script>

<footer class="border-ash-800 mt-auto border-t px-4 py-12 sm:px-5">
	<div class="mx-auto max-w-5xl">
		<div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
			<a href={resolve('/')} class="text-bone flex items-center gap-3">
				<img src="/favicon.svg" alt="" width="40" height="40" class="size-10 rounded-[22%]" />
				<span class="smallcaps text-2xl">{site.name}</span>
			</a>

			<nav class="flex flex-wrap gap-x-6 gap-y-2">
				{#each navLinks as link (link.href)}
					<a class={footerLink} href={resolve(link.href)}>{link.label}</a>
				{/each}
				<a class={footerLink} href="mailto:{site.email}">Contact</a>
				<a
					class={footerLink}
					href={site.appStoreUrl}
					rel="external noopener noreferrer"
					target="_blank">App Store</a
				>
			</nav>
		</div>

		<p class="text-ash-400 mt-10 text-base">
			From the maker of
			<a class="link" href={site.bestFriendUrl} rel="external noopener noreferrer" target="_blank"
				>{site.bestFriendName}</a
			>. Made by
			<a class="link" href={site.developerUrl} rel="external noopener noreferrer" target="_blank"
				>{site.developer}</a
			>.
		</p>
		<p class="text-ash-500 mt-3 text-sm leading-relaxed">
			Logic Pro, GarageBand, Ableton Live, FL Studio, and other product names are trademarks of
			their respective owners.
		</p>
	</div>
</footer>
