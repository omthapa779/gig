import React from "react";
import { Link } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const OrderDetails = () => {
  const milestones = [
    { label: "Order placed", date: "Mar 14, 2025", status: "done" },
    { label: "Kickoff call", date: "Mar 16, 2025", status: "done" },
    { label: "First draft", date: "Mar 22, 2025", status: "active" },
    { label: "Final delivery", date: "Mar 28, 2025", status: "upcoming" },
  ];

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="order-details-page max-w-6xl mx-auto w-full space-y-8">
        <FloatingMenu />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Order Details
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Landing Page Redesign
            </h1>
            <p className="text-gray-500 mt-2">
              Track progress, files, and delivery timelines for this order.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/company/chat"
              className="btn-secondary dashboard-cta-secondary px-5 py-2.5 rounded-xl font-semibold"
            >
              Message Freelancer
            </Link>
            <Link
              to="/company/revision-request"
              className="btn-primary px-5 py-2.5 rounded-xl font-semibold"
            >
              Request Revision
            </Link>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-900">ORD-4821</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    In progress
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Freelancer</p>
                  <p className="font-semibold text-gray-900">Aarav Shrestha</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-semibold text-gray-900">Mar 28, 2025</p>
                </div>
              </div>
              <div className="mt-5 border-t border-gray-100 pt-5">
                <p className="text-sm text-gray-500">Deliverables</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>• Responsive landing page layout</li>
                  <li>• Interactive prototype link</li>
                  <li>• Design system handoff</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Timeline</h2>
              <div className="mt-5 space-y-4">
                {milestones.map((step) => (
                  <div
                    key={step.label}
                    className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div
                      className={`h-3 w-3 rounded-full mt-1.5 ${
                        step.status === "done"
                          ? "bg-green-500"
                          : step.status === "active"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{step.label}</p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Payment</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-900">$320.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Service fee</span>
                  <span className="font-semibold text-gray-900">$8.50</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-gray-600 font-semibold">Total</span>
                  <span className="text-gray-900 font-bold">$328.50</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Files</h2>
              <p className="text-sm text-gray-500 mt-2">
                Latest uploads and delivered assets.
              </p>
              <div className="mt-4 space-y-3">
                {["wireframes.pdf", "landing_v1.fig", "copy_notes.docx"].map((file) => (
                  <div
                    key={file}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm"
                  >
                    <span className="font-semibold text-gray-900 truncate">{file}</span>
                    <button className="text-blue-600 font-semibold hover:underline">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default OrderDetails;
