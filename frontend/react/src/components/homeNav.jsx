import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/icon.png";
import ThemeToggle from './ThemeToggle';

const HomeNavbar = ({ handleSmoothScroll }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState("guest");

  const location = useLocation();
  const navigate = useNavigate();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const catTimer = useRef(null);
  const loginTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resF = await fetch('/api/freelancer/me');
        if (resF.ok) { setUserRole("freelancer"); return; }
        const resC = await fetch('/api/company/me');
        if (resC.ok) { setUserRole("company"); return; }
      } catch (e) { }
      setUserRole("guest");
    };
    checkAuth();
  }, [location.pathname]);

  const handleOpen = (setter, timerRef) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setter(true);
  };

  const handleClose = (setter, timerRef) => {
    timerRef.current = setTimeout(() => setter(false), 150);
  };

  const categories = [
    { title: "Physical Jobs", path: "/explore-jobs?category=Physical%20Jobs", icon: "fa-person-digging", color: "text-green-600" },
    { title: "Development", path: "/explore-jobs?category=Development", icon: "fa-code", color: "text-blue-600" },
    { title: "Design", path: "/explore-jobs?category=Design", icon: "fa-pen-nib", color: "text-purple-600" },
    { title: "Video & Animation", path: "/explore-jobs?category=Video%20%26%20Animation", icon: "fa-video", color: "text-orange-600" },
    { title: "Sales & Marketing", path: "/explore-jobs?category=Sales%20%26%20Marketing", icon: "fa-bullhorn", color: "text-blue-500" },
    { title: "Writing", path: "/explore-jobs?category=Writing", icon: "fa-pen-fancy", color: "text-purple-500" },
    { title: "Finance", path: "/explore-jobs?category=Finance", icon: "fa-chart-line", color: "text-green-500" },
    { title: "Education", path: "/explore-jobs?category=Education", icon: "fa-graduation-cap", color: "text-orange-500" },
  ];

  const onScrollLink = (e, hash) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`site-nav fixed top-0 left-0 right-0 z-[60] backdrop-blur-xl border-b transition-all duration-300 font-['Outfit'] ${scrolled ? "-translate-y-1 shadow-[0_18px_40px_rgba(16,24,40,0.12)]" : ""}`}
        style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)' }}
      >
        <div className="w-full max-w-full px-[5%]">
          <div className="min-h-[80px] py-3 flex items-center justify-between gap-3.5 relative">
            {/* Logo */}
              <div className={`flex items-center overflow-hidden transition-all duration-200 ${mobileSearchOpen ? 'opacity-0 scale-95 pointer-events-none max-w-0 md:opacity-100 md:scale-100 md:pointer-events-auto md:max-w-none' : 'opacity-100 scale-100 max-w-[220px] md:max-w-none'}`}>
              <Link to="/" className="inline-flex items-center gap-1 no-underline" style={{ color: 'var(--text-primary)' }}>
                <img src={logo} alt="gig logo" className="w-14 h-14 object-contain" />
                <span className="text-4xl font-extrabold tracking-tight leading-none">
                  Gig<span style={{ color: 'var(--accent)' }}>.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[18px]">
              <div className="flex items-center gap-5">
                
                {/* Categories Mega Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => { setLoginOpen(false); handleOpen(setCategoriesOpen, catTimer); }}
                  onMouseLeave={() => handleClose(setCategoriesOpen, catTimer)}
                >
                  <button className={`relative group flex items-center gap-1 px-3 py-2 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider transition-all nav-item-text`} style={{ color: 'var(--text-secondary)' }}>
                    <span className="inline-flex items-center gap-1">Categories</span>
                    <span className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#ffd021]/90 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                  </button>
                  
                  <div className={`fixed top-20 left-0 w-full bg-white border-y border-gray-200/60 shadow-2xl py-8 flex justify-center transition-all duration-300 z-50 mega-menu
                    ${categoriesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                    <div className="max-w-[1200px] w-full px-[5%] grid grid-cols-4 gap-6">
                      {categories.map((cat, i) => (
                        <Link to={cat.path} key={i} onClick={() => setCategoriesOpen(false)} className="category-link flex items-center p-4 rounded-xl bg-gray-50 no-underline transition-all hover:bg-white hover:shadow-lg hover:-translate-y-0.5 group">
                          <i className={`fa-solid ${cat.icon} ${cat.color} mr-3`}></i>
                          <span className="font-semibold text-gray-700 text-[0.95rem] group-hover:text-black">{cat.title}</span>
                        </Link>
                      ))}
                      <div className="col-span-4 text-right mt-4 pt-4 border-t border-gray-100">
                        <Link to="/categories" className="view-all-link font-bold no-underline text-[0.9rem] uppercase tracking-wider inline-flex items-center hover:underline" style={{ color: 'var(--text-secondary)' }}>
                          View All Categories <i className="fa-solid fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/explore-jobs"
                  className="relative group flex items-center gap-1 px-3 py-2 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider transition-all nav-item-text"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Explore Jobs
                  <span className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#ffd021]/90 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </Link>

                <Link
                  to="/about"
                  className="relative group flex items-center gap-1 px-3 py-2 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider transition-all nav-item-text"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  About Us
                  <span className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#ffd021]/90 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </Link>
              </div>

              {/* Auth / Profile */}
              {userRole === 'guest' ? (
                <div className="relative"
                  onMouseEnter={() => { setCategoriesOpen(false); handleOpen(setLoginOpen, loginTimer); }}
                  onMouseLeave={() => handleClose(setLoginOpen, loginTimer)}>
                  <button className={`relative group flex items-center gap-1.5 px-0.5 py-1.5 text-[0.95rem] font-medium uppercase tracking-wider transition-all nav-item-text`} style={{ color: 'var(--text-secondary)' }}>
                    <span className="inline-flex items-center gap-2">Log In</span>
                    <span className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#ffd021]/90 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                  </button>
                  <div className={`absolute top-[calc(100%+10px)] right-0 min-w-[210px] menu-surface rounded-[14px] shadow-[0_24px_50px_rgba(0,0,0,0.6)] p-1.5 transition-all duration-300 origin-top-right z-50 
                    ${loginOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
                    <Link to="/freelancer/login" className="flex items-center gap-2.5 p-2.5 rounded-xl menu-link font-semibold text-[0.9rem] transition-all">
                      <i className="fa-solid fa-user-tie menu-icon" /> Freelancer Login
                    </Link>
                    <Link to="/company/login" className="flex items-center gap-2.5 p-2.5 rounded-xl menu-link font-semibold text-[0.9rem] transition-all">
                      <i className="fa-solid fa-building menu-icon" /> Company Login
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to={userRole === 'company' ? "/company/profile" : "/freelancer/profile"} className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all text-sm">
                  <i className={`fa-solid ${userRole === 'company' ? 'fa-building-user' : 'fa-user-circle'}`}></i>
                  <span>{userRole === 'company' ? 'Dashboard' : 'My Profile'}</span>
                </Link>
              )}

              {/* Theme Toggle */}
              <div className="flex items-center">
                <ThemeToggle />
              </div>

              {/* Search Bar */}
              <div className="search-container relative w-10 h-10 transition-all duration-300 rounded-full bg-white border hover:w-[320px] focus-within:w-[320px] focus-within:border-[#ffd021] focus-within:ring-4 focus-within:ring-[#ffd021]/20 group overflow-hidden">
                <i className="fa-solid fa-search search-icon absolute top-1/2 left-3 -translate-y-1/2 text-[0.9rem] transition-colors" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/explore-jobs?search=${encodeURIComponent(searchValue)}`)}
                  className="w-full h-full pl-10 pr-3 border-none bg-transparent outline-none text-[0.9rem] font-medium opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>

            {/* Mobile controls: Theme toggle + Hamburger */}
            <div className="md:hidden flex items-center gap-3 ml-auto relative z-[70]">
              
              {/* Search Toggle */}
              <div className={`relative flex items-center transition-all duration-300 ${mobileSearchOpen ? 'w-[65vw]' : 'w-10'}`}>
                <button
                  type="button"
                  className="h-10 w-10 grid place-items-center rounded-xl border border-white/10"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  style={{ color: 'var(--text-primary)' }}
                >
                  <i className={`fa-solid ${mobileSearchOpen ? 'fa-xmark' : 'fa-search'}`} />
                </button>
                
                {mobileSearchOpen && (
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    className="absolute left-12 w-full h-10 bg-white/10 backdrop-blur-md rounded-lg px-3 outline-none border border-[#ffd021]/30"
                    style={{ color: 'var(--text-primary)' }}
                    onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/explore-jobs?search=${e.target.value}`)}
                  />
                )}
              </div>

              {/* Hamburger Menu Icon */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="h-10 w-10 rounded-xl border border-white/10 grid place-items-center bg-transparent active:scale-95 transition-all"
                style={{ color: 'var(--text-primary)' }}
              >
                <i className="fa-solid fa-bars text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[10050] bg-gray-900/50 transition-opacity duration-250 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      
      <aside className={`home-sidebar fixed top-0 bottom-0 right-0 w-[min(82vw,340px)] site-surface shadow-2xl transition-transform duration-300 z-[10060] flex flex-col p-5 font-['Outfit'] ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}>
        <div className="sidebar-header flex items-center justify-between pb-3 border-b">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="inline-flex items-center gap-2.5" style={{ color: 'var(--text-primary)', fontWeight: 800 }}>
            <img src={logo} alt="gig logo" className="w-[30px] h-[30px] object-contain" />
            <span>gig<span style={{ color: 'var(--accent)' }}>.</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setSidebarOpen(false)} className="h-10 w-10 rounded-xl grid place-items-center" style={{ backgroundColor: 'var(--elevated)', border: 'none', color: 'var(--text-primary)' }}>
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5 py-3.5">
          {["Explore Jobs", "About Us"].map((link) => (
            <Link key={link} to={link === "Explore Jobs" ? "/explore-jobs" : "/about"} className="sidebar-link p-3 rounded-xl font-medium text-[0.95rem] tracking-wider uppercase transition-all" onClick={() => setSidebarOpen(false)}>{link}</Link>
          ))}
          <Link to="/categories" className="sidebar-link p-3 rounded-xl font-medium text-[0.95rem] tracking-wider uppercase transition-all" onClick={() => setSidebarOpen(false)}>Categories</Link>
        </nav>

        <div className="mt-auto grid gap-4 pb-2">
          <div className="grid gap-2">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>Log In</p>
            <div className="grid gap-1.5">
              <Link to="/freelancer/login" onClick={() => setSidebarOpen(false)} className="sidebar-auth-link flex items-center gap-2.5 p-3 rounded-xl font-semibold text-[0.9rem] uppercase tracking-wider transition-all">
                <i className="fa-solid fa-user-tie menu-icon" /> Freelancer Login
              </Link>
              <Link to="/company/login" onClick={() => setSidebarOpen(false)} className="sidebar-auth-link flex items-center gap-2.5 p-3 rounded-xl font-semibold text-[0.9rem] uppercase tracking-wider transition-all">
                <i className="fa-solid fa-building menu-icon" /> Company Login
              </Link>
            </div>
          </div>

          <div className="grid gap-2">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>Join</p>
            <div className="grid gap-2.5">
              <Link to="/company/register" onClick={() => setSidebarOpen(false)} className="sidebar-cta-primary relative overflow-hidden isolate px-4 py-2.5 rounded-xl font-medium text-[0.95rem] uppercase tracking-wider text-center shadow-sm transition-all">
                Hire Talent
              </Link>
              <Link to="/freelancer/register" onClick={() => setSidebarOpen(false)} className="sidebar-cta-secondary px-4 py-2.5 rounded-xl font-medium text-[0.95rem] uppercase tracking-wider text-center transition-all">
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
