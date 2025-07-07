import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Access control
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      alert('Access denied: Admins only');
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      setMessage('Failed to load users');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, { role: newRole });
      setMessage('Role updated');
      fetchUsers(); // Refresh list
    } catch (err) {
      setMessage('Failed to update role');
    }
  };

  const handleEdit = async (userId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
      setMessage('User updated');
      fetchUsers();
    } catch (err) {
      setMessage('Failed to update user');
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name}! You have admin privileges.</p>
      {message && <p>{message}</p>}

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleEdit(u._id, {
                      name: prompt('New name:', u.name),
                      phone: prompt('New phone:', u.phone),
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
