from pdf2image import convert_from_path
import easyocr
import cv2
import subprocess
from kaggle_secrets import UserSecretsClient
from google import genai

subprocess.run(["apt-get", "update"])
subprocess.run(["apt-get", "install", "-y", "poppler-utils"])

reader = easyocr.Reader(["en", "ja"])
path = "/kaggle/input/test-pdf/example.pdf"  # Kaggle 上で Dataset を作成して、Notebook から設定する必要がある
pages = convert_from_path(path, dpi=300)
text = ""

for i, page in enumerate(pages):
    page = page.rotate(270, expand=True)
    page.save(f"page_{i + 1}.jpg")
    image = cv2.imread(f"page_{i + 1}.jpg")
    result = reader.readtext(image, detail=0)
    print(f"DEBUG OCR result: {result}")
    text += "\n".join(result) + "\n"

with open("example.txt", "w") as f:
    f.write(text)

user_secrets = UserSecretsClient()
gemini_api_key = user_secrets.get_secret("GEMINI_API_KEY")

client = genai.Client(api_key=gemini_api_key)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="extract keywords from the following parsed pdf" + text,
)

with open("response.txt", "w") as f:
    f.write(str(response))
