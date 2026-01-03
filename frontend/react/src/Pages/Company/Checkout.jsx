import React, { useMemo, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingMenu from "@/components/floatingMenu";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const items = [
    { name: "Featured Job Post", desc: "7-day featured listing", price: 49.0 },
    { name: "Talent Boost", desc: "Priority visibility for 14 days", price: 29.0 },
  ];

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  const serviceFee = 4.5;
  const taxRate = 0.13;
  const tax = useMemo(() => (subtotal + serviceFee) * taxRate, [subtotal]);
  const discount = appliedCoupon ? Math.min(10, subtotal * 0.1) : 0;
  const total = subtotal + serviceFee + tax - discount;

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;
    if (coupon.trim().toUpperCase() === "GIG10") {
      setAppliedCoupon("GIG10");
    } else {
      setAppliedCoupon(null);
    }
  };

  return (
    <SmoothScroll options={{ duration: 1.2, smoothWheel: true }}>
      <div className="checkout-page max-w-6xl mx-auto w-full">
        <FloatingMenu />
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Checkout
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Complete Your Purchase
        </h1>
        <p className="text-gray-500 mt-2">
          Review your order, apply discounts, and confirm payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Coupon</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="checkout-input flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="checkout-apply px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
            {appliedCoupon ? (
              <p className="text-sm text-green-600 mt-3 font-semibold">
                Coupon “{appliedCoupon}” applied.
              </p>
            ) : coupon ? (
              <p className="text-sm text-red-500 mt-3 font-semibold">
                Invalid coupon. Try “GIG10”.
              </p>
            ) : null}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Payment Method
            </h2>
            <div className="grid gap-3">
              {[
                { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, AMEX" },
                { id: "wallet", label: "Wallet Balance", hint: "Use available credits" },
                { id: "bank", label: "Bank Transfer", hint: "1-2 business days" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-500">{method.hint}</p>
                  </div>
                </label>
              ))}
            </div>
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
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Discount</span>
              <span className="font-semibold text-green-600">
                -${discount.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-extrabold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button className="btn-primary w-full mt-6 py-3.5 rounded-xl font-bold tracking-widest uppercase">
            Place Order
          </button>

          <div className="mt-4 text-xs text-gray-500 leading-relaxed">
            By placing this order, you agree to the Gig terms and the billing
            schedule. Payments are mock-only for this demo checkout.
          </div>
        </aside>
      </div>
    </div>
    </SmoothScroll>
  );
};

export default Checkout;
