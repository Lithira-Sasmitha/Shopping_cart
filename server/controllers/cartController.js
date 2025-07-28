const Cart = require('../models/Cart');

// Add product to cart or increase quantity
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists in cart, increment quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    // Populate product details before sending response
    const populatedCart = await cart.populate('items.productId').execPopulate();

    return res.status(200).json(populatedCart);
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Remove product from cart or reduce quantity
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not in cart' });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // Remove item from array
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    const populatedCart = await cart.populate('items.productId').execPopulate();

    return res.status(200).json(populatedCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get cart for a user
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
