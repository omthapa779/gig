import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const HomeNavbar = ({ handleSmoothScroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect (same as original)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click (same as original)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "How it Works", path: "#how-it-works" },
    { name: "Services", path: "#services" },
    { name: "Why Us", path: "#features" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-white py-4 border-b border-transparent"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 group">
              GIG<span className="text-blue-600 group-hover:animate-pulse">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleSmoothScroll(e, link.path)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.hash === link.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions (Dashboard-like dropdown) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={dropdownOpen}
              >
                <span className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Log In
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 py-2 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right transform transition-all">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Choose account
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      Log in as
                    </p>
                  </div>

                  <Link
                    to="/freelancer/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-user-tie mr-2 text-gray-400"></i>
                    Freelancer Login
                  </Link>

                  <Link
                    to="/company/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-building mr-2 text-gray-400"></i>
                    Company Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setDropdownOpen(false);
              }}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (same structure as dashboard) */}
      <div
        className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                location.hash === link.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
              onClick={(e) => {
                handleSmoothScroll(e, link.path);
                setIsOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}

          <div className="border-t border-gray-100 my-2 pt-2">
            <Link
              to="/freelancer/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-user-tie mr-2 text-gray-400"></i>
              Freelancer Login
            </Link>

            <Link
              to="/company/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <i className="fa-solid fa-building mr-2 text-gray-400"></i>
              Company Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
