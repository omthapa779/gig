import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/homeNav";
import FloatingMenu from "../../components/floatingMenu";
import "../Categories/categories.css"; // Reuse Categories styles
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "../../components/footer";

const CATEGORY_MAP = {
    "development": "Development & IT",
    "design": "Design & Creative",
    "marketing": "Sales & Marketing",
    "writing": "Writing & Translation",
    "video-animation": "Design & Creative", // Map to closest
    "business": "Finance & Accounting", // Map to closest
    "local-gigs": "Local / Physical Labor",
    "photography": "Design & Creative", // Map to closest
    "music-audio": "Design & Creative", // Map to closest
    "data-analytics": "Development & IT", // Map to closest
    "it-support": "Development & IT",
    "education": "Other"
};

const CategoryJobs = () => {
    const { slug } = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    // Map slug to readable category name
    const categoryName = useMemo(() => CATEGORY_MAP[slug] || "Other", [slug]);

    useEffect(() => {
        document.title = `${categoryName} Jobs | Gig`;
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
    }, [categoryName]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();

        // Helper to normalize strings (handle &amp; etc)
        const normalize = (str) => {
            if (!str) return "";
            const txt = document.createElement("textarea");
            txt.innerHTML = str;
            return txt.value.toLowerCase().trim();
        };

        const target = normalize(categoryName);

        // pre-filter by category
        const categoryJobs = jobs.filter(job => {
            const jobCat = normalize(job.category);
            // Check for exact match or if one acts as a substring (e.g. "Development" in "Development & IT")
            return jobCat === target || jobCat.includes(target) || target.includes(jobCat);
        });

        return categoryJobs.filter((job) => {
            if (!q) return true;
            const hay = `${job.title} ${job.company?.companyName} ${job.location}`.toLowerCase();
            return hay.includes(q);
        });
    }, [jobs, query, categoryName]);

    const rootRef = useRef(null);

    // Animation Logic
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
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [loading, visible]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
    );

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
                            Category
                        </div>
                        <h1 className="cat-title reveal-up" data-animate style={{ "--delay": "120ms" }}>
                            <span className="cat-accent">{categoryName}</span> Services
                        </h1>
                        <p className="cat-subtitle reveal-up" data-animate style={{ "--delay": "240ms" }}>
                            Browse active listings for {categoryName.toLowerCase()}.
                        </p>

                        <div className="cat-controls reveal-up" data-animate style={{ "--delay": "360ms" }}>
                            <div className="cat-search mx-auto max-w-2xl w-full">
                                <i className="fa-solid fa-magnifying-glass" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="cat-search-input"
                                    placeholder={`Search within ${categoryName}...`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN LIST */}
                <main className="cat-main">
                    <div className="container">
                        <div className="cat-header-row">
                            <h2 className="cat-section-title reveal-left" data-animate style={{ "--delay": "0ms" }}>
                                Available Jobs
                            </h2>
                            <p className="cat-count reveal-right" data-animate style={{ "--delay": "0ms" }}>
                                Found <span>{visible.length}</span> results
                            </p>
                        </div>

                        {visible.length > 0 ? (
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
                            <div className="cat-empty">
                                <div className="cat-empty-card reveal-up" data-animate style={{ "--delay": "0ms" }}>
                                    <div className="cat-empty-icon">
                                        <i className="fa-solid fa-folder-open" />
                                    </div>
                                    <h3 className="cat-empty-title">No active jobs in this category</h3>
                                    <p className="cat-empty-text">Check back later or browse other categories.</p>
                                    <Link
                                        to="/categories"
                                        className="cat-empty-btn inline-flex items-center justify-center no-underline"
                                    >
                                        Browse Categories
                                    </Link>
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

export default CategoryJobs;
