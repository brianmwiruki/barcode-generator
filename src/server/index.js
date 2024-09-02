const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const barcodeRoutes = require('./routes/barcode');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/barcode', barcodeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
