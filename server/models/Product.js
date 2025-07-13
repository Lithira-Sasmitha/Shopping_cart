const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: {
    type: [String],       // Array of strings
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'] // Validate max 5 images
  }
}, { timestamps: true });

// Validator to limit array size to 5
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Product', productSchema);
