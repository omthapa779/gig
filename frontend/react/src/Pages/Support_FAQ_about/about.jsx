import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style/style.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/homeNav";

const About = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    document.title = "About Us - Gig";
  }, []);

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

  const values = [
    {
      title: "Fair Opportunity",
      text: "No paid connects. Talent rises because of skill, not spending.",
      icon: "fa-scale-balanced",
      color: "blue",
    },
    {
      title: "Built for Nepal",
      text: "Local + digital gigs, Nepali language support, Nepal-first needs.",
      icon: "fa-mountain-sun",
      color: "green",
    },
    {
      title: "Verified Identity",
      text: "Nepal ID verification keeps the marketplace safe and trusted.",
      icon: "fa-id-card",
      color: "purple",
    },
    {
      title: "Secure Payments",
      text: "Protected transactions designed around Nepali payment rails.",
      icon: "fa-lock",
      color: "orange",
    },
  ];

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="page" ref={rootRef}>
        <Navbar />
        <section className="page-hero">
          <div className="container page-hero-content">
            <div className="badge reveal-up" data-animate>
              <span className="badge-dot"></span>
              About Gig
            </div>
            <h1 className="page-title reveal-up" data-animate style={{ "--delay": "120ms" }}>
              A fair marketplace for Nepal’s workforce.
            </h1>
            <p className="page-subtitle reveal-up" data-animate style={{ "--delay": "240ms" }}>
              We’re making freelancing accessible to everyone — from digital experts
              to hyper-local workers.
            </p>
          </div>
        </section>
        <section className="about-story">
          <div className="container about-story-grid">
            <div className="about-block reveal-left" data-animate>
              <h2 className="block-title">Why we exist</h2>
              <p className="block-text">
                Nepal has incredible talent, but most platforms aren’t built for
                our reality. Gig is designed to remove barriers, create trust,
                and connect work to people who deserve it — without gatekeeping.
              </p>
              <p className="block-text">
                Whether you’re a student doing your first logo, a pro developer,
                or someone taking local jobs, Gig helps you earn fairly and safely.
              </p>
            </div>
            <div className="about-highlight reveal-right" data-animate>
              <div className="highlight-card">
                <h3>Our mission</h3>
                <p>
                  Empower Nepal’s workforce with fair opportunities, local trust,
                  and secure payments.
                </p>
              </div>
              <div className="highlight-card">
                <h3>Our vision</h3>
                <p>
                  The most trusted place in Nepal to hire, work, and grow skills.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about-values alt">
          <div className="container">
            <div className="section-header fade-in" data-animate>
              <h2 className="section-title">Our Values</h2>
              <p className="section-description">
                The principles we won’t compromise on.
              </p>
            </div>
            <div className="services-grid">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="service-card reveal-up"
                  data-animate
                  style={{ "--delay": `${i * 120}ms` }}
                >
                  <div className={`service-icon ${v.color}`}>
                    <i className={`fa-solid ${v.icon}`}></i>
                  </div>
                  <h3 className="service-title">{v.title}</h3>
                  <p className="service-text">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="about-cta">
          <div className="container about-cta-inner fade-in" data-animate>
            <h2>Be part of the Gig community</h2>
            <p>Start hiring or start earning today.</p>
            <div className="hero-buttons">
              <Link to="/company/register" className="btn-primary">Hire Talent</Link>
              <Link to="/freelancer/register" className="btn-secondary">Join as Freelancer</Link>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default About;
