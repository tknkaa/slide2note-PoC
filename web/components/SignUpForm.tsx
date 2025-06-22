"use client";
import { useState } from "react";
import { signUp } from "@/app/actions";

export default function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<>
			<form action={signUp}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="name"
					name="name"
				/>
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
