import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session) {
		redirect("/slides");
	}
	return (
		<>
			<div>Welcome!</div>
			<Link href="sign-in">sign in</Link>
			<Link href="sign-up">sign up</Link>
		</>
	);
}
