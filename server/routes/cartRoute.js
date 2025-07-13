const express = require('express');
const {
  addToCart,
  getCart,
  removeFromCart,
  getAllCarts,
  updateCartItem
} = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.get('/:userId', getCart);
router.post('/remove', removeFromCart);
router.post('/update', updateCartItem);
router.get('/all', getAllCarts);

module.exports = router;
