import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{product.productName}</h1>
      <img
        src={`http://localhost:5000/${product.productImage}`}
        alt={product.productName}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <p className="text-gray-700 text-lg mb-2">
        <strong>Price:</strong> ${product.productPrice.toFixed(2)}
      </p>
      <p className="text-gray-700 text-md mb-4">{product.productDescription}</p>
      <p className={`text-sm font-semibold ${product.soldOut ? 'text-red-600' : 'text-green-600'}`}>
        {product.soldOut ? 'Sold Out' : 'In Stock'}
      </p>
    </div>
  );
}
