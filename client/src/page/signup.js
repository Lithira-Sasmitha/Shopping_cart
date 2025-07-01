import React, { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idNumber: '',
    age: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      setError('You must agree to the terms before signing up.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Proceed with sign up logic (e.g., API call)
    alert('Signed up successfully!\n\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Create an Account</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 font-semibold text-center">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="NIC / Passport"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Age"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="2"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Your address"
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Email address"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Re-enter Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Re-enter password"
          />
        </div>

        <label className="inline-flex items-center mt-6 mb-6">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm">I agree to the <span className="text-blue-600 underline cursor-pointer">terms and conditions</span></span>
        </label>

        <button
          type="submit"
          disabled={!formData.agreed}
          className={`w-full p-3 text-white text-lg rounded-md transition ${
            formData.agreed ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
