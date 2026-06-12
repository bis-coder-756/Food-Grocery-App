
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { PackageSearch } from "lucide-react";
import { toast } from "react-hot-toast";

const Myorders = () => {
  const [myOrders, setMyOrders] = useState([]);

  const { currency, axios, user } = useAppContext();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="mt-16 pb-16">
      {/* Heading */}
      <div className="mb-10">
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
          Order History
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Track your purchases and view order details.
        </p>

        <div className="w-24 h-1 bg-primary rounded-full mt-4"></div>
      </div>
      {/* Empty State */}
      {myOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-primary/10 p-5 rounded-full">
            <PackageSearch className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-5">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-2 max-w-sm">
            Once you place an order, it will appear here for easy tracking.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between gap-2 p-5 bg-gray-50 border-b border-gray-200 px-5
              ">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    #{order._id.slice(-8)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Payment
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    {order.paymentType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Total Amount
                  </p>

                  <p className="font-bold text-primary mt-1">
                    {currency}
                    {order.amount}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-5 p-10 ${
                    index !== order.items.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-xl">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.product.name}
                      </h2>

                      <p className="text-sm text-gray-500 capitalize mt-1">
                        Category: {item.product.category}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      Quantity:
                      <span className="font-medium text-gray-800 ml-1">
                        {item.quantity}
                      </span>
                    </p>

                    <span
                      className={`inline-flex w-fit px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  
                     <p>
                        Ordered On:
                      <span className="font-medium text-gray-800 ml-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xl font-bold text-primary">
                     Amount: {currency}
                      {item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myorders;