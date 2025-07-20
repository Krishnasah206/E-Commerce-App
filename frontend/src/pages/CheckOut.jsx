import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [codSelected, setCodSelected] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_API_URL}/cart/details/${userId}`, config)
      .then((res) => {
        const items = Array.isArray(res.data)
          ? res.data
          : res.data.cartItems || [];
        setCartItems(items);
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);
      })
      .catch((err) => {
        console.error("Failed to load cart items", err);
        setCartItems([]);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/user/${userId}`, config)
      .then((res) => {
        setEmail(res.data.email);
      });
  }, [userId]);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    if (!shippingAddress) {
      toast.error("Please enter a shipping address");
      return;
    }

    if (!codSelected) {
      toast.error("Please select Cash on Delivery to proceed");
      return;
    }

    const payload = {
      userId,
      email,
      shippingAddress,
      cartItems,
      totalAmount,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/place`,
        payload,
        config
      );

      if (res.data.success) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/${userId}/clear`,
          config
        );
        toast.success("Order placed successfully!");
        navigate("/order-confirmation");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Checkout</h2>

        <textarea
          className="border border-gray-300 rounded-md p-3 w-full mb-4"
          placeholder="Enter Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <h4 className="font-semibold text-lg mb-2 text-gray-700">Cart Summary</h4>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b py-2 text-gray-600"
            >
              <span>{item.productName} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))
        ) : (
          <div className="text-red-500 mb-2">No items in cart</div>
        )}

        <div className="mt-4 text-right font-bold text-lg text-gray-800">
          Total: ₹{totalAmount}
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={codSelected}
            onChange={(e) => setCodSelected(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label className="text-sm text-gray-700">Cash on Delivery</label>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-[#ff5252] hover:bg-red-600 text-white px-6 py-2 mt-6 rounded-lg w-full transition duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
