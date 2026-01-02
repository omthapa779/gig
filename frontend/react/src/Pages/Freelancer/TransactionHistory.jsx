import React from "react";
import SmoothScroll from "@/components/SmoothScroll";

const payouts = [
  {
    id: "PO-8127",
    date: "Mar 18, 2025",
    amount: "$320.00",
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "PO-8121",
    date: "Mar 10, 2025",
    amount: "$180.00",
    method: "Wallet",
    status: "Processing",
  },
  {
    id: "PO-8113",
    date: "Feb 28, 2025",
    amount: "$420.00",
    method: "Bank Transfer",
    status: "Completed",
  },
];

const TransactionHistory = () => {
  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Withdrawals &amp; Payouts
        </h1>
        <p className="text-gray-500 mt-2">
          Track your payout requests, withdrawal status, and payment methods.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
          <span>Payout</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-gray-100">
          {payouts.map((pay) => (
            <div
              key={pay.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 px-6 py-4 text-sm"
            >
              <div>
                <p className="font-semibold text-gray-900">{pay.method}</p>
                <p className="text-xs text-gray-400">{pay.id}</p>
              </div>
              <p className="text-gray-500">{pay.date}</p>
              <p className="font-semibold text-gray-900">{pay.amount}</p>
              <span
                className={`w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center justify-center text-center ${
                  pay.status === "Completed"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {pay.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </SmoothScroll>
  );
};

export default TransactionHistory;
