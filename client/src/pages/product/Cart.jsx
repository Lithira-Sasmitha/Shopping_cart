import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems } = useCart();

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.productPrice, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700 text-center">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
            Go back to products
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Cart Items */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:5000/${item.productImage}`}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold text-indigo-700">{item.productName}</h2>
                  <p className="text-sm text-gray-500">{item.productDescription}</p>
                  <p className="mt-1 text-indigo-600 font-bold">${item.productPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="border-t pt-6 flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-lg font-medium text-gray-700">
                Total Items: <span className="font-bold">{totalItems}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Total Price: <span className="font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
              </p>
            </div>

            {/* Checkout Button */}
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              onClick={() => alert('Proceed to checkout')}
            >
              Total: ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
