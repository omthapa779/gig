import React from "react";
import FloatingMenu from "@/components/floatingMenu";

const PaymentSuccess = () => {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <FloatingMenu />
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-12 text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-50 text-green-600 grid place-items-center text-3xl">
          <i className="fa-solid fa-check leading-none"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Payment सफल भयो
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Your transaction was verified and completed. A receipt has been sent
          to your email. You can track this in your transaction history.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <button className="btn-primary px-6 py-3 rounded-xl font-semibold">
            View Receipt
          </button>
          <a
            href="/company/profile"
            className="payment-secondary px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold transition-colors"
          >
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
