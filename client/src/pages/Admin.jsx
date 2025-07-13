import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

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
      setMessage('');
    } catch {
      setMessage('Failed to load users');
    }
  };

  const handleEdit = async (userId, updatedData) => {
    if (!updatedData.name || !updatedData.phone) return; // cancel if prompt cancelled or empty
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
      setMessage('User updated');
      fetchUsers();
    } catch {
      setMessage('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setMessage('User deleted successfully');
      fetchUsers();
    } catch {
      setMessage('Failed to delete user');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
  `http://localhost:5000/api/users/${userId}/role`,
  { role: newRole },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

    } catch {
      setMessage('Failed to update role');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <p className="mb-6 text-lg text-gray-700">
          Welcome, <span className="font-semibold text-indigo-600">{user?.name}</span>! You have admin privileges.
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-md bg-indigo-100 text-indigo-700 font-medium">
            {message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
            <thead className="bg-indigo-100">
              <tr>
                {['Name', 'Email', 'Phone', 'Role', 'Change Role', 'Actions'].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((u, idx) => (
                <tr
                  key={u._id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{u.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{u.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">{u.role}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
  value={u.role}
  onChange={(e) => handleRoleChange(u._id, e.target.value)}
  className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="inventory">Inventory</option>
</select>

                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
                    <button
                      onClick={() =>
                        handleEdit(u._id, {
                          name: prompt('New name:', u.name),
                          phone: prompt('New phone:', u.phone),
                        })
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
