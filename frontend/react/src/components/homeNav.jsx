import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/icon.png";

const HomeNavbar = ({ handleSmoothScroll }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState("guest");

  const location = useLocation();
  const navigate = useNavigate();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const aboutTimer = useRef(null);
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
    timerRef.current = setTimeout(() => setter(false), 250);
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
    setAboutOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-[#eef2f7] transition-all duration-300 font-['Outfit'] 
        ${scrolled ? "-translate-y-1 shadow-[0_18px_40px_rgba(16,24,40,0.12)]" : ""}`}
      >
        <div className="w-full max-w-full px-[5%]">
          <div className="min-h-[80px] py-3 flex items-center justify-between gap-3.5">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="inline-flex items-center gap-1 no-underline text-[#1a1a1a]">
                <img src={logo} alt="gig logo" className="w-14 h-14 object-contain" />
                <span className="text-4xl font-extrabold tracking-tight leading-none">
                  Gig<span className="text-[#ffd021]">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-[18px]">
              <div className="flex items-center gap-5">
                
                {/* Categories Mega Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleOpen(setCategoriesOpen, catTimer)}
                  onMouseLeave={() => handleClose(setCategoriesOpen, catTimer)}
                >
                  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider transition-all hover:bg-black/5 ${categoriesOpen ? 'bg-black/5 text-[#1a1a1a]' : 'text-gray-600'}`}>
                    Categories <i className="fa-solid fa-chevron-down text-[10px] opacity-70 ml-1"></i>
                  </button>
                  
                  <div className={`fixed top-20 left-0 w-full bg-white border-y border-gray-200/60 shadow-2xl py-8 flex justify-center transition-all duration-300 z-50 
                    ${categoriesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                    <div className="max-w-[1200px] w-full px-[5%] grid grid-cols-4 gap-6">
                      {categories.map((cat, i) => (
                        <Link to={cat.path} key={i} onClick={() => setCategoriesOpen(false)} className="flex items-center p-4 rounded-xl bg-gray-50 no-underline transition-all hover:bg-white hover:shadow-lg hover:-translate-y-0.5 group">
                          <i className={`fa-solid ${cat.icon} ${cat.color} mr-3`}></i>
                          <span className="font-semibold text-gray-700 text-[0.95rem] group-hover:text-black">{cat.title}</span>
                        </Link>
                      ))}
                      <div className="col-span-4 text-right mt-4 pt-4 border-t border-gray-100">
                        <Link to="/explore-jobs" className="font-bold text-blue-600 no-underline text-[0.9rem] uppercase tracking-wider inline-flex items-center hover:underline">
                          View All Categories <i className="fa-solid fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/explore-jobs" className="relative font-medium text-gray-600 text-[0.95rem] tracking-[0.08em] uppercase py-1.5 transition-all hover:text-black group">
                  Explore Jobs
                  <span className="absolute left-0 right-0 bottom-0.5 h-[2px] bg-[#ffd021]/90 rounded-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </Link>

                {/* About Dropdown */}
                <div className="relative h-full flex items-center"
                  onMouseEnter={() => handleOpen(setAboutOpen, aboutTimer)}
                  onMouseLeave={() => handleClose(setAboutOpen, aboutTimer)}>
                  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider transition-all hover:bg-black/5 ${aboutOpen ? 'bg-black/5 text-[#1a1a1a]' : 'text-gray-600'}`}>
                    About <i className="fa-solid fa-chevron-down text-[10px] opacity-70 ml-1"></i>
                  </button>
                  <div className={`absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[180px] bg-white border border-gray-200/60 rounded-xl shadow-xl p-2 transition-all duration-200 z-50 
                    ${aboutOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <Link to="/about" className="block p-2.5 rounded-lg text-gray-600 font-medium text-[0.9rem] hover:bg-gray-100 hover:text-black transition-colors">About Us</Link>
                    <a href="#how-it-works" onClick={(e) => onScrollLink(e, "#how-it-works")} className="block p-2.5 rounded-lg text-gray-600 font-medium text-[0.9rem] hover:bg-gray-100 hover:text-black transition-colors">How it Works</a>
                    <a href="#features" onClick={(e) => onScrollLink(e, "#features")} className="block p-2.5 rounded-lg text-gray-600 font-medium text-[0.9rem] hover:bg-gray-100 hover:text-black transition-colors">Why Us</a>
                  </div>
                </div>
              </div>

              {/* Auth / Profile */}
              {userRole === 'guest' ? (
                <div className="relative"
                  onMouseEnter={() => handleOpen(setLoginOpen, loginTimer)}
                  onMouseLeave={() => handleClose(setLoginOpen, loginTimer)}>
                  <button className="flex items-center gap-1.5 px-0.5 py-1.5 text-[0.95rem] font-medium uppercase tracking-wider text-[#1a1a1a] opacity-85 hover:opacity-100 transition-opacity">
                    <span>Log In</span>
                    <i className={`fa-solid fa-chevron-down text-[0.85rem] text-gray-500 transition-transform duration-200 ${loginOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-[calc(100%+10px)] right-0 min-w-[210px] bg-white border border-[#eef2f7] rounded-[14px] shadow-[0_24px_50px_rgba(16,24,40,0.18)] p-1.5 transition-all duration-300 origin-top-right z-50 
                    ${loginOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}>
                    <Link to="/freelancer/login" className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-[0.9rem] text-gray-900 hover:bg-[#ffd021]/10 hover:text-[#ffd021] hover:shadow-lg transition-all">
                      <i className="fa-solid fa-user-tie text-gray-400" /> Freelancer Login
                    </Link>
                    <Link to="/company/login" className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-[0.9rem] text-gray-900 hover:bg-[#ffd021]/10 hover:text-[#ffd021] hover:shadow-lg transition-all">
                      <i className="fa-solid fa-building text-gray-400" /> Company Login
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to={userRole === 'company' ? "/company/profile" : "/freelancer/profile"} className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all text-sm">
                  <i className={`fa-solid ${userRole === 'company' ? 'fa-building-user' : 'fa-user-circle'}`}></i>
                  <span>{userRole === 'company' ? 'Dashboard' : 'My Profile'}</span>
                </Link>
              )}

              {/* Search Bar */}
              <div className="relative w-10 h-10 transition-all duration-300 rounded-full bg-white border border-gray-200 hover:w-[320px] focus-within:w-[320px] focus-within:border-[#ffd021] focus-within:ring-4 focus-within:ring-[#ffd021]/20 group overflow-hidden">
                <i className="fa-solid fa-search absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-[0.9rem] group-hover:text-black transition-colors" />
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

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setSidebarOpen(true)} className="h-10.5 w-10.5 rounded-xl border border-gray-200 bg-white grid place-items-center">
                <i className="fa-solid fa-bars text-lg text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[59] bg-gray-900/50 transition-opacity duration-250 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      
      <aside className={`fixed top-0 bottom-0 right-0 w-[min(82vw,340px)] bg-white shadow-2xl transition-transform duration-300 z-[61] flex flex-col p-4.5 font-['Outfit'] ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="inline-flex items-center gap-2.5 text-[#1a1a1a] text-[1.2rem] font-extrabold tracking-widest uppercase">
            <img src={logo} alt="gig logo" className="w-[30px] h-[30px] object-contain" />
            <span>gig<span className="text-[#ffd021]">.</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="h-10 w-10 rounded-xl bg-slate-50 border border-gray-100 grid place-items-center">
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 py-3.5">
          {["Explore Jobs", "About Us"].map((link) => (
            <Link key={link} to={link === "Explore Jobs" ? "/explore-jobs" : "/about"} className="p-3 rounded-xl font-medium text-[0.95rem] text-gray-900 tracking-wider uppercase opacity-90 hover:bg-gray-100 transition-all" onClick={() => setSidebarOpen(false)}>{link}</Link>
          ))}
          <a href="#how-it-works" className="p-3 rounded-xl font-medium text-[0.95rem] text-gray-900 tracking-wider uppercase opacity-90 hover:bg-gray-100 transition-all" onClick={(e) => { setSidebarOpen(false); onScrollLink(e, "#how-it-works"); }}>How it Works</a>
          <a href="#features" className="p-3 rounded-xl font-medium text-[0.95rem] text-gray-900 tracking-wider uppercase opacity-90 hover:bg-gray-100 transition-all" onClick={(e) => { setSidebarOpen(false); onScrollLink(e, "#features"); }}>Why Us</a>
        </nav>

        <div className="mt-auto grid gap-4 pb-2">
          <div className="grid gap-2">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gray-400">Log In</p>
            <div className="grid gap-1.5">
              <Link to="/freelancer/login" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl font-semibold text-[0.9rem] uppercase tracking-wider text-gray-900 bg-white border border-gray-100 hover:bg-[#ffd021]/10 hover:text-[#ffd021] transition-all">
                <i className="fa-solid fa-user-tie text-gray-400" /> Freelancer Login
              </Link>
              <Link to="/company/login" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2.5 p-3 rounded-xl font-semibold text-[0.9rem] uppercase tracking-wider text-gray-900 bg-white border border-gray-100 hover:bg-[#ffd021]/10 hover:text-[#ffd021] transition-all">
                <i className="fa-solid fa-building text-gray-400" /> Company Login
              </Link>
            </div>
          </div>

          <div className="grid gap-2">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gray-400">Join</p>
            <div className="grid gap-2.5">
              <Link to="/company/register" onClick={() => setSidebarOpen(false)} className="relative overflow-hidden isolate px-4 py-2.5 rounded-xl font-medium text-[0.95rem] uppercase tracking-wider text-white bg-[#2a2f3a] text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,208,33,0.7)] hover:text-black before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#ffc107] before:to-[#ff9800] before:opacity-0 hover:before:opacity-100 before:-z-10 before:transition-opacity before:duration-400">
                Hire Talent
              </Link>
              <Link to="/freelancer/register" onClick={() => setSidebarOpen(false)} className="px-4 py-2.5 rounded-xl font-medium text-[0.95rem] uppercase tracking-wider text-[#1a1a1a] bg-white border border-gray-200 text-center hover:bg-gray-50">
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