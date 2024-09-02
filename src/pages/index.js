import { useState } from 'react';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [barcodeImage, setBarcodeImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/barcode/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, serialNumber }),
    });

    const data = await response.json();
    if (data.barcodeImage) {
      setBarcodeImage(data.barcodeImage);
    } else {
      alert('Failed to generate barcode');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Barcode Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
        <button type="submit">Generate Barcode</button>
      </form>
      {barcodeImage && <img src={barcodeImage} alt="Generated Barcode" />}
    </div>
  );
}
