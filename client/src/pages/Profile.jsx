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
      <div className="modal">
        <p>Please log in to view your profile.</p>
        <button onClick={onClose}>Close</button>
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
      setMessage('Profile picture updated!');
    } catch (err) {
      setMessage('Failed to upload image.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>My Profile</h2>

        <div>
          <strong>Name:</strong> {user.name} <br />
          <strong>Email:</strong> {user.email} <br />
          <strong>Phone:</strong> {user.phone} <br />
          <strong>Address:</strong> {user.address} <br />
          <strong>Role:</strong> {user.role}
        </div>

        <div style={{ marginTop: '20px' }}>
          <strong>Profile Picture:</strong><br />
          {user.profilePicture ? (
            <img
              src={`http://localhost:5000/uploads/${user.profilePicture}`}
              alt="Profile"
              style={{ width: '100px', borderRadius: '50%' }}
            />
          ) : (
            <p>No profile picture</p>
          )}
        </div>

        <div style={{ marginTop: '10px' }}>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {message && <p>{message}</p>}
        </div>

        <button onClick={logoutUser} style={{ marginTop: '20px' }}>
          Logout
        </button>

        <button onClick={onClose} style={{ marginTop: '10px' }}>
          Close
        </button>
      </div>
    </div>
  );
}
