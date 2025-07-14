const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0
  },
  productDescription: {
    type: String,
    required: true,
    trim: true
  },
  productImage: {
    type: String, // can store image URL or file path
    required: true
  },
  soldOut: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

