import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productImage: ''
  });

  const [editingId, setEditingId] = useState(null); // For update mode

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update mode
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add mode
        await axios.post('http://localhost:5000/api/products', formData);
      }
      setFormData({ productName: '', productPrice: '', productDescription: '', productImage: '' });
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6 space-y-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="productPrice"
          placeholder="Product Price"
          value={formData.productPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productDescription"
          placeholder="Product Description"
          value={formData.productDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productImage"
          placeholder="Product Image URL"
          value={formData.productImage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{product.productName}</h3>
              <p>Price: ${product.productPrice}</p>
              <p>{product.productDescription}</p>
              <img src={product.productImage} alt="" className="w-24 h-24 object-cover mt-2" />
              <p className="text-sm text-gray-500">Sold Out: {product.soldOut ? 'Yes' : 'No'}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
