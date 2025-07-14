const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST add new product
exports.addProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription } = req.body;
    const productImage = req.file ? req.file.path : null;

    if (!productImage) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const product = new Product({
      productName,
      productPrice,
      productDescription,
      productImage,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// PUT update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productPrice, productDescription } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // If new image uploaded, delete old one
    if (req.file) {
      if (product.productImage && fs.existsSync(product.productImage)) {
        fs.unlinkSync(product.productImage);
      }
      product.productImage = req.file.path;
    }

    product.productName = productName;
    product.productPrice = productPrice;
    product.productDescription = productDescription;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete image file
    if (product.productImage && fs.existsSync(product.productImage)) {
      fs.unlinkSync(product.productImage);
    }

    await Product.deleteOne({ _id: id });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// PATCH toggle soldOut status
exports.toggleSoldOut = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.soldOut = !product.soldOut;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle sold out' });
  }
};
