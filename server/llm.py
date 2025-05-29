from google import genai
from google.genai import types
from pdf2image import convert_from_path
from dotenv import dotenv_values
from PIL import Image
import os


def get_gemini_response(path: str) -> str | None:
    pages = convert_from_path(path, dpi=300)
    rotated_pages = []
    for page in pages:
        rotated_pages.append(page.rotate(270, expand=True))

    max_width = 0
    total_height = 0
    for img in rotated_pages:
        max_width = max(max_width, img.width)
        total_height += img.height

    dst = Image.new("RGB", (max_width, total_height))
    current_height = 0
    for img in rotated_pages:
        dst.paste(img, (0, current_height))
        current_height += img.height

    dst.save("example.jpg")
    try:
        with open("example.jpg", "rb") as f:
            image_bytes = f.read()
    finally:
        os.remove("example.jpg")

    config = dotenv_values(".env")
    api_key = config.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
            "explanation of sorting",
        ],
    )
    return response.text
