import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Profile({ show, onClose }) {
  const { user, loginUser, logoutUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  if (!show) return null;

  if (!user) {
    return (
      <div className="p-4">
        <p className="text-red-600">Please log in to view your profile.</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm"
        >
          Close
        </button>
      </div>
    );
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/profile-picture/${user.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const updatedUser = { ...user, profilePicture: res.data.profilePicture };
      loginUser(updatedUser);
      setMessage('✅ Profile picture updated!');
    } catch (err) {
      setMessage('❌ Failed to upload image.');
    }
  };

  return (
    <div className="p-4 w-full text-sm text-gray-800 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-3 text-indigo-700 border-b pb-1">My Profile</h2>

      <div className="mb-4 space-y-1">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
        <p><span className="font-medium">Address:</span> {user.address}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2">Profile Picture:</p>
        {user.profilePicture ? (
          <img
            src={`http://localhost:5000/uploads/${user.profilePicture}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border shadow-sm object-cover"
          />
        ) : (
          <p className="text-gray-500 italic">No profile picture</p>
        )}
      </div>

      <div className="mb-4 space-y-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm"
        >
          Upload
        </button>
        {message && <p className="text-sm mt-1 text-blue-600">{message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={logoutUser}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm"
        >
          Logout
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
