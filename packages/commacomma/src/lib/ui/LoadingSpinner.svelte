<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		message?: string;
	}

	let { size = 'md', message }: Props = $props();

	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-8 w-8 border-2',
		lg: 'h-12 w-12 border-3',
	};
</script>

<div class="flex flex-col items-center justify-center gap-3">
	<div
		class="animate-spin rounded-full border-zinc-600 border-t-blue-500 {sizeClasses[size]}"
	></div>
	{#if message}
		<p class="text-sm text-zinc-400">{message}</p>
	{/if}
</div>

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
