import React from 'react';

export default function HomePage({ onLoginClick ,onSignupClick}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Shopping Cart</h1>

      <div className="space-x-4">
        <button
          onClick={onLoginClick}  
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={onSignupClick}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
