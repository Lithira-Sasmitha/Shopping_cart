const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js');
const productController = require('../controllers/productController.js');

router.get('/', productController.getAllProducts);
router.post('/', upload.single('productImage'), productController.addProduct);
router.put('/:id', upload.single('productImage'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/soldout', productController.toggleSoldOut);

module.exports = router;
