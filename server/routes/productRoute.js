const express = require('express');
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  toggleSoldOut,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', addProduct);               // Add product
router.get('/', getAllProducts);            // Get all products
router.delete('/:id', deleteProduct);       // Delete product
router.put('/:id', updateProduct);          // Update product
router.patch('/:id/soldout', toggleSoldOut); // Toggle soldOut

module.exports = router;
