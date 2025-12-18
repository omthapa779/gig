import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../../components/floatingMenu";
import "../Categories/categories.css"; // Reuse Categories styles
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "../../components/footer";

const JobFeed = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = useMemo(() => ["All", "Remote", "On-Site", "Full-Time", "Contract"], []);

    useEffect(() => {
        document.title = "Explore Jobs | Gig";
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return jobs.filter((job) => {
            // Filter Logic
            let passFilter = true;
            if (activeFilter === "Remote") passFilter = !job.isPhysical;
            if (activeFilter === "On-Site") passFilter = job.isPhysical;
            // For now, we don't have Full-Time/Contract in DB, so we skip those or infer

            if (!passFilter) return false;

            if (!q) return true;
            const hay = `${job.title} ${job.company?.companyName} ${job.category} ${job.location}`.toLowerCase();
            return hay.includes(q);
        });
    }, [jobs, query, activeFilter]);

    const rootRef = useRef(null);

    // Animation Logic (Copied from Categories)
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
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" } // Lower threshold for long lists
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [loading, visible]); // Re-run when list changes

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
            <div className="categories-page" ref={rootRef}>
                <Navbar />
                <FloatingMenu />

                {/* HERO */}
                <section className="cat-hero">
                    <div className="cat-hero-bg" aria-hidden="true" />
                    <div className="container cat-hero-content">
                        <div className="cat-badge reveal-up" data-animate style={{ "--delay": "0ms" }}>
                            <span className="cat-badge-dot" />
                            Opportunity Feed
                        </div>
                        <h1 className="cat-title reveal-up" data-animate style={{ "--delay": "120ms" }}>
                            Explore the best <span className="cat-accent">jobs & gigs</span>.
                        </h1>
                        <p className="cat-subtitle reveal-up" data-animate style={{ "--delay": "240ms" }}>
                            Find work that fits your life. From remote freelance gigs to full-time on-site roles.
                        </p>

                        <div className="cat-controls reveal-up" data-animate style={{ "--delay": "360ms" }}>
                            <div className="cat-search">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="cat-search-input"
                                    placeholder="Search jobs (e.g., React, Design, Kathmandu)"
                                    aria-label="Search jobs"
                                />
                            </div>
                            <div className="cat-filters" role="tablist">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        className={`cat-filter ${activeFilter === f ? "active" : ""}`}
                                        onClick={() => setActiveFilter(f)}
                                        type="button"
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="cat-stats fade-in" data-animate style={{ "--delay": "420ms" }}>
                            <div className="cat-stat">
                                <p className="cat-stat-value">{jobs.length}</p>
                                <p className="cat-stat-label">Active Jobs</p>
                            </div>
                            <div className="cat-stat">
                                <p className="cat-stat-value">24h</p>
                                <p className="cat-stat-label">New Postings</p>
                            </div>
                            <div className="cat-stat">
                                <p className="cat-stat-value">100%</p>
                                <p className="cat-stat-label">Verified Clients</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN LIST */}
                <main className="cat-main">
                    <div className="container">
                        <div className="cat-header-row">
                            <h2 className="cat-section-title reveal-left" data-animate style={{ "--delay": "0ms" }}>
                                Latest Openings
                            </h2>
                            <p className="cat-count reveal-right" data-animate style={{ "--delay": "0ms" }}>
                                Showing <span>{visible.length}</span> of <span>{jobs.length}</span>
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                            </div>
                        ) : visible.length > 0 ? (
                            <div className="cat-grid">
                                {visible.map((job, idx) => (
                                    <Link
                                        key={job._id}
                                        to={`/job/${job._id}`}
                                        className="cat-card reveal-up"
                                        data-animate
                                        style={{ "--delay": `${(idx % 6) * 60}ms` }}
                                    >
                                        <div className="cat-card-top">
                                            <div className="flex items-center gap-3">
                                                {job.company?.logo ? (
                                                    <img src={job.company.logo} alt="co" className="w-11 h-11 rounded-xl object-cover border border-gray-100 bg-gray-50" />
                                                ) : (
                                                    <div className="cat-icon business">
                                                        <i className="fa-solid fa-briefcase" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{job.company?.companyName || "Company"}</span>
                                                    <span className="text-xs font-semibold text-gray-500">{job.location || "Remote"}</span>
                                                </div>
                                            </div>
                                            <span className={`cat-pill ${job.isPhysical ? 'local' : 'digital'}`}>
                                                {job.isPhysical ? 'On-Site' : 'Remote'}
                                            </span>
                                        </div>

                                        <h3 className="cat-card-title line-clamp-1">{job.title}</h3>
                                        <p className="cat-card-desc line-clamp-2">
                                            {job.description}
                                        </p>

                                        <div className="cat-tags">
                                            <span className="cat-tag">{job.category}</span>
                                            <span className="cat-tag">NPR {job.pay || "Confidential"}</span>
                                        </div>

                                        <div className="cat-card-cta">
                                            <span>View Job</span>
                                            <i className="fa-solid fa-arrow-right" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            /* EMPTY STATE */
                            <div className="cat-empty">
                                <div className="cat-empty-card reveal-up" data-animate style={{ "--delay": "0ms" }}>
                                    <div className="cat-empty-icon">
                                        <i className="fa-solid fa-face-frown" />
                                    </div>
                                    <h3 className="cat-empty-title">No jobs found</h3>
                                    <p className="cat-empty-text">Try adjusting your search or filters.</p>
                                    <button
                                        type="button"
                                        className="cat-empty-btn"
                                        onClick={() => { setQuery(""); setActiveFilter("All"); }}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </main>

                <Footer />
            </div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        </SmoothScroll>
    );
};

export default JobFeed;
