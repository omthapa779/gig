import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const SavedJobs = () => {
  const jobs = [
    { title: "Brand Identity Design", meta: "Fixed · NPR 35k · Kathmandu" },
    { title: "Shopify Store Setup", meta: "Hourly · NPR 1,500/hr · Remote" },
    { title: "Social Media Content", meta: "Fixed · NPR 18k · Remote" },
  ];

  return (
    <SmoothScroll options={{ duration: 1.1, smoothWheel: true }}>
      <div className="space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Saved Jobs
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Pick up where you left off.</h1>
            <p className="text-gray-600 mt-1">
              Review saved roles and apply when you are ready.
            </p>
          </div>
          <Link
            to="/explore-jobs"
            className="btn-secondary dashboard-cta-secondary px-6 py-3 rounded-xl font-semibold"
          >
            Explore Jobs
          </Link>
        </div>

        <section className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-600">{job.meta}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/explore-jobs"
                    className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Apply Now
                  </Link>
                  <button
                    className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </SmoothScroll>
  );
};

export default SavedJobs;
