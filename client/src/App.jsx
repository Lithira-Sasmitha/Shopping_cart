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
// import ProductDetails from './pages/product/ProductDetails'; // optional

import AdminPanel from './pages/product/AdminPanel'; // ✅ NEW

import './index.css';

export default function App() {
  const demoUserId = "6873e74e5a3ae05eef644121";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList userId={demoUserId} />} />  {/* Added product list page */}
        <Route path="/cart" element={<Cart userId={demoUserId} />} />
        {/* <Route path="/products/:id" element={<ProductDetails userId={demoUserId} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-panel" element={<AdminPanel />} /> {/* Admin panel */}
      </Routes>
    </>
  );
}
