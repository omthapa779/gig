import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const DashboardNavbar = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Clear cookies/localstorage
        // In a real app we might call an API endpoint here
        document.cookie = 'token=; Max-Age=0; path=/;';
        navigate('/');
    };

    const isCompany = role === 'company';

    const navLinks = isCompany
        ? [
            { name: 'Dashboard', path: '/company/profile' },
            { name: 'My Jobs', path: '/company/jobs' },
            { name: 'Post a Job', path: '/company/jobs?action=new' }, // Example query param
            { name: 'Find Talent', path: '#' },
        ]
        : [
            { name: 'Find Work', path: '#' },
            { name: 'My Proposals', path: '#' },
            { name: 'Saved Jobs', path: '#' },
        ];

    const profilePath = isCompany ? '/company/profile' : '/freelancer/profile';
    const settingsPath = isCompany ? '/company/profileEdit' : '/freelancer/profileEdit';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
                : 'bg-white py-4 border-b border-transparent'
                }`}
        >
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-1 group">
                            <img src="/icon.png" alt="Gig Logo" className="h-14 w-auto object-contain" />
                            <span className="text-4xl font-bold tracking-tight text-slate-900 leading-none mt-1">Gig</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-50">
                            <i className="fa-regular fa-bell text-xl"></i>
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                            aria-label="Toggle Dark Mode"
                        >
                            <img
                                src={theme === 'dark' ? '/light_mode.png' : '/dark_mode.png'}
                                alt="Toggle Theme"
                                className="w-8 h-8 object-contain"
                            />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium shadow-md ring-2 ring-white cursor-pointer hover:ring-blue-100 transition-all">
                                    {isCompany ? <i className="fa-solid fa-building"></i> : <i className="fa-solid fa-user"></i>}
                                </div>
                                <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 py-2 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right transform transition-all">
                                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</p>
                                        <p className="text-sm font-medium text-gray-900 truncate">{isCompany ? 'Company Account' : 'Freelancer Account'}</p>
                                    </div>

                                    <Link
                                        to={profilePath}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="fa-regular fa-user mr-2 text-gray-400"></i> Profile
                                    </Link>
                                    <Link
                                        to={settingsPath}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="fa-solid fa-cog mr-2 text-gray-400"></i> Settings
                                    </Link>
                                    <div className="border-t border-gray-50 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <i className="fa-solid fa-sign-out-alt mr-2"></i> Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
                        >
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                        >
                            <i className="fa-solid fa-sign-out-alt mr-2"></i> Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
