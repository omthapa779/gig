import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const CompanyDashboard = () => {
  const stats = [
    { label: "Active Jobs", value: "4", helper: "2 in review" },
    { label: "Open Proposals", value: "27", helper: "Across 3 roles" },
    { label: "Total Spend", value: "NPR 120k", helper: "This month" },
    { label: "Saved Talent", value: "18", helper: "Shortlisted", link: "/company/saved-talent" },
  ];

  const actions = [
    { label: "Post a Job", desc: "Start a new hiring request", to: "/company/jobs?action=new" },
    { label: "Review Applications", desc: "See new applicants", to: "/company/jobs" },
    { label: "Find Talent", desc: "Browse verified freelancers", to: "/company/find-talent" },
  ];

  const activity = [
    { title: "UI Designer", meta: "12 proposals · Updated 3h ago" },
    { title: "Full-stack Developer", meta: "7 proposals · Updated 1d ago" },
    { title: "Content Writer", meta: "4 proposals · Updated 2d ago" },
  ];

  return (
    <SmoothScroll options={{ duration: 1.1, smoothWheel: true }}>
      <div className="space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Company Dashboard
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back.</h1>
            <p className="text-gray-600 mt-1">
              Track hiring progress, manage jobs, and keep momentum high.
            </p>
          </div>
          <Link
            to="/company/jobs?action=new"
            className="btn-secondary dashboard-cta-secondary px-6 py-3 rounded-xl font-semibold"
          >
            Post a Job
          </Link>
        </div>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const CardTag = item.link ? Link : "div";
            return (
              <CardTag
                key={item.label}
                to={item.link}
                className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${item.link ? "transition hover:-translate-y-0.5 hover:shadow-md" : ""}`}
              >
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.helper}</p>
              </CardTag>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900">Hiring Activity</h2>
            <p className="text-sm text-gray-600 mt-1">
              Keep an eye on your most active roles.
            </p>
            <div className="mt-5 space-y-4">
              {activity.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.meta}</p>
                  </div>
                  <Link
                    to="/company/jobs"
                    className="text-sm font-semibold text-gray-900 underline underline-offset-4"
                  >
                    View applicants
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Jump into the next steps.
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

export default CompanyDashboard;
