import easyocr

reader = easyocr.Reader(["en", "ja"])

result = reader.readtext('page_1.jpg')

print(result)