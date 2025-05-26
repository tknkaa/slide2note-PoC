from google import genai
from google.genai import types
from pdf2image import convert_from_path
from dotenv import dotenv_values


path = "example.pdf"
page = convert_from_path(path, dpi=300)[0]
image = page.rotate(270, expand=True)
image.save("example.jpeg")
image_bytes = image.tobytes()

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

print(response.text)
