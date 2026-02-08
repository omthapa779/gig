import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const transactions = [
  {
    id: "TXN-3491",
    item: "Featured Job Post",
    date: "Mar 16, 2025",
    amount: "$49.00",
    status: "Completed",
  },
  {
    id: "TXN-3490",
    item: "Talent Boost",
    date: "Mar 12, 2025",
    amount: "$29.00",
    status: "Completed",
  },
  {
    id: "TXN-3482",
    item: "Refund - Job Post",
    date: "Mar 01, 2025",
    amount: "-$49.00",
    status: "Refunded",
  },
];

const TransactionHistory = () => {
  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="max-w-6xl mx-auto w-full">
        <FloatingMenu />
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Transaction History
        </h1>
        <p className="text-gray-500 mt-2">
          Track payments, receipts, and refunds for your company purchases.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">
          <span>Transaction</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 px-6 py-4 text-sm"
            >
              <div>
                <p className="font-semibold text-gray-900">{txn.item}</p>
                <p className="text-xs text-gray-400">{txn.id}</p>
              </div>
              <p className="text-gray-500">{txn.date}</p>
              <p className="font-semibold text-gray-900">{txn.amount}</p>
              <span
                className={`status-badge w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center justify-center text-center ${
                  txn.status === "Refunded"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {txn.status}
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
