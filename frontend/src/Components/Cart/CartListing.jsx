import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartListing() {
  const [cartItems, setCartItems] = useState([]);

  // Replace with your actual user ID logic (e.g., from JWT, localStorage, or context)
  const userId = "64dfc6b1234567890abcde12"; 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/details/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container py-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-md flex gap-4 items-center">
              <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 font-medium">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartListing;
