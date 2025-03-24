import Headroom from 'headroom.js';

export function headroom(node: HTMLElement) {
	const headroom = new Headroom(node);
	headroom.init();

	return {
		destroy() {
			headroom.destroy();
		},
	};
}
