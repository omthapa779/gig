import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const JobDetails = () => {
  const skills = ["React", "Figma", "Landing Pages", "UI Systems"];

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="job-details-page max-w-6xl mx-auto w-full space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Job Details
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Landing Page Redesign
            </h1>
            <p className="text-gray-500 mt-2">
              Review requirements, timeline, and client expectations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/freelancer/proposals"
              className="btn-secondary dashboard-cta-secondary px-5 py-2.5 rounded-xl font-semibold"
            >
              View Proposals
            </Link>
            <Link
              to="/freelancer/chat"
              className="btn-primary px-5 py-2.5 rounded-xl font-semibold"
            >
              Message Client
            </Link>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Overview</h2>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                We need a modern landing page that highlights our product’s key
                features, includes a pricing section, and ends with a strong
                call-to-action. The final deliverable should include a responsive
                layout and a Figma handoff.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-semibold text-gray-900">NPR 45,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-semibold text-gray-900">14 days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">Remote</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-semibold text-gray-900">2 days ago</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Required Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Milestones</h2>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Wireframes", date: "Mar 18" },
                  { label: "High-fidelity mockup", date: "Mar 22" },
                  { label: "Final handoff", date: "Mar 28" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Client</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 grid place-items-center text-gray-500">
                  <i className="fa-solid fa-building"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Gig Labs Pvt. Ltd.</p>
                  <p className="text-sm text-gray-500">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                4.9 rating · 18 jobs posted · 12 hires
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Your Status</h2>
              <p className="text-sm text-gray-600 mt-2">
                Proposal submitted · Awaiting response
              </p>
              <button className="mt-4 w-full btn-secondary dashboard-cta-secondary px-4 py-2.5 rounded-xl font-semibold">
                Withdraw Proposal
              </button>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default JobDetails;
