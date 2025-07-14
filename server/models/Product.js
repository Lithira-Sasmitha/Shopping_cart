const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  productPrice: { type: Number, required: true, min: 0 },
  productDescription: { type: String, required: true, trim: true },
  productImage: { type: String, required: true }, // will store file path
  soldOut: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
