import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Welcome to the Shopping Cart System</h1>

      {!user ? (
        <>
          <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to continue.</p>
        </>
      ) : (
        <>
          <p>Hello, {user.name}!</p>
          <p>Go to your <Link to="/profile">Profile</Link> or browse the <Link to="/users">Users</Link> page.</p>
          {user.role === 'admin' && <p>Access your <Link to="/admin">Admin Dashboard</Link>.</p>}
        </>
      )}
    </div>
  );
}
