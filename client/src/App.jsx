import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Admin from './pages/Admin';

import ProductList from './pages/product/ProductList';
import Cart from './pages/product/Cart';
import AdminPanel from './pages/product/AdminPanel';

import { CartProvider } from './context/CartContext'; // ✅ IMPORT CART CONTEXT

import './index.css';

export default function App() {
  return (
    <CartProvider> {/* ✅ WRAP ENTIRE APP WITH CART CONTEXT */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </CartProvider>
  );
}
