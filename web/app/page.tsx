import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	console.log(session);
	return (
		<>
			<div>Welcome!</div>
			<Link href="sign-in">sign in</Link>
			<Link href="sign-up">sign up</Link>
		</>
	);
}
