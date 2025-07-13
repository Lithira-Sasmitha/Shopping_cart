import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList({ userId }) {
  const [products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (productId) => {
    axios.post('/api/cart/add', {
      userId,
      productId,
      quantity: 1
    }).then(res => {
      setCartMessage('Added to cart!');
      setTimeout(() => setCartMessage(''), 2000);
    }).catch(err => {
      console.error(err);
      setCartMessage('Failed to add to cart');
    });
  };

  return (
    <div>
      <h2>Products</h2>
      {cartMessage && <p>{cartMessage}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: 10, margin: 10, width: 200 }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
