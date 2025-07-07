import { useState, useContext } from 'react';
import Profile from '../pages/Profile'; // adjust path
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav>
      {/* Your other navbar content */}

      {user && (
        <img
          src={user.profilePicture ? `http://localhost:5000/uploads/${user.profilePicture}` : '/default-profile-icon.png'}
          alt="Profile"
          onClick={() => setShowProfile(true)}
          style={{ cursor: 'pointer', width: '40px', borderRadius: '50%' }}
        />
      )}

      <Profile show={showProfile} onClose={() => setShowProfile(false)} />
    </nav>
  );
}
