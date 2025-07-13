import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });
  const [message, setMessage] = useState('');

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const fetchCarts = () => {
    axios.get('/api/cart/all')
      .then(res => setCarts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
    fetchCarts();
  }, []);

  const addProduct = () => {
    axios.post('/api/products', {
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    })
    .then(() => {
      setMessage('✅ Product added');
      setNewProduct({ name: '', description: '', price: '', stock: '', image: '' });
      fetchProducts();
      setTimeout(() => setMessage(''), 2000);
    })
    .catch(() => {
      setMessage('❌ Failed to add product');
    });
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => fetchProducts())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Admin Panel</h1>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {message}
        </div>
      )}

      {/* Add Product Form */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">➕ Add Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <input className="input" placeholder="Name" value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input className="input" placeholder="Description" value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <input className="input" type="number" placeholder="Price" value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input className="input" type="number" placeholder="Stock" value={newProduct.stock}
            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
          <input className="input" placeholder="Image URL" value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
        </div>
        <button onClick={addProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Product</button>
      </section>

      {/* Product List */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">📦 Product List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p._id} className="border p-4 rounded shadow bg-white">
              <img src={p.image || 'https://via.placeholder.com/150'} alt={p.name}
                   className="h-40 w-full object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="mt-1"><b>${p.price}</b> | Stock: {p.stock}</p>
              <button onClick={() => deleteProduct(p._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* All Carts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🛒 All User Carts</h2>
        {carts.length === 0 ? (
          <p className="text-gray-500">No carts found</p>
        ) : (
          carts.map(cart => (
            <div key={cart._id} className="border p-4 rounded mb-4 bg-gray-50">
              <p className="font-semibold">User ID: {cart.userId?._id} — {cart.userId?.name}</p>
              <ul className="list-disc ml-6 mt-2">
                {cart.items.map(item => (
                  <li key={item.productId._id}>
                    {item.productId.name} — Qty: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
