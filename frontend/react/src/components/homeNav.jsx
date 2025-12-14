import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/icon.png";
import "./styles/homeNav.css";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`hn-navbar ${scrolled ? "hn-navbar--scrolled" : ""}`}
      >
        <div className="hn-container">
          <div className="hn-row">
            {/* Logo */}
            <div className="hn-logoWrap">
              <Link to="/" className="hn-logoLink">
                <img src={logo} alt="GIG logo" className="hn-logoImg" />
                <span className="hn-logoText">
                  GIG<span className="hn-dot">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop links + dropdown + search */}
            <div className="hn-desktop">
              {/* Links */}
              <div className="hn-links">
                {navLinks.map((link) => (
                  <a
                    key={link.hash}
                    href={link.hash}
                    onClick={(e) => handleSmoothScroll(e, link.hash)}
                    className={`hn-link ${
                      isActive(link.hash) ? "hn-link--active" : ""
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Login dropdown */}
              <div className="hn-login" ref={loginRef}>
                <button
                  type="button"
                  onClick={() => setLoginOpen((v) => !v)}
                  aria-expanded={loginOpen}
                  className="hn-loginBtn"
                >
                  <span>Log In</span>
                  <i
                    className={`fa-solid fa-chevron-down hn-chevron ${
                      loginOpen ? "hn-chevron--open" : ""
                    }`}
                  />
                </button>

                {loginOpen && (
                  <div className="hn-dropdown">
                    <Link
                      to="/freelancer/login"
                      className="hn-ddItem"
                      onClick={() => setLoginOpen(false)}
                    >
                      <i className="fa-solid fa-user-tie hn-ddIcon" />
                      Freelancer Login
                    </Link>

                    <Link
                      to="/company/login"
                      className="hn-ddItem"
                      onClick={() => setLoginOpen(false)}
                    >
                      <i className="fa-solid fa-building hn-ddIcon" />
                      Company Login
                    </Link>
                  </div>
                )}
              </div>

              {/* Search bar */}
              <div className="hn-searchWrap">
                <i className="fa-solid fa-search hn-searchIcon" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="hn-search"
                />
              </div>
            </div>

            {/* Mobile buttons */}
            <div className="hn-mobileBtns">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="hn-menuBtn"
              >
                <i className="fa-solid fa-bars hn-menuIcon" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`hn-overlay ${sidebarOpen ? "hn-overlay--open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* MOBILE SIDEBAR */}
      <aside className={`hn-sidebar ${sidebarOpen ? "hn-sidebar--open" : ""}`}>
        {/* Header */}
        <div className="hn-sideHeader">
          <Link
            to="/"
            className="hn-sideLogo"
            onClick={() => setSidebarOpen(false)}
          >
            <img src={logo} alt="GIG logo" className="hn-sideLogoImg" />
            <span className="hn-sideLogoText">
              GIG<span className="hn-dot">.</span>
            </span>
          </Link>

          <button
            type="button"
            className="hn-closeBtn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark hn-closeIcon" />
          </button>
        </div>

        {/* Links */}
        <nav className="hn-sideLinks">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              onClick={(e) => handleSmoothScroll(e, link.hash)}
              className={`hn-sideLink ${
                isActive(link.hash) ? "hn-sideLink--active" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hn-sideActions">
          <div className="hn-sideBlock">
            <p className="hn-sideTitle">Log In</p>

            <div className="hn-sideList">
              <Link
                to="/freelancer/login"
                onClick={() => setSidebarOpen(false)}
                className="hn-sideItem"
              >
                <i className="fa-solid fa-user-tie hn-sideItemIcon" />
                <span>Freelancer Login</span>
              </Link>

              <Link
                to="/company/login"
                onClick={() => setSidebarOpen(false)}
                className="hn-sideItem"
              >
                <i className="fa-solid fa-building hn-sideItemIcon" />
                <span>Company Login</span>
              </Link>
            </div>
          </div>

          <div className="hn-sideBlock">
            <p className="hn-sideTitle">Join</p>

            <div className="hn-sideCtas">
              <Link
                to="/company/register"
                onClick={() => setSidebarOpen(false)}
                className="hn-cta hn-cta--primary"
              >
                Hire Talent
              </Link>

              <Link
                to="/freelancer/register"
                onClick={() => setSidebarOpen(false)}
                className="hn-cta hn-cta--ghost"
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
