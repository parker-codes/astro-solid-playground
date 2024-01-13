import { createLocalStorageSignal } from '../hooks';

export default function Counter() {
	const [count, setCount] = createLocalStorageSignal('count', 0);

	function increment() {
		setCount((c) => c + 1);
	}

	return (
		<button
			type='button'
			onClick={increment}
			class='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
		>
			{count()}
		</button>
	);
}
