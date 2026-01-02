import React from "react";

const PaymentFailure = () => {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-12 text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-red-50 text-red-600 grid place-items-center text-3xl">
          <i className="fa-solid fa-xmark leading-none"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          We could not verify your transaction. Please double-check your
          payment details or try another method.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <button className="btn-primary px-6 py-3 rounded-xl font-semibold">
            Try Again
          </button>
          <button className="payment-secondary px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
