import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../../components/floatingMenu";
import "./categories.css";
import SmoothScroll from "@/components/SmoothScroll";

const Categories = () => {
  useEffect(() => {
    document.title = "gig - Service Categories";
  }, []);

  const categories = useMemo(
    () => [
      {
        title: "Development",
        slug: "development",
        icon: "fa-code",
        desc: "Web, mobile, AI, automation.",
        tags: ["Website", "App", "AI", "API"],
      },
      {
        title: "Design",
        slug: "design",
        icon: "fa-pen-nib",
        desc: "Branding, UI/UX, graphics.",
        tags: ["Logo", "UI/UX", "Poster", "Brand"],
      },
      {
        title: "Writing",
        slug: "writing",
        icon: "fa-feather",
        desc: "Copywriting, blogs, scripts.",
        tags: ["SEO", "Blog", "Ad Copy", "Script"],
      },
      {
        title: "Video & Animation",
        slug: "video-animation",
        icon: "fa-video",
        desc: "Editing, reels, motion design.",
        tags: ["Reels", "YouTube", "Motion", "Ads"],
      },
      {
        title: "Marketing",
        slug: "marketing",
        icon: "fa-bullhorn",
        desc: "Social, performance, growth.",
        tags: ["Social", "Ads", "Strategy", "Brand"],
      },
      {
        title: "Business",
        slug: "business",
        icon: "fa-briefcase",
        desc: "Plans, research, operations.",
        tags: ["Pitch", "Research", "Ops", "Consult"],
      },
      {
        title: "Local Gigs",
        slug: "local-gigs",
        icon: "fa-map-location-dot",
        desc: "Physical tasks near you.",
        tags: ["Moving", "Repair", "Help", "Delivery"],
      },
      {
        title: "Photography",
        slug: "photography",
        icon: "fa-camera",
        desc: "Product, portrait, events.",
        tags: ["Product", "Portrait", "Event", "Edit"],
      },
      {
        title: "Music & Audio",
        slug: "music-audio",
        icon: "fa-music",
        desc: "Voiceovers, mixing, jingles.",
        tags: ["VO", "Mix", "Master", "Jingle"],
      },
      {
        title: "Data & Analytics",
        slug: "data-analytics",
        icon: "fa-chart-line",
        desc: "Dashboards, insights, reports.",
        tags: ["Excel", "BI", "Data", "Reports"],
      },
      {
        title: "IT & Support",
        slug: "it-support",
        icon: "fa-headset",
        desc: "Setup, troubleshooting, help.",
        tags: ["Setup", "Fix", "Support", "Security"],
      },
      {
        title: "Education",
        slug: "education",
        icon: "fa-graduation-cap",
        desc: "Tutoring, assignments, training.",
        tags: ["Tutor", "Notes", "Course", "Mentor"],
      },
    ],
    []
  );

  const filters = useMemo(
    () => ["All", "Digital", "Local", "Creative", "Business"],
    []
  );

  const categoryType = (slug) => {
    if (slug === "local-gigs") return "Local";
    if (
      ["design", "video-animation", "photography", "music-audio", "writing"].includes(
        slug
      )
    )
      return "Creative";
    if (["business", "marketing"].includes(slug)) return "Business";
    return "Digital";
  };

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      const t = categoryType(c.slug);
      const passFilter = activeFilter === "All" ? true : t === activeFilter;
      if (!passFilter) return false;
      if (!q) return true;
      const hay = `${c.title} ${c.desc} ${c.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [categories, query, activeFilter]);

  const rootRef = useRef(null);

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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll(".cat-card[data-animate]");
    els.forEach((el) => el.classList.remove("is-visible"));

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
  }, [query, activeFilter]);

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
        <div className="categories-page" ref={rootRef}>
          <Navbar />
          <FloatingMenu />
          <section className="cat-hero">
            <div className="cat-hero-bg" aria-hidden="true" />
            <div className="container cat-hero-content">
              <div
                className="cat-badge reveal-up"
                data-animate
                style={{ "--delay": "0ms" }}
              >
                <span className="cat-badge-dot" />
                Browse Services
              </div>
              <h1
                className="cat-title reveal-up"
                data-animate
                style={{ "--delay": "120ms" }}
              >
                Find the right service for your <span className="cat-accent">next task</span>.
              </h1>
              <p
                className="cat-subtitle reveal-up"
                data-animate
                style={{ "--delay": "240ms" }}
              >
                From digital work to hyper-local gigs, explore categories and start in minutes.
              </p>
              <div
                className="cat-controls reveal-up"
                data-animate
                style={{ "--delay": "360ms" }}
              >
                <div className="cat-search">
                  <i className="fa-solid fa-magnifying-glass" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="cat-search-input"
                    placeholder="Search categories (e.g., logo, moving, web)"
                    aria-label="Search categories"
                  />
                </div>
                <div className="cat-filters" role="tablist" aria-label="Category filters">
                  {filters.map((f) => (
                    <button
                      key={f}
                      className={`cat-filter ${activeFilter === f ? "active" : ""}`}
                      onClick={() => setActiveFilter(f)}
                      type="button"
                      role="tab"
                      aria-selected={activeFilter === f}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className="cat-stats fade-in"
                data-animate
                style={{ "--delay": "420ms" }}
              >
                <div className="cat-stat">
                  <p className="cat-stat-value">{categories.length}</p>
                  <p className="cat-stat-label">Categories</p>
                </div>
                <div className="cat-stat">
                  <p className="cat-stat-value">0 fees</p>
                  <p className="cat-stat-label">to browse</p>
                </div>
                <div className="cat-stat">
                  <p className="cat-stat-value">Local</p>
                  <p className="cat-stat-label">work supported</p>
                </div>
              </div>
            </div>
          </section>
          <main className="cat-main">
            <div className="container">
              <div className="cat-header-row">
                <h2
                  className="cat-section-title reveal-left"
                  data-animate
                  style={{ "--delay": "0ms" }}
                >
                  Categories
                </h2>
                <p
                  className="cat-count reveal-right"
                  data-animate
                  style={{ "--delay": "0ms" }}
                >
                  Showing <span>{visible.length}</span> of <span>{categories.length}</span>
                </p>
              </div>
              <div className="cat-grid">
                {visible.map((c, idx) => {
                  const t = categoryType(c.slug);
                  return (
                    <Link
                      key={c.slug}
                      to={`/services/${c.slug}`}
                      className="cat-card reveal-up"
                      data-animate
                      style={{ "--delay": `${idx * 60}ms` }}
                    >
                      <div className="cat-card-top">
                        <div className={`cat-icon ${t.toLowerCase()}`}>
                          <i className={`fa-solid ${c.icon}`} />
                        </div>
                        <span className={`cat-pill ${t.toLowerCase()}`}>{t}</span>
                      </div>
                      <h3 className="cat-card-title">{c.title}</h3>
                      <p className="cat-card-desc">{c.desc}</p>
                      <div className="cat-tags">
                        {c.tags.slice(0, 4).map((tag) => (
                          <span key={`${c.slug}-${tag}`} className="cat-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="cat-card-cta">
                        <span>Explore</span>
                        <i className="fa-solid fa-arrow-right" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="cat-empty" style={{ display: visible.length ? "none" : "grid" }}>
                <div className="cat-empty-card reveal-up" data-animate style={{ "--delay": "0ms" }}>
                  <div className="cat-empty-icon">
                    <i className="fa-solid fa-face-frown" />
                  </div>
                  <h3 className="cat-empty-title">No matches found</h3>
                  <p className="cat-empty-text">Try a different keyword or switch the filter.</p>
                  <button
                    type="button"
                    className="cat-empty-btn"
                    onClick={() => {
                      setQuery("");
                      setActiveFilter("All");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </main>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </div>
    </SmoothScroll>
  );
};

export default Categories;
