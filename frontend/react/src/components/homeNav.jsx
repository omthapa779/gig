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

  /* New Dropdown State */
  const [aboutOpen, setAboutOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Timeout refs for grace period
  const aboutTimer = useRef(null);
  const catTimer = useRef(null);
  const loginTimer = useRef(null);

  // Helper to handle hover open
  const handleOpen = (setter, timerRef) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setter(true);
  };

  // Helper to handle hover close with delay
  const handleClose = (setter, timerRef) => {
    timerRef.current = setTimeout(() => {
      setter(false);
    }, 250); // 250ms grace period
  };

  // Categories Data
  const categories = [
    { title: "Physical Jobs", path: "#", icon: "fa-person-digging", color: "text-green-600" },
    { title: "Development", path: "#", icon: "fa-code", color: "text-blue-600" },
    { title: "Design", path: "#", icon: "fa-pen-nib", color: "text-purple-600" },
    { title: "Video & Animation", path: "#", icon: "fa-video", color: "text-orange-600" },
    { title: "Sales & Marketing", path: "#", icon: "fa-bullhorn", color: "text-blue-500" },
    { title: "Writing", path: "#", icon: "fa-pen-fancy", color: "text-purple-500" },
    { title: "Finance", path: "#", icon: "fa-chart-line", color: "text-green-500" },
    { title: "Education", path: "#", icon: "fa-graduation-cap", color: "text-orange-500" },
  ];

  /* Auth State */
  const [userRole, setUserRole] = useState("guest"); // guest, freelancer, company

  useEffect(() => {
    const checkAuth = async () => {
      // Try freelancer first
      try {
        const res = await fetch('/api/freelancer/me');
        if (res.ok) {
          setUserRole("freelancer");
          return;
        }
      } catch (e) { }

      // Try company
      try {
        const res = await fetch('/api/company/me');
        if (res.ok) {
          setUserRole("company");
          return;
        }
      } catch (e) { }

      setUserRole("guest");
    };
    checkAuth();
  }, [location.pathname]); // Re-check on route change if needed, or just once on mount? Better on mount + route change if valid token might expire/logout.


  /* Close dropdowns on outside click */
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.hn-dropdown-trigger') && !e.target.closest('.hn-mega-menu')) {
        setAboutOpen(false);
        setCategoriesOpen(false);
        setLoginOpen(false);
      }
    };
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  const onScrollLink = (e, hash) => {
    e.preventDefault();
    setAboutOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      const navH = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


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
                  Gig<span className="hn-dot">.</span>
                </span>
              </Link>
            </div>

            <div className="hn-desktop">
              <div className="hn-links">

                {/* CATEGORIES MEGA MENU TRIGGER */}
                <div
                  className="hn-nav-item hn-dropdown-trigger"
                  onMouseEnter={() => handleOpen(setCategoriesOpen, catTimer)}
                  onMouseLeave={() => handleClose(setCategoriesOpen, catTimer)}
                >
                  <button className={`hn-link-btn ${categoriesOpen ? 'active' : ''}`}>
                    Categories <i className="fa-solid fa-chevron-down ml-1 text-xs opacity-70"></i>
                  </button>
                  {/* MEGA MENU */}
                  <div className={`hn-mega-menu ${categoriesOpen ? 'open' : ''}`}>
                    <div className="hn-mega-content">
                      {categories.map((cat, i) => (
                        <Link to={cat.path} key={i} className="hn-mega-item" onClick={() => setCategoriesOpen(false)}>
                          <i className={`fa-solid ${cat.icon} ${cat.color} mr-3`}></i>
                          <span>{cat.title}</span>
                        </Link>
                      ))}
                      <div className="hn-mega-footer">
                        <Link to="/explore-jobs" onClick={() => setCategoriesOpen(false)}>
                          View All Categories <i className="fa-solid fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>


                <Link to="/explore-jobs" className="hn-link">Explore Jobs</Link>

                {/* ABOUT DROPDOWN TRIGGER */}
                <div
                  className="hn-nav-item hn-dropdown-trigger"
                  onMouseEnter={() => handleOpen(setAboutOpen, aboutTimer)}
                  onMouseLeave={() => handleClose(setAboutOpen, aboutTimer)}
                >
                  <button className={`hn-link-btn ${aboutOpen ? 'active' : ''}`}>
                    About <i className="fa-solid fa-chevron-down ml-1 text-xs opacity-70"></i>
                  </button>
                  <div className={`hn-simple-dropdown ${aboutOpen ? 'open' : ''}`}>
                    <Link to="/about" className="hn-drop-link">About Us</Link>
                    <a href="#how-it-works" onClick={(e) => onScrollLink(e, "#how-it-works")} className="hn-drop-link">How it Works</a>
                    <a href="#features" onClick={(e) => onScrollLink(e, "#features")} className="hn-drop-link">Why Us</a>
                  </div>
                </div>


              </div>

              {userRole === 'guest' ? (
                <div
                  className={`hn-login ${loginOpen ? "hn-login--open" : ""}`}
                  ref={loginRef}
                  onMouseEnter={() => handleOpen(setLoginOpen, loginTimer)}
                  onMouseLeave={() => handleClose(setLoginOpen, loginTimer)}
                >
                  <button
                    type="button"
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
              ) : (
                <Link
                  to={userRole === 'company' ? "/company/profile" : "/freelancer/profile"}
                  className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all text-sm"
                >
                  {userRole === 'company' ? (
                    <>
                      <i className="fa-solid fa-building-user"></i>
                      <span>Dashboard</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-circle"></i>
                      <span>My Profile</span>
                    </>
                  )}
                </Link>
              )}

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
          <Link to="/explore-jobs" className="hn-sideLink" onClick={() => setSidebarOpen(false)}>
            Explore Jobs
          </Link>
          <Link to="/about" className="hn-sideLink" onClick={() => setSidebarOpen(false)}>
            About Us
          </Link>
          <a href="#how-it-works" className="hn-sideLink" onClick={(e) => {
            setSidebarOpen(false);
            onScrollLink(e, "#how-it-works");
          }}>
            How it Works
          </a>
          <a href="#features" className="hn-sideLink" onClick={(e) => {
            setSidebarOpen(false);
            onScrollLink(e, "#features");
          }}>
            Why Us
          </a>
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
