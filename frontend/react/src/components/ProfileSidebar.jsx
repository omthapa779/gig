import { Link, useLocation } from "react-router-dom";

export default function ProfileSidebar({ activePage = "overview", role = "company" }) {
    const location = useLocation();

    const menuItems = role === "company" ? [
        { id: "overview", label: "Overview", icon: "fa-chart-pie", path: "/company/profile" },
        { id: "jobs", label: "My Jobs", icon: "fa-briefcase", path: "/company/jobs" },
        { id: "edit", label: "Edit Profile", icon: "fa-user-pen", path: "/company/profileEdit" },
        { id: "settings", label: "Settings", icon: "fa-cog", path: "#" },
    ] : [
        { id: "overview", label: "Overview", icon: "fa-user", path: "/freelancer/profile" },
        { id: "find-work", label: "Find Work", icon: "fa-search", path: "#" },
        { id: "edit", label: "Edit Profile", icon: "fa-user-pen", path: "/freelancer/profileEdit" },
        { id: "settings", label: "Settings", icon: "fa-cog", path: "#" },
    ];

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                {/* User Info Teaser */}
                <div className="mb-8 px-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || activePage === item.id;

                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-blue-50 text-gray-500 group-hover:text-blue-600"
                                    }`}>
                                    <i className={`fa-solid ${item.icon} text-sm`}></i>
                                </div>
                                <span className={`font-medium ${isActive ? "text-white" : ""}`}>{item.label}</span>

                                {isActive && (
                                    <i className="fa-solid fa-chevron-right ml-auto text-xs opacity-60"></i>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Upgrade Banner (Fiverr style) */}
                {/* upgrade banner removed */}
            </div>
        </div>
    );
}
