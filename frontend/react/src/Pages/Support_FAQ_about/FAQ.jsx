import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style/style.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../../components/floatingMenu";
import Footer from "@/components/footer";

const FAQ = () => {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  useEffect(() => {
    document.title = "FAQ - Gig";
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

  const faqs = [
    {
      q: "Do freelancers need to buy connects?",
      a: "No. Gig is built to be fair. You can apply to jobs without paying for access."
    },
    {
      q: "How does Nepal ID verification work?",
      a: "We verify your identity to keep the platform safe and trusted for everyone."
    },
    {
      q: "How do payments work?",
      a: "Clients fund a job first. Once work is approved, you get paid through supported Nepali payment methods."
    },
    {
      q: "Can I find local physical gigs?",
      a: "Yes. You can filter by location to find tasks near you — moving help, repairs, deliveries, etc."
    },
    {
      q: "What if there’s a dispute?",
      a: "Use the dispute button in chat. Our support team reviews evidence and resolves fairly."
    }
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="page" ref={rootRef}>
        <Navbar />
        <FloatingMenu />
        <section className="page-hero">
          <div className="container page-hero-content">
            <div className="badge reveal-up" data-animate>
              <span className="badge-dot"></span>
              FAQs
            </div>
            <h1 className="page-title reveal-up" data-animate style={{ "--delay": "120ms" }}>
              Questions, answered.
            </h1>
            <p className="page-subtitle reveal-up" data-animate style={{ "--delay": "240ms" }}>
              Everything you need to know about using Gig.
            </p>
            <div className="faq-search reveal-up" data-animate style={{ "--delay": "320ms" }}>
              <i className="fa-solid fa-search"></i>
              <input
                placeholder="Search FAQs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        <section className="faq-list">
          <div className="container">
            <div className="faq-card fade-in" data-animate>
              {filtered.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {item.q}
                      <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="faq-help fade-in" data-animate>
              <h3>Still stuck?</h3>
              <p>Our support team is one message away.</p>
              <Link to="/support" className="btn-primary">Go to Support</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </SmoothScroll>
  );
};

export default FAQ;