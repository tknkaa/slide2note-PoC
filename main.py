from pdf2image import convert_from_path
import easyocr
import cv2
import subprocess

subprocess.run(["apt-get", "update"])
subprocess.run(["apt-get", "install", "-y", "poppler-utils"])

reader = easyocr.Reader(["en", "ja"])
path = "/kaggle/input/test-pdf/example.pdf"
pages = convert_from_path(path, dpi=300)
text = ""

for i, page in enumerate(pages):
    page = page.rotate(270, expand=True)
    page.save(f"page_{i + 1}.jpg")
    # page.save("hoge.jpg")
    image = cv2.imread(f"page_{i + 1}.jpg")
    # image = cv2.imread("hoge.jpg")
    result = reader.readtext(image, detail=0)
    print(f"DEBUG OCR result: {result}")
    text += "\n".join(result) + "\n"

print(text)
