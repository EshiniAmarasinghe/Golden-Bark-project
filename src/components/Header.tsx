import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // if you use react-router
import { logout } from "../services/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

 const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!storedUser.first_name; // True if a user object exists
  const userName = storedUser.first_name 
    ? `${storedUser.first_name} ${storedUser.last_name}` 
    : "Guest User";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Our Products" },
    { to: "/contact", label: "Contact Us" },
  ];
   const navigate = useNavigate();

 // Inside Header.tsx
const handleLogout = () => {
  localStorage.removeItem("user"); 

  logout(); 

  // 4. Redirect the user
  navigate("/login");
  window.location.reload(); 
};
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-yellow-800 via-yellow-900 to-amber-900 text-white shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-yellow-900 font-bold text-xl"></span>
            <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 text-sm lg:text-base font-medium text-yellow-50 hover:text-yellow-300 transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Profile Icon/Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full transition-all duration-300"
              >
                <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="hidden md:block text-sm font-semibold">
                  {userName.split(" ")[0]}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-amber-100">
                    <p className="font-bold text-amber-900">{userName}</p>
                    <p className="text-xs text-amber-600">john@example.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-amber-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    My Profile
                  </Link>
                  <a
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-amber-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    My Orders
                  </a>
                  <a
                    href="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-amber-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Wishlist
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-amber-900 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>
                  <div className="border-t border-amber-100 mt-2">
                    <button      
                     onClick={handleLogout}
                     className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors w-full">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className=" rounded-b-full hidden md:block px-6 py-2.5 bg-yellow-400 text-yellow-900 rounded-full font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
             
            </a>
          )}

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-yellow-400 text-yellow-900 rounded-full font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-yellow-200 rounded-full transform transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-yellow-200 rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-yellow-200 rounded-full transform transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-yellow-700/30">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-yellow-50 hover:bg-yellow-800/50 hover:text-yellow-300 rounded-lg transition-all duration-200 transform hover:translate-x-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-4 px-4 py-3 bg-yellow-400 text-yellow-900 text-center rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
