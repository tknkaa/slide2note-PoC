import Link from "next/link";

export default function Home() {
	return (
		<>
			<div>Welcome!</div>
			<Link href="sign-in">sign in</Link>
			<Link href="sign-up">sign up</Link>
		</>
	);
}
