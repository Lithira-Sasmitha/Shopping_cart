import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productImage: null,  // store file object here
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  // Add or update product with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('productName', formData.productName);
      data.append('productPrice', formData.productPrice);
      data.append('productDescription', formData.productDescription);
      if (formData.productImage) {
        data.append('productImage', formData.productImage);
      }

      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setFormData({
        productName: '',
        productPrice: '',
        productDescription: '',
        productImage: null,
      });
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      productImage: null, // clear file input on edit; you can optionally show current image preview
    });
    setEditingId(product._id);
    setShowModal(true);
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

  // Add new product button
  const handleAddNew = () => {
    setFormData({
      productName: '',
      productPrice: '',
      productDescription: '',
      productImage: null,
    });
    setEditingId(null);
    setShowModal(true);
  };

  // Toggle sold out status
  const handleToggleSoldOut = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/soldout`);
      fetchProducts();
    } catch (err) {
      console.error('Error toggling sold out status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Admin Panel</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className={`bg-white p-4 rounded-xl shadow hover:shadow-md transition ${
              product.soldOut ? 'opacity-60 grayscale' : ''
            }`}
          >
            <img
              src={`http://localhost:5000/${product.productImage}`}
              alt={product.productName}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-700">${product.productPrice}</p>
              <p className="text-sm text-gray-500 mb-2">{product.productDescription}</p>
              <p className={`text-sm font-medium ${product.soldOut ? 'text-red-500' : 'text-green-600'}`}>
                {product.soldOut ? 'Sold Out' : 'In Stock'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleToggleSoldOut(product._id)}
                  className={`${
                    product.soldOut ? 'bg-green-600' : 'bg-gray-600'
                  } text-white px-3 py-1 rounded hover:opacity-90`}
                >
                  {product.soldOut ? 'Mark In Stock' : 'Mark Sold Out'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Update Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
              <textarea
                name="productDescription"
                placeholder="Product Description"
                value={formData.productDescription}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="file"
                name="productImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
                // not required on update - optional
                {...(editingId ? {} : { required: true })}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
