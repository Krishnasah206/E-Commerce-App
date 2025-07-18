import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

function CartListing() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(localStorage.getItem("userAddress") || "Puri - 752054");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      window.location.href = "/login";
    }
  }, []);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log("Fetching cart for user:", userId);
        console.log("Auth config:", config);
        const res = await axios.get(`http://localhost:8080/api/cart/details/${userId}`, config);
        console.log("Raw cart items:", res.data);
        const detailedItems = await Promise.all(
          res.data.map(async (item) => {
            const productRes = await axios.get(`http://localhost:8080/api/products/${item.productId}`, config);
            const product = productRes.data;

            const actualPrice = Math.round(product.mrp - (product.mrp * product.discount / 100));
            const itemDiscount = Math.round((product.mrp - actualPrice) * item.quantity);

            return {
              ...item,
              ...product,
              actualPrice,
              totalItemPrice: actualPrice * item.quantity,
              itemDiscount,
            };
          })
        );
        setCartItems(detailedItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };


    if (userId) fetchCartItems();
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${userId}/remove/${productId}`, config);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ... rest of your CartListing component remains the same
  const handleQuantityChange = (productId, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQty,
              totalItemPrice: newQty * item.actualPrice,
              itemDiscount: Math.round((item.mrp - item.actualPrice) * newQty),
            }
          : item
      )
    );
  };

  const totalMRP = cartItems.reduce((sum, item) => sum + Math.round(item.mrp) * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.itemDiscount, 0);
  const totalPrice = totalMRP - totalDiscount;
  const coupon = Math.round(totalPrice * 0.05);
  const platformFee = 4;
  const deliveryCharge = 50;
  const totalPayable = totalPrice - coupon + platformFee + deliveryCharge;

  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 py-6">
      {/* Cart Items */}
      <div className="flex-1 max-h-[80vh] overflow-y-auto">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Your Cart ({cartItems.length})</h2>

          {/* Address section */}
          <div className="mb-4">
            {isEditingAddress ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full border border-gray-300 p-2 rounded text-sm"
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem("userAddress", address);
                      setIsEditingAddress(false);
                    }}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-[#ff5252]"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between text-sm">
                <p>
                  Deliver to: <span className="font-semibold">{address}</span>
                </p>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-blue-600 hover:underline hover:text-[#ff5252] text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Products */}
          {cartItems.map((item) => (
            <div key={item.productId} className="flex justify-between items-start border-t py-4">
              {/* Left */}
              <div className="ml-2 flex gap-4">
                <img
                  src={item.images[0]}
                  alt={item.productName}
                  className="w-24 h-32 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-base line-clamp-2">{item.productName}</h3>
                  <p className="text-sm text-gray-600">MRP: ₹{Math.round(item.mrp)}</p>
                  <p className="text-sm text-green-600">Discount: {item.discount}%</p>
                  <p className="text-sm font-medium mt-1">Price: ₹{item.totalItemPrice}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-2 mr-2">
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <InputLabel id={`qty-label-${item.productId}`}>Qty</InputLabel>
                  <Select
                    labelId={`qty-label-${item.productId}`}
                    value={item.quantity}
                    label="Qty"
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-blue-600 hover:text-[#ff5252] text-sm mt-4"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="w-full md:w-80 bg-white p-4 rounded shadow h-fit sticky top-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">PRICE DETAILS</h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Total Price</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount on MRP</span>
            <span>-₹{totalDiscount}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Coupons</span>
            <span>-₹{coupon}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Payable</span>
            <span>₹{totalPayable}</span>
          </div>
          <p className="text-green-600 mt-1 text-sm font-medium">
            You will save ₹{totalDiscount + coupon} on this order
          </p>
        </div>

        <button className="mt-6 w-full bg-orange-500 hover:bg-[#ff5252] text-white py-2 rounded text-sm font-semibold">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default CartListing;
