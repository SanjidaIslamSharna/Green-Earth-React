import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config.js"; // adjust path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#15803D] py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center justify-start gap-2">
          <button
            className="flex items-center md:hidden justify-center w-8 h-8 rounded-full"
            id="burger"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <Link
            to="/"
            className="text-white text-2xl font-semibold hover:text-yellow-300"
          >
            Green Earth
          </Link>
        </div>

        {/* Middle: Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#about"
              className="text-white text-lg font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white text-lg font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Right: Login/User Dropdown */}
        <div className="relative">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FDE047] px-4 py-2 rounded-full text-[#15803D] font-semibold hover:bg-yellow-300 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white px-4 py-2 rounded-full text-[#15803D] font-semibold hover:bg-gray-100 transition"
              >
                {user.displayName || user.email.split("@")[0]}
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
