<script lang="ts" module>
	type TurnstileApi = {
		render: (el: HTMLElement, options: { sitekey: string; theme?: string }) => string;
		reset: (widgetId: string) => void;
		remove: (widgetId: string) => void;
	};

	declare global {
		interface Window {
			turnstile?: TurnstileApi;
		}
	}

	const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
	let loading: Promise<TurnstileApi> | undefined;

	function loadTurnstile(): Promise<TurnstileApi> {
		loading ??= new Promise((resolve, reject) => {
			if (window.turnstile) return resolve(window.turnstile);

			const script = document.createElement('script');
			script.src = SCRIPT_SRC;
			script.async = true;
			script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject());
			script.onerror = () => {
				loading = undefined;
				reject();
			};
			document.head.append(script);
		});
		return loading;
	}
</script>

<script lang="ts">
	import { dev } from '$app/environment';
	import { site } from '$lib/site';

	// Cloudflare's always-pass test key, so local dev needs no setup.
	const sitekey = dev ? '1x00000000000000000000AA' : site.turnstileSiteKey;

	let api: TurnstileApi | undefined;
	let widgetId: string | undefined;

	export function reset() {
		if (api && widgetId) api.reset(widgetId);
	}

	function widget(el: HTMLElement) {
		let cancelled = false;

		loadTurnstile().then(
			(turnstile) => {
				if (cancelled) return;
				api = turnstile;
				widgetId = turnstile.render(el, { sitekey, theme: 'auto' });
			},
			() => {},
		);

		return () => {
			cancelled = true;
			if (api && widgetId) api.remove(widgetId);
			widgetId = undefined;
		};
	}
</script>

<div {@attach widget}></div>
