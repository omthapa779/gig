import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../components/floatingMenu";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/footer";
import "./resources/styles/home.css"; 
import { motion, useMotionValue, useSpring } from "framer-motion";


const App = () => {
  useEffect(() => {
    document.title = "Gig - The Future of Freelancing";
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    const closeOnOutside = (e) => {
      if (!loginRef.current) return;
      if (!loginRef.current.contains(e.target)) setLoginOpen(false);
    };
    const closeOnEsc = (e) => {
      if (e.key === "Escape") setLoginOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEsc);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-animate]");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.classList.add("is-visible");
              });
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="bg-white text-[#1A1A1A] font-['Outfit'] selection:bg-yellow-200" ref={rootRef}>
        <Navbar />
        <FloatingMenu />

        {/* Hero Section */}
        <section className="pt-[100px] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div
              className="badge reveal-up inline-flex items-center gap-2 bg-white/80 border border-gray-200/60 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-[0.8rem] tracking-widest uppercase mb-6 shadow-sm"
              data-animate
              style={{ "--delay": "0ms" }}
            >
              <span className="h-2 w-2 bg-[#FFD021] rounded-full shadow-[0_0_10px_rgba(255,208,33,0.6)]"></span>
              #1 Fair Marketplace in Nepal
            </div>
            
            <h1
              className="reveal-up text-[clamp(2.8rem,5.5vw,4.8rem)] font-extrabold leading-[1.05] tracking-tight text-gray-900 mb-0"
              data-animate
              style={{ "--delay": "120ms" }}
            >
              Nepal's Fair Marketplace for <br />
              <span className="bg-gradient-to-br from-[#FFD021] to-[#F59E0B] bg-clip-text text-transparent inline-block">Digital & Local Work.</span>
            </h1>

            <p
              className="reveal-up text-[clamp(1.1rem,2vw,1.35rem)] text-gray-600 max-w-[720px] mx-auto my-6 md:my-9 font-medium leading-relaxed"
              data-animate
              style={{ "--delay": "240ms" }}
            >
              From coding to physical tasks, find work near you without buying
              'connects'. The fair start every beginner deserves.
            </p>

            <div
              className="reveal-up flex justify-center gap-4 flex-wrap"
              data-animate
              style={{ "--delay": "360ms" }}
            >
              <Link to="/company/register" className="px-7 py-3.5 rounded-[14px] font-bold text-base tracking-widest uppercase flex items-center justify-center transition-all duration-300 bg-[#1A1A1A] text-white shadow-xl hover:-translate-y-1 hover:bg-black hover:border-white/10">
                Hire Talent
              </Link>
              <Link to="/freelancer/register" className="px-7 py-3.5 rounded-[14px] font-bold text-base tracking-widest uppercase flex items-center justify-center transition-all duration-300 bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-lg">
                Join as Freelancer
              </Link>
            </div>

            <div className="fade-in mt-10 pt-10 border-t border-black/5" data-animate style={{ "--delay": "200ms" }}>
              <p className="inline-block text-[0.75rem] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-6 bg-black/5 px-3 py-1.5 rounded-full">
                Trusted by Nepalese Businesses
              </p>
              <div className="marquee-container overflow-hidden">
                <div className="marquee-content flex gap-20 w-max py-4">
                  {Array(8).fill(["Daraz", "eSewa", "Khalti", "Pathao", "WorldLink", "Foodmandu", "Bhoj", "Indrive"]).flat().map((brand, i) => (
                    <span key={`${brand}-${i}`} className="text-2xl font-extrabold text-gray-300 hover:text-gray-800 transition-colors duration-300">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-[60px] bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 fade-in" data-animate>
              <h2 className="text-[50px] font-extrabold mb-3">How it Works</h2>
              <p className="text-xl text-gray-500 font-medium">Simple steps to get started with Gig.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 relative max-w-[1200px] mx-auto step-connector">
              {[
                { title: "Create Profile", icon: "fa-user-plus", text: "Sign up as a freelancer or company in seconds.", delay: "0" },
                { title: "Post or Find", icon: "fa-magnifying-glass", text: "Post a job or browse our extensive physical & digital live feed.", delay: "120" },
                { title: "Connect & Earn", icon: "fa-handshake", text: "Collaborate, get paid securely, and build your reputation.", delay: "240" }
              ].map((step, i) => (
                <div key={i} className="reveal-up flex-[0_1_350px] max-w-[350px] bg-white p-8 rounded-[20px] border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all duration-[350ms] hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-400/30 z-[1]" data-animate style={{ "--delay": `${step.delay}ms` }}>
                  <div className="h-16 w-16 rounded-[20px] grid place-items-center mb-5 text-2xl transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-[0.95rem] text-gray-500 font-medium leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="services" className="py-[60px] bg-[#F8FAFC] relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 fade-in" data-animate>
              <h2 className="text-[50px] font-extrabold mb-3">Popular Categories</h2>
              <p className="text-xl text-gray-500 font-medium">Browse the most in-demand skills and services.</p>
            </div>
            
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 justify-center">
              {[
                { title: "Physical Jobs", slug: "local-gigs", icon: "fa-person-digging", color: "bg-emerald-50 text-emerald-600", text: "Plumbing, Moving, Labor.", highlight: true },
                { title: "Development", slug: "development", icon: "fa-code", color: "bg-blue-50 text-blue-600", text: "Web, Mobile, AI & more." },
                { title: "Design", slug: "design", icon: "fa-pen-nib", color: "bg-purple-50 text-purple-600", text: "Logo, UI/UX, Art." },
                { title: "Video", slug: "video-animation", icon: "fa-video", color: "bg-orange-50 text-orange-600", text: "Editing, Animation." },
                { title: "Sales & Marketing", slug: "marketing", icon: "fa-bullhorn", color: "bg-blue-50 text-blue-600", text: "SEO, Social Media." },
                { title: "Writing", slug: "writing", icon: "fa-pen-fancy", color: "bg-purple-50 text-purple-600", text: "Content, Translation." },
                { title: "Finance", slug: "business", icon: "fa-chart-line", color: "bg-emerald-50 text-emerald-600", text: "Accounting, Tax." },
                { title: "Education", slug: "education", icon: "fa-graduation-cap", color: "bg-orange-50 text-orange-600", text: "Tutoring, Coaching." },
              ].map((card, i) => (
                <Link
                  to={`/services/${card.slug}`}
                  key={card.title}
                  className={`reveal-up group bg-white p-8 rounded-[20px] border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all duration-[350ms] hover:-translate-y-2 hover:shadow-2xl`}
                  data-animate
                  style={{ "--delay": `${i * 120}ms` }}
                >
                  <div className={`h-16 w-16 rounded-[20px] grid place-items-center mb-5 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${card.color}`}>
                    <i className={`fa-solid ${card.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-[0.95rem] text-gray-500 font-medium leading-relaxed">{card.text}</p>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12 reveal-up" data-animate style={{ "--delay": "200ms" }}>
              <Link to="/explore-jobs" className="px-7 py-3.5 rounded-[14px] font-bold text-base tracking-widest uppercase inline-flex items-center justify-center transition-all duration-300 bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-lg">
                View All Categories
                <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-[700px] mx-auto mb-16 reveal-up" data-animate>
              <h2 className="text-[2.5rem] font-extrabold mb-4 text-gray-900 tracking-tight">Why businesses choose Gig?</h2>
              <p className="text-[1.1rem] text-gray-500 leading-relaxed">We're redefining how work gets done. Simple, transparent, and built for Nepal.</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 max-w-[1200px] mx-auto">
              {[
                { title: "Hyper-Local Gigs", icon: "fa-map-pin", text: "Find temporary physical work in your neighborhood. Filter by location and start earning instantly." },
                { title: "Zero Barriers", icon: "fa-unlock", text: "No hidden fees or 'connects' to buy. Our algorithm promotes talent, not deep pockets." },
                { title: "Verified Nepal ID", icon: "fa-id-card", text: "Trust built on real identities. Secure and safe for everyone in Nepal." }
              ].map((feature, i) => (
                <div key={i} className="reveal-up group bg-white p-10 rounded-[24px] border border-black/5 shadow-md transition-all duration-300 flex flex-col items-start hover:-translate-y-2 hover:shadow-xl hover:border-yellow-400/40" data-animate style={{ "--delay": `${i * 150}ms` }}>
                  <div className="h-14 w-14 bg-yellow-50 text-[#F59E0B] rounded-[16px] grid place-items-center text-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#F59E0B] group-hover:text-white">
                    <i className={`fa-solid ${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </div>
    </SmoothScroll>
  );
};

export default App;