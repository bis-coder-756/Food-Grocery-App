import React from "react";
import {
  CircleCheckBig,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const { navigate } = useAppContext();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">

      <div className="relative max-w-xl w-full bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-xl overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10">

          {/* Success Icon */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-70"></div>

              <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <CircleCheckBig
                  size={60}
                  className="text-green-600"
                />
              </div>

            </div>

          </div>

          {/* Badge */}
          <div className="flex justify-center mt-6">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              ✓ Payment Confirmed
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-center mt-6 text-3xl md:text-4xl font-bold text-slate-900">
            Order Confirmed 🎉
          </h1>

          {/* Description */}
          <p className="mt-4 text-center text-slate-600 leading-relaxed max-w-md mx-auto">
            Your payment was completed successfully and
            your order has been confirmed. We’re preparing
            your items and processing your order.
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">

              <p className="text-sm text-slate-500">
                Payment Status
              </p>

              <p className="font-semibold text-green-600 mt-1">
                Paid
              </p>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">

              <p className="text-sm text-slate-500">
                Order Status
              </p>

              <p className="font-semibold text-primary mt-1">
                Processing
              </p>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button
              onClick={() => {
                navigate("/my-orders");
                scrollTo(0, 0);
              }}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              View Orders
              <ArrowRight size={18} />
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

export default PaymentSuccess;
