import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style/style.css";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Navbar from "@/components/homeNav";

const Support = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    document.title = "Support - Gig";
  }, []);

  //reveal system
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const topics = [
    {
      title: "Payments & Withdrawals",
      icon: "fa-wallet",
      text: "Help with eSewa/Khalti payouts, refunds, and escrow payments.",
      color: "blue",
      link: "/faq#payments",
    },
    {
      title: "Account & Verification",
      icon: "fa-id-card",
      text: "Nepal ID verification, profile setup, and security tips.",
      color: "purple",
      link: "/faq#verification",
    },
    {
      title: "Posting & Applying",
      icon: "fa-briefcase",
      text: "Clients posting jobs and freelancers applying smoothly.",
      color: "green",
      link: "/faq#jobs",
    },
    {
      title: "Disputes & Safety",
      icon: "fa-shield-halved",
      text: "Report issues, resolve disputes, and stay safe.",
      color: "orange",
      link: "/faq#safety",
    },
  ];

  return (
    <ReactLenis root options={{duration: 1.2 , smoothWheel: true}}>
        <div className="page" ref={rootRef}>
          <Navbar /> 
          <section className="page-hero">
            <div className="container page-hero-content">
              <div className="badge reveal-up" data-animate>
                <span className="badge-dot"></span>
                Support Center
              </div>
              <h1 className="page-title reveal-up" data-animate style={{ "--delay": "120ms" }}>
                How can we help you today?
              </h1>
              <p className="page-subtitle reveal-up" data-animate style={{ "--delay": "240ms" }}>
                Browse popular topics or send us a message. We usually reply within 24 hours.
              </p>
            </div>
          </section>
          <section className="support-topics">
            <div className="container">
              <div className="services-grid">
                {topics.map((t, i) => (
                  <Link
                    key={t.title}
                    to={t.link}
                    className="service-card reveal-up"
                    data-animate
                    style={{ "--delay": `${i * 120}ms` }}
                  >
                    <div className={`service-icon ${t.color}`}>
                      <i className={`fa-solid ${t.icon}`}></i>
                    </div>
                    <h3 className="service-title">{t.title}</h3>
                    <p className="service-text">{t.text}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <section className="support-contact alt">
            <div className="container support-contact-grid">
              <div className="support-card fade-in" data-animate>
                <h2 className="support-card-title">Contact Support</h2>
                <p className="support-card-text">
                  Tell us what’s going on. The more detail, the faster we can help.
                </p>
                <form className="support-form">
                  <div className="form-row">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" />
                  </div>
                  <div className="form-row">
                    <label>Email</label>
                    <input type="email" placeholder="you@gmail.com" />
                  </div>
                  <div className="form-row">
                    <label>Topic</label>
                    <select>
                      <option>Payments</option>
                      <option>Account</option>
                      <option>Jobs</option>
                      <option>Disputes</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Message</label>
                    <textarea rows="5" placeholder="Explain your issue..."></textarea>
                  </div>
                  <button className="btn-primary" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="support-card fade-in" data-animate style={{ "--delay": "120ms" }}>
                <h2 className="support-card-title">Other Ways</h2>
                <div className="support-ways">
                  <div className="support-way">
                    <i className="fa-solid fa-envelope"></i>
                    <div>
                      <p className="support-way-title">Email</p>
                      <p className="support-way-text">support@gig.com.np</p>
                    </div>
                  </div>
                  <div className="support-way">
                    <i className="fa-solid fa-phone"></i>
                    <div>
                      <p className="support-way-title">Phone</p>
                      <p className="support-way-text">+977-98XXXXXXXX</p>
                    </div>
                  </div>
                  <div className="support-way">
                    <i className="fa-solid fa-comments"></i>
                    <div>
                      <p className="support-way-title">Live Chat</p>
                      <p className="support-way-text">Coming soon</p>
                    </div>
                  </div>
                </div>
                <div className="support-links">
                  <Link to="/faq" className="btn-secondary full">Read FAQs</Link>
                  <Link to="/" className="btn-secondary full">Go Home</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
    </ReactLenis>
  );
};

export default Support;
