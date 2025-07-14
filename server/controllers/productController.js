const Product = require('../models/Product');

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productImage } = req.body;

    const newProduct = new Product({
      productName,
      productPrice,
      productDescription,
      productImage,
      soldOut: false // default when adding
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Toggle SoldOut status
exports.toggleSoldOut = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.soldOut = !product.soldOut;
    await product.save();

    res.status(200).json({
      message: `Product marked as ${product.soldOut ? 'Sold Out' : 'Available'}`,
      product,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle soldOut status' });
  }
};
