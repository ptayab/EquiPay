import pytesseract
from PIL import Image
import re

def read_receipt(image_path):
    # Load the image
    image = Image.open(image_path)

    # Use Tesseract to do OCR on the image
    text = pytesseract.image_to_string(image)

    # Find the total amount (assuming it is preceded by 'Total')
    total = re.search(r'Total:\s*\$?(\d+\.\d+)', text)
    total_amount = total.group(1) if total else 'Unknown'

    # Find the date (this regex matches several common date formats)
    date = re.search(r'(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})', text)
    date_found = date.group(1) if date else 'Unknown'

    # Find a name (this is more complex and highly dependent on the receipt format)
    name = re.search(r'Receipt Name:\s*(\w+)', text)
    receipt_name = name.group(1) if name else 'Generic Receipt'

    return {
        'Total Amount': total_amount,
        'Date': date_found,
        'Receipt Name': receipt_name
    }

# Example usage
receipt_data = read_receipt('receipt-ocr-original.jpeg')
print(receipt_data)
