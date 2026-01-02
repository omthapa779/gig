import React from "react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: "NT-221",
    title: "Job post approved",
    detail: "Your job post for UI/UX Designer is now live.",
    time: "Mar 18, 2025",
    status: "unread",
  },
  {
    id: "NT-220",
    title: "New application received",
    detail: "A freelancer applied to Brand Refresh.",
    time: "Mar 16, 2025",
    status: "read",
  },
  {
    id: "NT-217",
    title: "Order delivered",
    detail: "Landing Page Redesign was delivered for review.",
    time: "Mar 12, 2025",
    status: "read",
  },
];

const NotificationsHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="notification-history-page max-w-6xl mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Notifications
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Notification History
          </h1>
          <p className="text-gray-500 mt-2">
            Review alerts, updates, and system messages.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="notif-back px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold"
        >
          Back
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_2fr_0.8fr] gap-4 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
          <span>Title</span>
          <span>Detail</span>
          <span>Time</span>
        </div>
        <div className="divide-y divide-gray-100">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr_0.8fr] gap-3 px-6 py-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    note.status === "unread"
                      ? "bg-yellow-400"
                      : "bg-gray-300"
                  }`}
                />
                <span className="font-semibold text-gray-900">
                  {note.title}
                </span>
              </div>
              <p className="text-gray-500">{note.detail}</p>
              <p className="text-gray-500">{note.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsHistory;
