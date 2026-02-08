import React from 'react';
import { Link } from 'react-router-dom';

const NotificationDropdown = ({ notifications, onMarkAllRead, onClose, onNotificationClick, historyLink = "#" }) => {
    return (
        <div className="notification-dropdown absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right transform transition-all z-50">
            {/* Header */}
            <div className="notification-dropdown-header px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <h3 className="notification-dropdown-title font-bold text-gray-900">Notifications</h3>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onMarkAllRead(); }}
                        className="notification-dropdown-mark text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => onNotificationClick && onNotificationClick(notification)}
                            className={`notification-item px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 relative group cursor-pointer ${!notification.read ? 'bg-blue-50/40' : ''}`}
                        >
                            <div className="flex gap-3">
                                {/* Icon based on type */}
                                <div className={`notification-item-icon flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.type === 'job' ? 'bg-blue-100 text-blue-600' :
                                    notification.type === 'system' ? 'bg-purple-100 text-purple-600' :
                                        notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                            'bg-gray-100 text-gray-500'
                                    }`}>
                                    <i className={`fa-solid ${notification.type === 'job' ? 'fa-briefcase' :
                                        notification.type === 'system' ? 'fa-circle-info' :
                                            notification.type === 'success' ? 'fa-check' :
                                                'fa-bell'
                                        } text-sm`}></i>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className={`notification-item-title text-sm ${!notification.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                            {notification.title}
                                        </p>
                                        <span className="notification-item-time text-[10px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                                    </div>
                                    <p className="notification-item-message text-sm text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                        {notification.message}
                                    </p>
                                </div>

                                {!notification.read && (
                                    <div className="notification-item-unread absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="notification-dropdown-empty px-4 py-8 text-center text-gray-400">
                        <i className="fa-regular fa-bell-slash text-2xl mb-2 block"></i>
                        <span className="text-sm">No notifications yet</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="notification-dropdown-footer px-2 py-2 border-t border-gray-50 bg-gray-50/50 rounded-b-2xl">
                <Link
                    to={historyLink}
                    className="notification-dropdown-footer-link block text-center text-sm font-semibold text-gray-600 hover:text-black py-1.5 transition-colors rounded-lg hover:bg-gray-100"
                    onClick={onClose}
                >
                    View All History
                </Link>
            </div>
        </div>
    );
};

export default NotificationDropdown;
