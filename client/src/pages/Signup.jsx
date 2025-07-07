import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'admin', // auto-set
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/users/signup', formData);
      setSuccess('Signup successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 drop-shadow-sm">
          Signup 
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold animate-pulse">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 text-center text-green-600 font-semibold animate-pulse">
            {success}
          </p>
        )}

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Your full name"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="you@example.com"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="+123 456 7890"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Your address"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="••••••••"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md shadow-md transition duration-300"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
