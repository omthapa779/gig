import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/floatingMenu.css";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onDown = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // detect when user reaches bottom of page
  useEffect(() => {
    const THRESHOLD = 6; // px
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportBottom = scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setAtBottom(viewportBottom >= docHeight - THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`floating-menu ${atBottom ? "at-bottom" : ""}`}
    >
      <div className={`floating-actions ${open ? "open" : ""}`}>
        <Link to="/support" className="floating-action">
          <i className="fa-solid fa-headset" />
          <span>Support</span>
        </Link>

        <Link to="/faq" className="floating-action">
          <i className="fa-solid fa-circle-question" />
          <span>FAQ</span>
        </Link>

        <Link to="/about" className="floating-action">
          <i className="fa-solid fa-circle-info" />
          <span>About</span>
        </Link>
      </div>

      <button
        className={`floating-main ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Help menu"
        aria-expanded={open}
      >
        <i className={`fa-solid ${open ? "fa-xmark" : "fa-comments"}`} />
      </button>
    </div>
  );
}
