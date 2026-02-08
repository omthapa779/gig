import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const PlaceOrder = () => {
  const items = [
    { name: "Landing Page Redesign", qty: 1, price: 320 },
    { name: "Brand Style Guide", qty: 1, price: 120 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxes = subtotal * 0.13;
  const serviceFee = 8.5;
  const total = subtotal + taxes + serviceFee;

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="order-page max-w-6xl mx-auto w-full">
        <FloatingMenu />
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Order
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Place Order
        </h1>
        <p className="text-gray-500 mt-2">
          Confirm order details, payment method, and delivery timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Details
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Billing Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Gig Labs Pvt. Ltd."
                  className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Billing Email
                </label>
                <input
                  type="email"
                  defaultValue="billing@giglabs.com"
                  className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Billing Address
                </label>
                <input
                  type="text"
                  defaultValue="Bhanimandal, Lalitpur"
                  className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Payment Method
                </label>
                <select className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white">
                  <option>Visa •••• 4242</option>
                  <option>Mastercard •••• 1188</option>
                  <option>Wallet Balance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Delivery Timeline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Target Delivery
                </label>
                <input
                  type="date"
                  className="order-input mt-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Timelines are estimates and can be adjusted after kickoff.
            </p>
          </div>
        </div>

        <aside className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Service Fee</span>
              <span className="font-semibold text-gray-900">
                ${serviceFee.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Taxes (13%)</span>
              <span className="font-semibold text-gray-900">
                ${taxes.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-extrabold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
          <button className="order-submit w-full mt-6 py-3.5 rounded-xl font-bold tracking-widest uppercase">
            Confirm &amp; Pay
          </button>
          <p className="text-xs text-gray-500 mt-4">
            You won’t be charged until you confirm the order details.
          </p>
        </aside>
      </div>
    </div>
    </SmoothScroll>
  );
};

export default PlaceOrder;
