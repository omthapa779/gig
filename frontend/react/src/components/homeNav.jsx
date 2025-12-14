import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/icon.png";

const HomeNavbar = ({ handleSmoothScroll }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const loginRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "How it Works", hash: "#how-it-works" },
    { name: "Services", hash: "#services" },
    { name: "Why Us", hash: "#features" },
  ];

  const isActive = (hash) => location.hash === hash;

  /* ===== Scroll effect (same idea as reference navbar) ===== */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== Close login dropdown on outside click / ESC ===== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!loginRef.current) return;
      if (!loginRef.current.contains(e.target)) setLoginOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setLoginOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-4"
          : "bg-white py-5 border-b border-transparent"
          }`}
      >
        <div className="w-full px-5 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className='flex items-center gap-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 transition-transform hover:scale-105'
              >
                <img
                  src={logo}
                  alt="GIG logo"
                  className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
                />
                <span>
                  GIG<span className="text-blue-600">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop links + dropdown + search (same format as home.jsx) */}
            <div className="hidden md:flex items-center gap-5 lg:gap-7">
              {/* Links */}
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={(e) => handleSmoothScroll(e, link.hash)}
                  className={`text-base font-bold transition-colors duration-200 ${isActive(link.hash)
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-slate-900"
                    }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Login dropdown – same box style as reference navbar */}
              <div className="relative flex items-center" ref={loginRef}>
                <button
                  type="button"
                  onClick={() => setLoginOpen((v) => !v)}
                  aria-expanded={loginOpen}
                  className="inline-flex items-center gap-1.5 text-base font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>Log In</span>
                  <i
                    className={`fa-solid fa-chevron-down text-[11px] text-gray-400 transition-transform duration-200 ${loginOpen ? "rotate-180" : ""
                      }`}
                  ></i>
                </button>

                {loginOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right transform transition-all z-50">

                    <Link
                      to="/freelancer/login"
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setLoginOpen(false)}
                    >
                      <i className="fa-solid fa-user-tie mr-2 text-gray-400 text-sm"></i>
                      Freelancer Login
                    </Link>

                    <Link
                      to="/company/login"
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setLoginOpen(false)}
                    >
                      <i className="fa-solid fa-building mr-2 text-gray-400 text-sm"></i>
                      Company Login
                    </Link>
                  </div>
                )}
              </div>

              {/* Search bar (same position as home.jsx) */}
              <div className="relative w-52 lg:w-64 xl:w-72 transition-[width] duration-300 ease-out focus-within:w-80">
                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full h-10 rounded-full border border-slate-200 bg-white pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition"
                />
              </div>
            </div>

            {/* Mobile buttons (keep format similar to home.jsx: only menu, optional search icon) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="h-10 w-10 rounded-xl border border-slate-200 bg-white grid place-items-center text-slate-700"
              >
                <i className="fa-solid fa-bars text-lg" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 ${sidebarOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-[0_20px_60px_rgba(15,23,42,0.45)] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col px-4 py-4 font-sans`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-900"
            onClick={() => setSidebarOpen(false)}
          >
            <img
              src={logo}
              alt="GIG logo"
              className="h-7 w-7 object-contain"
            />
            <span>
              GIG<span className="text-blue-600">.</span>
            </span>
          </Link>
          <button
            type="button"
            className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-200 grid place-items-center text-slate-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              onClick={(e) => handleSmoothScroll(e, link.hash)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive(link.hash)
                ? "bg-blue-50 text-blue-700"
                : "text-slate-900 hover:bg-slate-50"
                }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="mt-auto space-y-4 pb-2">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Log In
            </p>
            <div className="space-y-1">
              <Link
                to="/freelancer/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <i className="fa-solid fa-user-tie text-slate-400" />
                <span>Freelancer Login</span>
              </Link>
              <Link
                to="/company/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <i className="fa-solid fa-building text-slate-400" />
                <span>Company Login</span>
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Join
            </p>
            <div className="space-y-2">
              <Link
                to="/company/register"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Hire Talent
              </Link>
              <Link
                to="/freelancer/register"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition"
              >
                Join as Freelancer
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default HomeNavbar;
