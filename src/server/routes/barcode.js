const express = require('express');
const { createCanvas } = require('canvas');
const JsBarcode = require('jsbarcode');

const router = express.Router();

// Barcode generation endpoint
router.post('/generate', (req, res) => {
  const { productName, serialNumber } = req.body;

  if (!productName || !serialNumber) {
    return res.status(400).json({ error: 'Product name and serial number are required.' });
  }

  try {
    const canvas = createCanvas(200, 100);
    JsBarcode(canvas, serialNumber, {
      format: 'CODE128',
      displayValue: true,
      text: `${productName}\n${serialNumber}`,
      fontSize: 16,
      textPosition: 'top',
    });

    const barcodeImage = canvas.toDataURL(); // Convert canvas to Data URL
    res.json({ barcodeImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
