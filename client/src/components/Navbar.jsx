import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // for navigation
import Profile from '../pages/Profile'; // adjust path
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo or brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer select-none">
              ShopEasy
            </h1>
          </div>

          {/* Right side - Cart and Profile */}
          <div className="flex items-center gap-4" ref={dropdownRef}>
            {user ? (
              <>
                {/* Cart Icon */}
                <Link to="/cart" title="View Cart">
                  <img
                    src="\img\shopping-cart.png"
                    alt="Cart"
                    className="h-7 w-7 cursor-pointer hover:scale-110 transition"
                  />
                </Link>

                {/* Profile Picture */}
                <img
                  src={
                    user.profilePicture
                      ? `http://localhost:5000/uploads/${user.profilePicture}`
                      : '/default-profile-icon.png'
                  }
                  alt="Profile"
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-indigo-500 hover:border-indigo-700 transition"
                  title="Open Profile"
                />

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <Profile show={showProfile} onClose={() => setShowProfile(false)} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-600 italic select-none">Not logged in</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
