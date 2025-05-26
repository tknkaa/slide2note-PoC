import easyocr

reader = easyocr.Reader(["en", "ja"], gpu=False)

result = reader.readtext("hoge.jpg", detail=0)

print(result)
