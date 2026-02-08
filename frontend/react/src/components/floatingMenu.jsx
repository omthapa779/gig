import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FloatingMenu({ enableBottomMargin = true }) {
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

  useEffect(() => {
    if (enableBottomMargin) {
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
    }
  }, [enableBottomMargin]);

  return (
    <div
      ref={ref}
      className={`floating-menu fixed right-[18px] bottom-[18px] z-[9999] grid gap-[10px] items-end justify-items-end transition-transform duration-[260ms] ease-out will-change-transform 
        ${atBottom ? "-translate-y-[40px]" : "translate-y-0"}`}
    >
      {/* Action Buttons Stack */}
      <div className={`grid gap-[10px] transition-all duration-200 ease-in-out 
        ${open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-[10px] scale-[0.98] pointer-events-none"}`}>
        
        {[
          { to: "/support", icon: "fa-headset", label: "Support" },
          { to: "/faq", icon: "fa-circle-question", label: "FAQ" },
          { to: "/about", icon: "fa-circle-info", label: "About" }
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="floating-action flex items-center gap-2.5 bg-white border border-[#eef2f7] rounded-full px-3 py-2.5 shadow-sm font-extrabold transition-all duration-[180ms] hover:-translate-y-0.5 hover:border-[#ffd021]/70 hover:shadow-[0_0_14px_rgba(255,208,33,0.28),0_10px_24px_rgba(16,24,40,0.12)] active:translate-y-0"
          >
            <i className={`fa-solid ${item.icon} text-[#ffd021] transition-all duration-[180ms] group-hover:text-[#FF9800] group-hover:translate-x-[1px]`} />
            <span className="text-[0.95rem]">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        className={`floating-main relative isolation-auto overflow-hidden w-14 h-14 rounded-full border-none cursor-pointer bg-[#1A1A1A] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] grid place-items-center transition-all duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(255,208,33,0.55),0_0_36px_rgba(255,208,33,0.22),0_14px_30px_rgba(0,0,0,0.18)] focus-visible:outline-none 
          ${open ? "shadow-[0_0_16px_rgba(255,208,33,0.45),0_0_32px_rgba(255,208,33,0.18),0_14px_30px_rgba(0,0,0,0.18)]" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Help menu"
        aria-expanded={open}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC107] to-[#FF9800] opacity-0 transition-opacity duration-[260ms] -z-10 hover:opacity-100" 
             style={{ opacity: 'var(--tw-hover-opacity, 0)' }} /> 
        
        {/* For the gradient logic in Tailwind, we use a peer or group hover, or simpler: CSS transition on the pseudo-element via arbitrary class */}
        <span className="absolute inset-0 bg-gradient-to-br from-[#FFC107] to-[#FF9800] opacity-0 transition-opacity duration-[260ms] -z-10 [button:hover_&]:opacity-100"></span>
        
        <i className={`fa-solid text-xl relative z-10 ${open ? "fa-xmark" : "fa-comments"}`} />
      </button>
    </div>
  );
}
