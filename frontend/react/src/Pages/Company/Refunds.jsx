import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";

const Refunds = () => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
    <div className="refunds-page max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Request a Refund
        </h1>
        <p className="text-gray-500 mt-2">
          Submit a refund request for eligible transactions. We review within 48
          hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Refund Details
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Transaction ID
              </label>
              <input
                type="text"
                placeholder="e.g. TXN-3491"
                className="refunds-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Refund Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 49.00"
                className="refunds-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Reason
              </label>
              <textarea
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why you need a refund"
                className="refunds-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>
          <button className="btn-primary w-full mt-6 py-3 rounded-xl font-semibold">
            Submit Request
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Refund Policy</h2>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>• Refunds are eligible within 7 days of purchase.</li>
            <li>• Only unused boosts or featured listings qualify.</li>
            <li>• Approved refunds are processed in 3-5 business days.</li>
            <li>• For urgent cases, contact Gig support directly.</li>
          </ul>
        </div>
      </div>
    </div>
    </SmoothScroll>
  );
};

export default Refunds;
