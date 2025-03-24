<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
		id: string;
	};
	let { id, children }: Props = $props();
</script>

<label for={id} class="mb-1 block font-semibold">{@render children()}</label>
