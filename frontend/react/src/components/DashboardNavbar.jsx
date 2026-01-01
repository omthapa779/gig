import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';

// Simple time ago formatter
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
};

const DashboardNavbar = ({ role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    // Fetch Notifications
    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications.map(n => ({
                    ...n,
                    id: n._id,
                    time: formatTimeAgo(n.createdAt)
                })) || []);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000); // Poll every minute
        return () => clearInterval(interval);
    }, []);

    const handleMarkAllRead = async () => {
        try {
            // Optimistic update
            const oldNotifications = [...notifications];
            setNotifications(notifications.map(n => ({ ...n, read: true })));

            const res = await fetch('/api/notifications/read-all', { method: 'PUT' });
            if (!res.ok) {
                setNotifications(oldNotifications); // Revert on error
            }
        } catch (error) {
            console.error("Failed to mark notifications as read", error);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.read) {
                // Mark as read API
                await fetch(`/api/notifications/${notification.id}/read`, { method: 'PUT' });
                // Local update
                setNotifications(prev => prev.map(n =>
                    n.id === notification.id ? { ...n, read: true } : n
                ));
            }
            setShowNotifications(false);
            if (notification.link) {
                navigate(notification.link);
            }
        } catch (error) {
            console.error("Failed to handle notification click", error);
        }
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const endpoint = role === 'company' ? '/api/company/logout' : '/api/freelancer/logout';
            await fetch(endpoint, { method: 'POST' });
            // Redirect to home and reload to clear application state
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            navigate('/');
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const isCompany = role === 'company';

    const navLinks = isCompany
        ? [
            { name: 'Dashboard', path: '/company/profile' },
            { name: 'Messages', path: '/company/chat' },
            { name: 'My Jobs', path: '/company/jobs', exact: true }, // Add exact flag or handle logic below
            { name: 'Post a Job', path: '/company/jobs?action=new' },
            { name: 'Find Talent', path: '/company/find-talent' },
        ]
        : [
            { name: 'Find Work', path: '/explore-jobs' },
            { name: 'My Proposals', path: '/freelancer/proposals' },
            { name: 'Messages', path: '/freelancer/chat' },
            { name: 'Saved Jobs', path: '#' },
        ];

    const profilePath = isCompany ? '/company/profile' : '/freelancer/profile';
    const settingsPath = isCompany ? '/company/profileEdit' : '/freelancer/profileEdit';

    return (
        <nav
                className={`site-nav dashboard-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-sm py-3' : 'py-4'}`}
                style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--text-primary)', borderColor: 'rgba(255,255,255,0.04)' }}
            >
            <div className="w-full px-6 sm:px-10 lg:px-16">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-1 group">
                            <img src="/icon.png" alt="Gig Logo" className="h-14 w-auto object-contain" />
                            <span style={{ color: 'var(--text-primary)' }} className="text-4xl font-bold tracking-tight leading-none mt-1">Gig</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = link.path.includes('?')
                                ? (location.pathname + location.search) === link.path
                                : location.pathname === link.path && (!location.search || !navLinks.some(l => l.path === location.pathname + location.search));

                            // Simplification: just check if 'action=new' is present for 'Post Job'.
                            // If 'My Jobs' (/company/jobs), it should NOT match if search is '?action=new'.

                            const active = link.path.includes('?')
                                ? (location.pathname + location.search) === link.path
                                : location.pathname === link.path && location.search !== '?action=new';

                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`dashboard-nav-link text-sm font-medium transition-colors duration-200 ${active ? 'is-active' : 'hover:opacity-90'}`}
                                    style={{ color: active ? 'var(--accent)' : 'var(--text-secondary)' }}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>
                        {/* Notification Icon */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`dashboard-notification relative p-2 transition-colors rounded-full focus:outline-none ${showNotifications ? 'is-active text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`}
                            >
                                <i className="fa-regular fa-bell text-xl"></i>
                                {unreadCount > 0 && (
                                    <span className="dashboard-notification-dot absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                                )}
                            </button>

                            {showNotifications && (
                                <NotificationDropdown
                                    notifications={notifications}
                                    onMarkAllRead={handleMarkAllRead}
                                    onClose={() => setShowNotifications(false)}
                                    onNotificationClick={handleNotificationClick}
                                />
                            )}
                        </div>

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
                                <div className="dashboard-dropdown absolute right-0 mt-3 w-56 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border py-2 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right transform transition-all">
                                    <div className="dashboard-dropdown-header px-4 py-3 border-b mb-1">
                                        <p className="text-xs font-semibold uppercase tracking-wider">Signed in as</p>
                                        <p className="text-sm font-medium truncate">{isCompany ? 'Company Account' : 'Freelancer Account'}</p>
                                    </div>

                                    <Link
                                        to={profilePath}
                                        className="dashboard-dropdown-link block px-4 py-2 text-sm transition-colors"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="fa-regular fa-user mr-2"></i> Profile
                                    </Link>
                                    <Link
                                        to={settingsPath}
                                        className="dashboard-dropdown-link block px-4 py-2 text-sm transition-colors"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="fa-solid fa-cog mr-2"></i> Settings
                                    </Link>
                                    <div className="dashboard-dropdown-divider border-t my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="dashboard-dropdown-logout block w-full text-left px-4 py-2 text-sm transition-colors"
                                    >
                                        <i className="fa-solid fa-sign-out-alt mr-2"></i> Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="dashboard-mobile-toggle text-gray-600 focus:outline-none h-10 w-10 grid place-items-center"
                        >
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`dashboard-mobile-menu md:hidden border-b overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`dashboard-mobile-link block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path
                                ? 'is-active bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="dashboard-mobile-divider border-t my-2 pt-2">
                        <button
                            onClick={handleLogout}
                            className="dashboard-mobile-logout w-full text-left block px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
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
