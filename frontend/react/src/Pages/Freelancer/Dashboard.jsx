import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const FreelancerDashboard = () => {
  const stats = [
    { label: "Proposals Sent", value: "12", helper: "3 awaiting reply" },
    { label: "Active Contracts", value: "2", helper: "1 ending soon" },
    { label: "Earnings", value: "NPR 46k", helper: "This month" },
    { label: "Profile Completion", value: "82%", helper: "Add portfolio" },
  ];

  const actions = [
    { label: "Find Work", desc: "Explore new gigs", to: "/explore-jobs" },
    { label: "Update Profile", desc: "Improve your visibility", to: "/freelancer/profileEdit" },
    { label: "View Proposals", desc: "Track your submissions", to: "/freelancer/proposals" },
  ];

  const highlights = [
    { title: "UI Revamp Project", meta: "Applied 2h ago · Kathmandu" },
    { title: "WordPress Setup", meta: "Saved · Remote" },
    { title: "Content Strategy", meta: "Applied 1d ago · Remote" },
  ];

  return (
    <SmoothScroll options={{ duration: 1.1, smoothWheel: true }}>
      <div className="space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Freelancer Dashboard
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Let’s keep the momentum.</h1>
            <p className="text-gray-600 mt-1">
              Track applications, manage contracts, and grow your earnings.
            </p>
          </div>
          <Link
            to="/explore-jobs"
            className="btn-secondary dashboard-cta-secondary px-6 py-3 rounded-xl font-semibold"
          >
            Find Work
          </Link>
        </div>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
              <p className="text-sm text-gray-500 mt-1">{item.helper}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-600 mt-1">
              Your latest applications and saves.
            </p>
            <div className="mt-5 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.meta}</p>
                  </div>
                  <Link
                    to="/freelancer/proposals"
                    className="text-sm font-semibold text-gray-900 underline underline-offset-4"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Helpful links to keep you moving.
            </p>
            <div className="mt-5 space-y-3">
              {actions.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default FreelancerDashboard;
