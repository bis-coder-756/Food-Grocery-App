import React from "react";
import {
  CircleX,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const PaymentCancel = () => {
  const { navigate } = useAppContext();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">

      <div className="relative max-w-xl w-full bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-xl overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10">

          {/* Cancel Icon */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-70"></div>

              <div className="relative w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                <CircleX
                  size={60}
                  className="text-red-600"
                />
              </div>

            </div>

          </div>

          {/* Badge */}
          <div className="flex justify-center mt-6">
            <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
              Payment Not Completed
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-center mt-6 text-3xl md:text-4xl font-bold text-slate-900">
            Payment Cancelled
          </h1>

          {/* Description */}
          <p className="mt-4 text-center text-slate-600 leading-relaxed max-w-md mx-auto">
            Your payment was not completed. Don't worry —
            your cart items are still saved and available
            whenever you want to continue shopping.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">

              <p className="text-sm text-slate-500">
                Payment Status
              </p>

              <p className="font-semibold text-red-600 mt-1">
                Cancelled
              </p>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">

              <p className="text-sm text-slate-500">
                Cart Status
              </p>

              <p className="font-semibold text-primary mt-1">
                Items Saved
              </p>

            </div>

          </div>

          {/* Info Box */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">

            <p className="text-sm text-red-700 text-center">
              No payment was charged. You can safely return
              to your cart and try again anytime.
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button
              onClick={() => {
                navigate("/cart");
                scrollTo(0, 0);
              }}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              Return To Cart
              <ShoppingCart size={18} />
            </button>

            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="flex-1 border border-slate-300 py-3 rounded-xl font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ShoppingBag size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentCancel;
