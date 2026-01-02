import React from "react";

const orders = [
  {
    id: "ORD-4821",
    title: "Landing Page Redesign",
    freelancer: "Aarav Shrestha",
    status: "Active",
    due: "Mar 28, 2025",
  },
  {
    id: "ORD-4799",
    title: "Brand Style Guide",
    freelancer: "Nisha Tamang",
    status: "Delivered",
    due: "Mar 20, 2025",
  },
  {
    id: "ORD-4688",
    title: "Mobile App UI Kit",
    freelancer: "Kiran Joshi",
    status: "Completed",
    due: "Mar 05, 2025",
  },
  {
    id: "ORD-4550",
    title: "Pitch Deck Refresh",
    freelancer: "Ritika Basnet",
    status: "Canceled",
    due: "Feb 18, 2025",
  },
];

const statusStyles = {
  Active: "bg-yellow-50 text-yellow-600",
  Delivered: "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Canceled: "bg-red-50 text-red-600",
};

const OrderStatus = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Orders
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Order Status
        </h1>
        <p className="text-gray-500 mt-2">
          Track active work, deliveries, and completed orders.
        </p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                {order.id}
              </p>
              <h2 className="text-lg font-bold text-gray-900 mt-2">
                {order.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Freelancer: {order.freelancer}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">
                Due {order.due}
              </span>
              <span
                className={`status-badge px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center justify-center text-center ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
