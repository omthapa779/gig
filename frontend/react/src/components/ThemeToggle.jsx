import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Sun = ({ className = '' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zm10.45 10.45l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM12 4a1 1 0 110-2 1 1 0 010 2zm0 18a1 1 0 110-2 1 1 0 010 2zM4 12a1 1 0 11-2 0 1 1 0 012 0zm20 0a1 1 0 11-2 0 1 1 0 012 0zM6.76 19.16l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17.24 6.76l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM12 7a5 5 0 100 10 5 5 0 000-10z" />
  </svg>
);

const Moon = ({ className = '' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative inline-flex items-center w-14 h-8 p-1 rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none ${className}`}
    >
      <span
        className={`absolute inset-0 rounded-full ${isDark ? 'bg-[#161B22]' : 'bg-white'}`}
        style={{ border: isDark ? '1.5px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)' }}
      ></span>

      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow transform transition-transform duration-300 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-6 bg-[#F5B301]' : 'translate-x-0 bg-white'}`}
        aria-hidden
      >
        <span className={`w-full h-full grid place-items-center ${isDark ? 'text-[#0E1117]' : 'text-[#F5B301]'}`}>
          {isDark ? <Moon className="transform transition-transform duration-300 rotate-0" /> : <Sun className="transform transition-transform duration-300 rotate-0" />}
        </span>
      </span>

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
