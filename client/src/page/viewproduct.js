import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();  // product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      padding: 20,
      backgroundColor: "#f5f7fa",
      borderRadius: 15,
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#222"
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#4a90e2",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: 15, color: "#4a90e2" }}>{product.name}</h2>

      {product.image && (
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          style={{ width: "100%", maxHeight: 350, objectFit: "contain", borderRadius: 15, marginBottom: 20 }}
        />
      )}

      <p style={{ fontSize: 18, marginBottom: 10 }}>
        <strong>Description:</strong> {product.description || "No description"}
      </p>

      <p style={{ fontSize: 18, marginBottom: 10 }}>
        <strong>Price:</strong> Rs. {product.price}
      </p>

      <p style={{ fontSize: 18, marginBottom: 10 }}>
        <strong>Category:</strong> {product.category || "Uncategorized"}
      </p>

      <p style={{ fontSize: 18, marginBottom: 10 }}>
        <strong>Stock Quantity:</strong> {product.stock}
      </p>
    </div>
  );
};

export default ViewProduct;
