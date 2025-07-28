import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart(); // Use context

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Only add to cart (no navigate)
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Our Products</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-indigo-400 rounded px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className={`bg-white p-4 rounded-lg shadow relative ${p.soldOut ? 'opacity-50 grayscale' : ''}`}
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
            <button
              disabled={p.soldOut}
              onClick={() => handleAddToCart(p)}
              className="mt-4 w-full rounded bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 disabled:opacity-60"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
