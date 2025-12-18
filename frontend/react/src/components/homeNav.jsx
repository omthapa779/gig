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
    { name: "How it Works", hash: "#how-it-works", type: "hash" },
    { name: "Services", hash: "#services", type: "hash" },
    { name: "Why Us", hash: "#features", type: "hash" },
    { name: "Explore Jobs", path: "/explore-jobs", type: "link" },
  ];

  const isActive = (hash) => location.hash === hash;

  const onLinkClick = (e, link) => {
    if (link.type === 'link') return; // Default behavior for router links

    if (typeof handleSmoothScroll === "function") {
      handleSmoothScroll(e, link.hash);
      setSidebarOpen(false);
      return;
    }

    e.preventDefault();
    const el = document.querySelector(link.hash);
    if (!el) return;

    const nav = document.getElementById("navbar");
    const navH = nav ? nav.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
    setSidebarOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!loginRef.current) return;
      if (!loginRef.current.contains(e.target)) setLoginOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setLoginOpen(false);
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav
        id="navbar"
        className={`hn-navbar ${scrolled ? "hn-navbar--float" : ""}`}
      >
        <div className="hn-container">
          <div className="hn-row">
            <div className="hn-logoWrap">
              <Link to="/" className="hn-logoLink" aria-label="Go to home">
                <img src={logo} alt="gig logo" className="hn-logoImg" />
                <span className="hn-logoText">
                  gig<span className="hn-dot">.</span>
                </span>
              </Link>
            </div>

            <div className="hn-desktop">
              <div className="hn-links">
                {navLinks.map((link) => (
                  link.type === 'link' ? (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="hn-link"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.hash}
                      onClick={(e) => onLinkClick(e, link)}
                      className={`hn-link ${isActive(link.hash) ? "hn-link--active" : ""
                        }`}
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </div>

              <div className={`hn-login ${loginOpen ? "hn-login--open" : ""}`} ref={loginRef}>
                <button
                  type="button"
                  onClick={() => setLoginOpen((v) => !v)}
                  aria-expanded={loginOpen}
                  className={`hn-loginBtn ${loginOpen ? "hn-loginBtn--active" : ""}`}
                >
                  <span>Log In</span>
                  <i className="fa-solid fa-chevron-down hn-chevron" />
                </button>

                <div className="hn-dropdown" role="menu">
                  <Link
                    to="/freelancer/login"
                    className="hn-ddItem hn-underlineItem"
                    onClick={() => setLoginOpen(false)}
                  >
                    <i className="fa-solid fa-user-tie hn-ddIcon" />
                    Freelancer Login
                  </Link>

                  <Link
                    to="/company/login"
                    className="hn-ddItem hn-underlineItem"
                    onClick={() => setLoginOpen(false)}
                  >
                    <i className="fa-solid fa-building hn-ddIcon" />
                    Company Login
                  </Link>
                </div>
              </div>

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

      <div
        className={`hn-overlay ${sidebarOpen ? "hn-overlay--open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`hn-sidebar ${sidebarOpen ? "hn-sidebar--open" : ""}`}>
        <div className="hn-sideHeader">
          <Link
            to="/"
            className="hn-sideLogo"
            onClick={() => setSidebarOpen(false)}
          >
            <img src={logo} alt="gig logo" className="hn-sideLogoImg" />
            <span className="hn-sideLogoText">
              gig<span className="hn-dot">.</span>
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

        <nav className="hn-sideLinks">
          {navLinks.map((link) => (
            link.type === 'link' ? (
              <Link
                key={link.name}
                to={link.path}
                className="hn-sideLink"
                onClick={() => setSidebarOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.hash}
                onClick={(e) => onLinkClick(e, link)}
                className={`hn-sideLink ${isActive(link.hash) ? "hn-sideLink--active" : ""
                  }`}
              >
                {link.name}
              </a>
            )
          ))}
        </nav>

        <div className="hn-sideActions">
          <div className="hn-sideBlock">
            <p className="hn-sideTitle">Log In</p>

            <div className="hn-sideList">
              <Link
                to="/freelancer/login"
                onClick={() => setSidebarOpen(false)}
                className="hn-sideItem hn-underlineItem"
              >
                <i className="fa-solid fa-user-tie hn-sideItemIcon" />
                <span>Freelancer Login</span>
              </Link>

              <Link
                to="/company/login"
                onClick={() => setSidebarOpen(false)}
                className="hn-sideItem hn-underlineItem"
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
