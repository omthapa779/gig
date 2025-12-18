import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./resources/styles/home.css";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../components/floatingMenu";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/footer";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const smoothScrollTo = (targetY, duration = 900) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const progress = Math.min(time / duration, 1);
      const eased = easeOutExpo(progress);
      window.scrollTo(0, startY + diff * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

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
      <div className="app" ref={rootRef}>
        <Navbar />
        <FloatingMenu />
        <section className="hero">
          <div className="hero-bg-svg" id="hero-svg">
            <svg
              width="800"
              height="800"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#0F62FE"
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,71.1,32.8C60,44.2,49.1,54.2,37.1,62.8C25.1,71.4,12,78.6,-0.6,79.6C-13.2,80.6,-25.9,75.4,-37.4,67.4C-48.9,59.4,-59.2,48.6,-67.6,36.3C-76,24,-82.5,10.2,-81.1,-3.1C-79.7,-16.4,-70.4,-29.2,-60.2,-39.8C-50,-50.4,-38.9,-58.8,-27.1,-67.8C-15.3,-76.8,-2.8,-86.4,10.2,-84.6C23.2,-82.8,30.5,-83.6,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="container hero-content">
            <div
              className="badge reveal-up"
              data-animate
              style={{ "--delay": "0ms" }}
            >
              <span className="badge-dot"></span>
              #1 Fair Marketplace in Nepal
            </div>
            <h1
              className="hero-title reveal-up"
              data-animate
              style={{ "--delay": "120ms" }}
            >
              Nepal's Fair Marketplace for <br />
              <span className="gradient-text">Digital & Local Work.</span>
            </h1>
            <p
              className="hero-description reveal-up"
              data-animate
              style={{ "--delay": "240ms" }}
            >
              From coding to physical tasks, find work near you without buying
              'connects'. The fair start every beginner deserves.
            </p>
            <div
              className="hero-buttons reveal-up"
              data-animate
              style={{ "--delay": "360ms" }}
            >
              <Link to="/company/register" className="btn-primary">
                Hire Talent
              </Link>
              <Link to="/freelancer/register" className="btn-secondary">
                Join as Freelancer
              </Link>
            </div>
            <div
              className="trust-strip fade-in"
              data-animate
              style={{ "--delay": "200ms" }}
            >
              <p className="trust-label">Trusted by Nepalese Businesses</p>
              <div className="marquee-container">
                <div className="marquee-content">
                  {Array(8) // Increased duplication for smoother infinite loop
                    .fill([
                      "Daraz",
                      "eSewa",
                      "Khalti",
                      "Pathao",
                      "WorldLink",
                      "Foodmandu",
                      "Bhoj",
                      "Indrive"
                    ])
                    .flat()
                    .map((brand, i) => (
                      <span key={`${brand}-${i}`}>{brand}</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="services">
          <div className="container">
            <div className="section-header fade-in" data-animate>
              <h2 className="section-title">How it Works</h2>
              <p className="section-description">Simple steps to get started with Gig.</p>
            </div>

            <div className="services-grid">
              {[
                { title: "Create Profile", icon: "fa-user-plus", text: "Sign up as a freelancer or company in seconds.", delay: "0" },
                { title: "Post or Find", icon: "fa-magnifying-glass", text: "Post a job or browse our extensive physical & digital live feed.", delay: "120" },
                { title: "Connect & Earn", icon: "fa-handshake", text: "Collaborate, get paid securely, and build your reputation.", delay: "240" }
              ].map((step, i) => (
                <div key={i} className="service-card reveal-up" data-animate style={{ "--delay": `${step.delay}ms` }}>
                  <div className="service-icon blue">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <h3 className="service-title">{step.title}</h3>
                  <p className="service-text">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="services" className="services alt">
          <div className="container">
            <div className="section-header fade-in" data-animate>
              <h2 className="section-title">Popular Categories</h2>
              <p className="section-description">Browse the most in-demand skills and services.</p>
            </div>
            <div className="services-grid">
              {[
                {
                  title: "Physical Jobs",
                  slug: "local-gigs",
                  icon: "fa-person-digging",
                  color: "green",
                  text: "Plumbing, Moving, Labor.",
                  highlight: true
                },
                {
                  title: "Development",
                  slug: "development",
                  icon: "fa-code",
                  color: "blue",
                  text: "Web, Mobile, AI & more.",
                },
                {
                  title: "Design",
                  slug: "design",
                  icon: "fa-pen-nib",
                  color: "purple",
                  text: "Logo, UI/UX, Art.",
                },
                {
                  title: "Video",
                  slug: "video-animation",
                  icon: "fa-video",
                  color: "orange",
                  text: "Editing, Animation.",
                },
                {
                  title: "Sales & Marketing",
                  slug: "marketing",
                  icon: "fa-bullhorn",
                  color: "blue",
                  text: "SEO, Social Media.",
                },
                {
                  title: "Writing",
                  slug: "writing",
                  icon: "fa-pen-fancy",
                  color: "purple",
                  text: "Content, Translation.",
                },
                {
                  title: "Finance",
                  slug: "business",
                  icon: "fa-chart-line",
                  color: "green",
                  text: "Accounting, Tax.",
                },
                {
                  title: "Education",
                  slug: "education",
                  icon: "fa-graduation-cap",
                  color: "orange",
                  text: "Tutoring, Coaching.",
                },
              ].map((card, i) => (
                <Link
                  to={`/services/${card.slug}`}
                  key={card.title}
                  className={`service-card reveal-up ${card.highlight ? 'ring-2 ring-yellow-400 bg-yellow-50/50' : ''}`}
                  data-animate
                  style={{ "--delay": `${i * 120}ms` }}
                >
                  <div className={`service-icon ${card.color}`}>
                    <i className={`fa-solid ${card.icon}`}></i>
                  </div>
                  <h3 className="service-title">{card.title}</h3>
                  <p className="service-text">{card.text}</p>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12 reveal-up" data-animate style={{ "--delay": "200ms" }}>
              <Link to="/explore-jobs" className="btn-secondary">
                View All Categories
                <i className="fa-solid fa-arrow-right ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="features">
          <div className="container">
            <div className="features-header reveal-up" data-animate>
              <h2 className="features-title">Why businesses choose Gig?</h2>
              <p className="features-subtitle">We're redefining how work gets done. Simple, transparent, and built for Nepal.</p>
            </div>

            <div className="features-grid-clean">
              {[
                {
                  title: "Hyper-Local Gigs",
                  text: "Find temporary physical work in your neighborhood. Filter by location and start earning instantly.",
                  icon: "fa-map-pin"
                },
                {
                  title: "Zero Barriers",
                  text: "No hidden fees or 'connects' to buy. Our algorithm promotes talent, not deep pockets.",
                  icon: "fa-unlock"
                },
                {
                  title: "Verified Nepal ID",
                  text: "Trust built on real identities. Secure and safe for everyone in Nepal.",
                  icon: "fa-id-card"
                }
              ].map((feature, i) => (
                <div key={i} className="feature-card-clean reveal-up" data-animate style={{ "--delay": `${i * 150}ms` }}>
                  <div className="feature-icon-box">
                    <i className={`fa-solid ${feature.icon}`}></i>
                  </div>
                  <h3 className="feature-title-clean">{feature.title}</h3>
                  <p className="feature-description-clean">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </div >
    </SmoothScroll >
  );
};

export default App;
