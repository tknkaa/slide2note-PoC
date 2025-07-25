"use client";

import { useActionState } from "react";
import { type GeminiResponse, getGeminiResponse } from "@/app/actions";

export default function SlideForm() {
	const initialState: GeminiResponse = { filename: "", response: "" };
	const [response, action, isPending] = useActionState(
		getGeminiResponse,
		initialState,
	);

	return (
		<>
			<form action={action}>
				<input type="file" accept=".pdf" name="file" />
				<button type="submit">submit</button>
			</form>
			{isPending ? (
				<div>loading</div>
			) : (
				<div>response: {response.response}</div>
			)}
		</>
	);
}
