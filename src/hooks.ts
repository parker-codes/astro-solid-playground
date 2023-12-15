import { createSignal, createEffect, onMount } from 'solid-js';

export function createLocalStorageSignal<T>(key: string, initialValue: T) {
	const [value, setValue] = createSignal(initialValue);

	onMount(() => {
		const storedValue = window.localStorage.getItem(key);
		if (storedValue) setValue(JSON.parse(storedValue));
	});
	createEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value()));
	});

	return [value, setValue] as const;
}
