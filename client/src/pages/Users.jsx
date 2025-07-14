import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // for editing
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        setError('Failed to delete user.');
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, formData);
      const updatedUsers = users.map((u) => (u._id === selectedUser._id ? res.data : u));
      setUsers(updatedUsers);
      closeModal();
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Picture</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {u.profilePicture ? (
                      <img
                        src={`http://localhost:5000/uploads/${u.profilePicture}`}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.phone}</td>
                  <td className="px-6 py-4">{u.address}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${u.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => openEditModal(u)}
                      className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-gray-700">Edit User</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
