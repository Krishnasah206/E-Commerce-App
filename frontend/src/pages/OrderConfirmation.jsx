import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/productListing");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. A confirmation email has been sent to your inbox.
        </p>
        <button
          onClick={handleContinueShopping}
          className="bg-orange-600 hover:bg-[#ff5252] text-white px-6 py-2 rounded-full transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
