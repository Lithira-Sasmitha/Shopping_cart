import { useState } from 'react';
import Profile from '../pages/Profile'; // adjust path

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav>
      {/* Your other navbar content */}

      <img
        src="/path/to/profile-icon.png"
        alt="Profile"
        onClick={() => setShowProfile(true)}
        style={{ cursor: 'pointer', width: '40px', borderRadius: '50%' }}
      />

      <Profile show={showProfile} onClose={() => setShowProfile(false)} />
    </nav>
  );
}
