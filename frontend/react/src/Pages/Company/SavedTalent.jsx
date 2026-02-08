import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const SavedTalent = () => {
  const saved = [
    { name: "Sita Sharma", role: "UI/UX Designer", meta: "Kathmandu · 4.9 rating" },
    { name: "Ramesh Adhikari", role: "Full-stack Developer", meta: "Lalitpur · 6 projects" },
    { name: "Prabha Joshi", role: "Content Strategist", meta: "Remote · 8 articles" },
  ];

  return (
    <SmoothScroll options={{ duration: 1.1, smoothWheel: true }}>
      <div className="space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Saved Talent
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Your shortlist.</h1>
            <p className="text-gray-600 mt-1">
              Keep top candidates handy and move fast when you are ready to hire.
            </p>
          </div>
          <Link
            to="/company/find-talent"
            className="btn-secondary dashboard-cta-secondary px-6 py-3 rounded-xl font-semibold"
          >
            Browse Talent
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saved.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-600">{person.role}</p>
                  <p className="text-xs text-gray-500 mt-2">{person.meta}</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/company/find-talent"
                  className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  View Profile
                </Link>
                <Link
                  to="/company/chat"
                  className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Message
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </SmoothScroll>
  );
};

export default SavedTalent;
