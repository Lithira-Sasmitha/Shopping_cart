import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart({ userId }) {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCart = () => {
    axios.get(`/api/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    axios.post('/api/cart/update', { userId, productId, quantity })
      .then(res => {
        setCart(res.data);
        setMessage('Quantity updated');
        setTimeout(() => setMessage(''), 2000);
      })
      .catch(err => console.error(err));
  };

  const removeItem = (productId) => {
    axios.post('/api/cart/remove', { userId, productId })
      .then(res => {
        setCart(res.data);
        setMessage('Item removed');
        setTimeout(() => setMessage(''), 2000);
      })
      .catch(err => console.error(err));
  };

  if (!cart || !cart.items) return <p>Loading cart...</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th><th>Quantity</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item.productId._id}>
                <td>{item.productId.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={e => updateQuantity(item.productId._id, parseInt(e.target.value))}
                  />
                </td>
                <td>${(item.productId.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.productId._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
