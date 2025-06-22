"use server";

// import { cookies } from "next/headers";
import { parseSetCookieHeader } from "better-auth/cookies";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export type GeminiResponse = {
	filename: string;
	response: string;
};

export async function getGeminiResponse(
	_prev: GeminiResponse,
	formData: FormData,
) {
	const file = formData.get("file") as File;
	const body = new FormData();
	if (file) {
		body.append("file", file);
	}
	const res = await fetch("http://127.0.0.1:8000/slide", {
		method: "POST",
		body: body,
	});
	const json: GeminiResponse = await res.json();
	return json;
}

export async function signIn(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const response = await auth.api.signInEmail({
		body: {
			email,
			password,
		},
		asResponse: true,
	});
	console.log(response);

	// const cookieStore = await cookies();
	const setCookieHeader = response.headers.get("set-cookie");
	console.log(setCookieHeader);
	if (setCookieHeader) {
		const parsedCookies = parseSetCookieHeader(setCookieHeader);
		console.log(parsedCookies);
		// cookieStore.set
	}
	redirect("/slides");
}

export async function signUp(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("name") as string;
	const response = await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
	});
	console.log(response);
	redirect("/sign-in");
}
