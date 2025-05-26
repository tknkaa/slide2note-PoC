from pdf2image import convert_from_path
import easyocr
import numpy as np

reader = easyocr.Reader(["en", "ja"])
path = "example.pdf"
pages = convert_from_path(path, dpi=300)
text = ""

for i, page in enumerate(pages):
    page = page.rotate(270, expand=True)
    page.save(f"page_{i + 1}.png")
    image_np = np.array(page.convert("RGB"))
    result = reader.readtext(image_np, detail=0)
    print(f"DEBUG OCR result: {result}")
    text += "\n".join(result) + "\n"

print(text)