import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
        Welcome to the Shopping Cart System
      </h1>

      {!user ? (
        <p className="text-lg text-center">
          Please{' '}
          <Link to="/login" className="underline hover:text-yellow-300 font-semibold transition-colors">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="underline hover:text-yellow-300 font-semibold transition-colors">
            Signup
          </Link>{' '}
          to continue.
        </p>
      ) : (
        <div className="space-y-4 text-center">
          <p className="text-2xl font-semibold">
            Hello, <span className="text-yellow-300">{user.name}</span>!
          </p>
          <p className="text-lg">
            Go to your{' '}
            <Link to="/profile" className="text-yellow-300 hover:underline font-semibold">
              Profile
            </Link>{' '}
            or browse the{' '}
            <Link to="/users" className="text-yellow-300 hover:underline font-semibold">
              Users
            </Link>{' '}
            page.
          </p>
          {user.role === 'admin' && (
            <p className="text-lg bg-yellow-300 text-purple-900 rounded-md inline-block px-4 py-2 font-bold drop-shadow-md">
              Access your{' '}
              <Link to="/admin" className="underline hover:text-purple-700">
                Admin Dashboard
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
