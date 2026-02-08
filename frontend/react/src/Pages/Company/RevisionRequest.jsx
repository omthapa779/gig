import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const RevisionRequest = () => {
  const [notes, setNotes] = useState("");
  const [scope, setScope] = useState("minor");

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="revision-page max-w-5xl mx-auto w-full">
        <FloatingMenu />
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Revision
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Request Revision
        </h1>
        <p className="text-gray-500 mt-2">
          Share your feedback with the freelancer and request updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Revision Details
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Order ID
              </label>
              <input
                type="text"
                defaultValue="ORD-4821"
                className="revision-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Revision Scope
              </label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="revision-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white"
              >
                <option value="minor">Minor tweaks</option>
                <option value="major">Major edits</option>
                <option value="additional">Additional deliverables</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Attach Reference (optional)
              </label>
              <label className="revision-file mt-2 flex items-center justify-between gap-3 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-black focus-within:ring-1 focus-within:ring-black outline-none transition-all bg-white">
                <span className="text-sm text-gray-500">Attach file</span>
                <span className="revision-file-btn px-3 py-1.5 rounded-lg text-xs font-semibold">
                  Browse
                </span>
                <input
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Requested Changes
              </label>
              <textarea
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the changes you need (ex: update hero copy, adjust colors, add sections)"
                className="revision-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>
          <button className="revision-submit w-full mt-6 py-3 rounded-xl font-semibold">
            Submit Revision
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Guidelines
          </h2>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>• Be specific and list exact sections to update.</li>
            <li>• Attach visual references for faster revisions.</li>
            <li>• Minor revisions are typically completed within 24-48 hours.</li>
            <li>• Large scope changes may affect delivery timelines.</li>
          </ul>
        </div>
      </div>
    </div>
    </SmoothScroll>
  );
};

export default RevisionRequest;
