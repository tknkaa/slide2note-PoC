"use server";

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
