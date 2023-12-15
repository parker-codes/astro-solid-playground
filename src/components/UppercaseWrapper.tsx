import { createSignal } from 'solid-js';
import Uppercase from './Uppercase';

export default function UppercaseWrapper() {
	const [text, setText] = createSignal<string>('');

	return (
		<>
			<input
				value={text()}
				onInput={(e) => setText(e.currentTarget.value)}
				class='flex-auto px-4 py-2 min-w-[20rem] rounded bg-slate-700 text-white'
			/>
			<Uppercase text={text()} />
		</>
	);
}
