import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const tabs = [
  { id: "account", label: "Account" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "appearance", label: "Appearance" },
];

const Settings = ({ role = "company" }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="settings-page min-h-screen w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Settings
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {role === "freelancer" ? "Freelancer Settings" : "Company Settings"}
            </h1>
            <p className="text-gray-500 mt-2">
              Manage profile, security, notifications, and billing preferences.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate(-1)}
              className="settings-back px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <div className="settings-card bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="grid gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`settings-tab text-left px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === tab.id ? "is-active" : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-card bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {activeTab === "account" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Account</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={role === "freelancer" ? "Sita Gurung" : "Gig Labs"}
                      className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={
                        role === "freelancer"
                          ? "sita@gigmail.com"
                          : "billing@giglabs.com"
                      }
                      className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Security</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="New password"
                      className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Notifications
                </h2>
                <div className="grid gap-3 text-sm text-gray-600">
                  {[
                    "New messages",
                    "Order updates",
                    "Weekly summaries",
                    "Marketing offers",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 border border-gray-100 rounded-xl p-3"
                    >
                      <input type="checkbox" defaultChecked />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Billing</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Default Payment
                    </label>
                    <select className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white">
                      <option>Visa •••• 4242</option>
                      <option>Mastercard •••• 1188</option>
                      <option>Wallet Balance</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      defaultValue="Thapathali, Kathmandu"
                      className="settings-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
                <p className="text-gray-500">
                  Toggle dark mode using the switch above. Your preference is
                  saved automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
