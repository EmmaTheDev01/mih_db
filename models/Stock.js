const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,  // Set to `true` if product description is mandatory
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['tool', 'consumable'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
  expires: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Stock', StockSchema);
