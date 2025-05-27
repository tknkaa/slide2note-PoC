"use client";

import type React from "react";
import { useState } from "react";

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState("");
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
		}
		const res = await fetch("http://127.0.0.1:8000/slide", {
			method: "POST",
			body: formData,
		});
		const json = await res.json();
		setMessage(json.filename);
	};

	return (
		<div>
			<form>
				<label>File</label>
				<input type="file" accept=".pdf" onChange={handleFileChange} />
				<button onClick={handleUpload} type="button">
					Upload
				</button>
			</form>
			<div>message: {message}</div>
		</div>
	);
}
