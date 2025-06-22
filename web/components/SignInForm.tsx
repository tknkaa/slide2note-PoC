"use client";
import { useState } from "react";
import { signIn } from "@/app/actions";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<form action={signIn}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email"
					type="email"
					name="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
					type="password"
					name="password"
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
