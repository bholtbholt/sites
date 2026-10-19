<script lang="ts">
	import { site } from '$lib/site';
	import poster from '$lib/assets/video-poster.jpg?enhanced';

	let playing = $state(false);

	// youtube-nocookie + click-to-load: nothing leaves the page until someone
	// actually wants the video.
	const embedSrc = `https://www.youtube-nocookie.com/embed/${site.youtubeId}?autoplay=1&rel=0`;
</script>

<section class="bg-slate-900">
	<!-- Width capped from the viewport height so the whole 16:9 frame fits under the fixed header. -->
	<div class="mx-auto aspect-video w-full max-w-[calc((100svh-4rem)*16/9)]">
		{#if playing}
			<iframe
				class="h-full w-full"
				src={embedSrc}
				title="{site.name} demo video"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{:else}
			<button
				type="button"
				class="group relative block h-full w-full cursor-pointer"
				aria-label="Play the {site.name} demo video"
				onclick={() => (playing = true)}
			>
				<enhanced:img src={poster} alt="" sizes="100vw" class="h-full w-full object-cover" />
				<span
					class="absolute inset-0 flex items-center justify-center bg-slate-900/30 transition group-hover:bg-slate-900/20"
				>
					<span
						class="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 shadow-lg transition group-hover:scale-110 sm:h-20 sm:w-20"
					>
						<svg
							class="ml-1 h-7 w-7 fill-white sm:h-9 sm:w-9"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</span>
				</span>
			</button>
		{/if}
	</div>
</section>
