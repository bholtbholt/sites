<script lang="ts">
	import { reviews } from '$lib/reviews';
	import type { Rating } from '$lib/rating';

	let { rating }: { rating: Rating } = $props();

	const stars = [1, 2, 3, 4, 5];
	const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

	/** Matches the CSS transition below. The step settles on a timer rather than on
	 *  `transitionend`, which never fires when a reduced-motion setting removes the
	 *  transition — that would leave the carousel stuck mid-step. */
	const duration = 300;

	/**
	 * The loop has no ends: the track always holds one card off-screen to the left, so a step
	 * in either direction has somewhere to go. Once the slide finishes, the array rotates by
	 * one and the track snaps back to its resting offset with the transition off, which puts
	 * the next card in the buffer slot. Nothing tells you where the list begins.
	 */
	let order = $state([reviews.length - 1, ...reviews.map((_, i) => i).slice(0, -1)]);
	/** -1 or 1 while a step animates, 0 at rest. */
	let shift = $state(0);
	let sliding = $state(false);
	let track = $state<HTMLElement | null>(null);
	/** Card width plus the gap, measured rather than hardcoded — the cards are viewport-width
	 *  on phones and a fixed width from `sm` up. */
	let step = $state(0);

	$effect(() => {
		if (!track) return;

		const measure = () => {
			const cards = track?.children;
			if (!cards || cards.length < 2) return;
			const first = cards[0] as HTMLElement;
			const second = cards[1] as HTMLElement;
			step = second.offsetLeft - first.offsetLeft;
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(track);
		return () => observer.disconnect();
	});

	function slide(direction: 1 | -1) {
		if (sliding) return;
		sliding = true;
		shift = -direction;

		setTimeout(() => {
			order =
				direction === 1
					? [...order.slice(1), order[0]]
					: [order[order.length - 1], ...order.slice(0, -1)];
			shift = 0;
			sliding = false;
		}, duration);
	}

	// Resting position is one card to the left, so the buffer card sits off-screen.
	const offset = $derived((-1 + shift) * step);
</script>

<section class="px-5 py-16 sm:py-24">
	<div class="mx-auto max-w-5xl">
		<p
			class="mb-2 text-sm font-semibold tracking-widest text-blue-700 uppercase dark:text-blue-400"
		>
			App Store
		</p>
		<h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
			What people are saying
		</h2>

		<!-- The visible figure has to match the aggregateRating in the JSON-LD, so both come
		     from the same build-time lookup. See lib/rating.ts. -->
		<p class="mt-4 flex items-center gap-3 text-slate-600 dark:text-slate-300">
			<span class="flex gap-0.5" aria-hidden="true">
				{#each stars as star (star)}
					<svg class="h-5 w-5 fill-orange-500" viewBox="0 0 20 20">
						<path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
					</svg>
				{/each}
			</span>
			<span>{rating.value} out of 5 · {rating.count} ratings</span>
		</p>

		<div class="mt-10 overflow-hidden">
			<ul
				class="flex items-start gap-6 {sliding
					? 'transition-transform duration-300 ease-out motion-reduce:transition-none'
					: ''}"
				style:transform="translateX({offset}px)"
				bind:this={track}
			>
				{#each order as index (reviews[index].author)}
					{@const review = reviews[index]}
					<li
						class="w-[85vw] shrink-0 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 sm:w-80 dark:bg-slate-900 dark:ring-white/10"
					>
						<span class="flex gap-0.5" aria-label="{review.rating} out of 5">
							{#each stars.slice(0, review.rating) as star (star)}
								<svg class="h-4 w-4 fill-orange-500" viewBox="0 0 20 20" aria-hidden="true">
									<path
										d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
									/>
								</svg>
							{/each}
						</span>

						<h3 class="mt-3 text-lg font-semibold" lang={review.lang}>{review.title}</h3>
						<p class="mt-2 leading-relaxed text-slate-600 dark:text-slate-300" lang={review.lang}>
							{review.body}
						</p>
						<p class="mt-4 text-sm text-slate-500 dark:text-slate-400">
							{review.author} ·
							<time datetime={review.date}>{dateFormat.format(new Date(review.date))}</time>
						</p>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-6 flex justify-center gap-3">
			<button
				class="rounded-full bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:ring-white/10 dark:hover:ring-blue-400/30"
				type="button"
				aria-label="Previous review"
				onclick={() => slide(-1)}
			>
				<svg
					class="h-5 w-5 fill-none stroke-blue-700 stroke-2 dark:stroke-blue-400"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="m14 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<button
				class="rounded-full bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition hover:ring-blue-700/30 dark:bg-slate-900 dark:ring-white/10 dark:hover:ring-blue-400/30"
				type="button"
				aria-label="Next review"
				onclick={() => slide(1)}
			>
				<svg
					class="h-5 w-5 fill-none stroke-blue-700 stroke-2 dark:stroke-blue-400"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>
	</div>
</section>
