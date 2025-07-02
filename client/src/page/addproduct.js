import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare formData to send file + data
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    axios
      .post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 30,
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        borderRadius: 15,
        backgroundColor: "#f9faff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222"
      }}
    >
      <h2
        style={{
          marginBottom: 30,
          textAlign: "center",
          color: "#4a90e2",
          textShadow: "0 1px 3px rgba(74, 144, 226, 0.6)"
        }}
      >
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
      >
        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1.8px solid #a3b1c6",
              fontSize: 16,
              marginTop: 6,
              transition: "border-color 0.3s",
              outline: "none"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.target.style.borderColor = "#a3b1c6")}
          />
        </label>

        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Add a short description"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1.8px solid #a3b1c6",
              fontSize: 16,
              marginTop: 6,
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.target.style.borderColor = "#a3b1c6")}
          />
        </label>

        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Price (Rs.)
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            placeholder="Enter price"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1.8px solid #a3b1c6",
              fontSize: 16,
              marginTop: 6,
              outline: "none",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.target.style.borderColor = "#a3b1c6")}
          />
        </label>

        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1.8px solid #a3b1c6",
              fontSize: 16,
              marginTop: 6,
              outline: "none",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.target.style.borderColor = "#a3b1c6")}
          />
        </label>

        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Stock Quantity
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            placeholder="Stock quantity"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1.8px solid #a3b1c6",
              fontSize: 16,
              marginTop: 6,
              outline: "none",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.target.style.borderColor = "#a3b1c6")}
          />
        </label>

        <label style={{ fontWeight: "600", fontSize: 16, color: "#34495e" }}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              marginTop: 8,
              borderRadius: 8,
              cursor: "pointer"
            }}
          />
        </label>

        {imagePreview && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <p style={{ color: "#4a90e2", fontWeight: "600" }}>Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: 250, borderRadius: 15, boxShadow: "0 3px 8px rgba(74,144,226,0.3)" }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "14px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            fontWeight: "700",
            fontSize: 18,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            marginTop: 30,
            boxShadow: "0 6px 12px rgba(74,144,226,0.6)",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#357ABD")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4a90e2")}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
