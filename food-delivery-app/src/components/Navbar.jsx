import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast'; // Import Toaster and toast

const Navbar = ({ cartItems, onCartOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Profile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu toggle
  const [cartItemCount, setCartItemCount] = useState(0); // Track cart items count
  const [profilePic, setProfilePic] = useState(null); // Profile picture state
  const profileMenuRef = useRef(null); // Reference for detecting outside clicks

  // Fetch user info and profile picture on component mount
  useEffect(() => {
    const updateUserInfo = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user) {
        setIsLoggedIn(true);
        setProfilePic(user.profilePic || null); // Load profile picture if available
      } else {
        setIsLoggedIn(false);
        setProfilePic(null); // Reset if no user
      }
    };

    updateUserInfo();

    // Listen for storage changes to update in real-time
    window.addEventListener("storage", updateUserInfo);

    return () => {
      window.removeEventListener("storage", updateUserInfo);
    };
  }, []);

  // Update cart item count when cartItems changes
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showProfileMenu]);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu); // Toggle profile menu
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear user data
    setIsLoggedIn(false);
    setShowProfileMenu(false); // Close menu after logout
    setProfilePic(null); // Reset profile picture
    toast.success('logged Out!')
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle hamburger menu
  };

  const handleCartClick = () => {
    onCartOpen(); // Open cart
    setCartItemCount(0); // Reset cart notification
  };

  return (
    <nav className="bg-gray-700 shadow-lg sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-white">
          ForkNDelight
        </Link>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </div>

        {/* Menu for Large Screens */}
        <ul
          className={`lg:flex lg:space-x-6 items-center ${
            isMenuOpen
              ? "flex flex-col absolute bg-white shadow-lg top-16 left-0 w-full py-4 px-6"
              : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="text-white hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="text-white hover:text-gray-300 transition"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition"
            >
              Contact
            </Link>
          </li>
          <li className="relative">
            <div onClick={handleCartClick} className="cursor-pointer">
              <FaShoppingCart
                size={20}
                className="text-white hover:text-gray-300"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-red-500 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border border-red-500">
                  {cartItemCount}
                </span>
              )}
            </div>
          </li>

          {/* Profile Icon or Profile Picture */}
          <li className="relative" ref={profileMenuRef}>
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={toggleProfileMenu}
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-red-500"
                />
              ) : (
                <FaUserCircle className="text-white hover:text-gray-300 text-2xl" /> // Default user icon
              )}
            </div>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 w-40">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
