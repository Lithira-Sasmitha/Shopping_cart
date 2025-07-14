import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList({ userId }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({}); // key: productId, value: qty

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [userId]);

  // Filter products based on search term (case insensitive)
  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product to cart (increment quantity)
  const addToCart = (productId) => {
    setCart((prevCart) => {
      const currentQty = prevCart[productId] || 0;
      return {
        ...prevCart,
        [productId]: currentQty + 1,
      };
    });
  };

  // Remove one quantity from cart or remove product if qty=1
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const currentQty = prevCart[productId];
      if (!currentQty) return prevCart;
      if (currentQty === 1) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [productId]: currentQty - 1,
      };
    });
  };

  // Get total cart items count
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Get cart items with product details
  const cartItems = Object.entries(cart).map(([productId, qty]) => {
    const product = products.find((p) => p._id === productId);
    return { ...product, qty };
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Our Products</h1>

      {/* Search bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-indigo-400 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative ${
                p.soldOut ? 'opacity-50 grayscale cursor-not-allowed' : ''
              }`}
            >
              <img
                src={`http://localhost:5000/${p.productImage}`}
                alt={p.productName}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-4">{p.productName}</h2>
              <p className="text-gray-700 font-medium">${p.productPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">{p.productDescription}</p>
              <p
                className={`mt-2 font-semibold ${
                  p.soldOut ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {p.soldOut ? 'Sold Out' : 'In Stock'}
              </p>

              {/* Add to cart button */}
              <button
                disabled={p.soldOut}
                onClick={() => addToCart(p._id)}
                className={`mt-4 w-full rounded bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="w-full md:w-80 bg-indigo-50 rounded-lg p-6 shadow-md sticky top-24 h-fit">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Shopping Cart</h2>
          {cartItemCount === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-indigo-300 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">${item.productPrice.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <button
                        onClick={() => addToCart(item._id)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-semibold text-lg border-t border-indigo-300 pt-4">
                Total: $
                {cartItems
                  .reduce((sum, item) => sum + item.productPrice * item.qty, 0)
                  .toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
