const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// Add new product
exports.addProduct = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.path) : [];

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      images
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Add product error:', error);  // << Add this line to see error details
    res.status(500).json({ error: 'Failed to add product' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};