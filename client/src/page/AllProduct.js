import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: 20,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#222",
    }}>
      <h2 style={{ color: "#4a90e2", marginBottom: 30, textAlign: "center" }}>
        All Products
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 20
      }}>
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            style={{
              cursor: "pointer",
              borderRadius: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: 15,
              backgroundColor: "#f9faff",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {product.image && (
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 15 }}
              />
            )}
            <h3 style={{ margin: "0 0 10px 0", color: "#34495e" }}>{product.name}</h3>
            <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>Rs. {product.price}</p>
            <p style={{ margin: 0, color: "#7f8c8d" }}>{product.category || "Uncategorized"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
