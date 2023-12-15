interface Props {
	text: string;
}

export default function Uppercase(props: Props) {
	const uppercase = () => props.text.toUpperCase();
	return <p>{uppercase()}</p>;
}
