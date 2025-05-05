const Stock = require('../models/Stock'); // Import the Stock model

// Create a new stock entry
exports.createStock = async (req, res) => {
  try {
    const { productName, category, quantity, expires, productDescription } = req.body;
    
    const newStock = new Stock({
      productName,
      category,
      quantity,
      expires,
      productDescription,
    });

    await newStock.save();
    return res.status(201).json({ message: 'Stock entry created successfully', newStock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all stock entries
exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find();
    return res.status(200).json(stock);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single stock entry by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });
    return res.status(200).json(stock);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update stock by ID
exports.updateStock = async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStock) return res.status(404).json({ message: 'Stock not found' });
    return res.status(200).json({ message: 'Stock updated successfully', updatedStock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a stock entry by ID
exports.deleteStock = async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedStock) return res.status(404).json({ message: 'Stock not found' });
    return res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
