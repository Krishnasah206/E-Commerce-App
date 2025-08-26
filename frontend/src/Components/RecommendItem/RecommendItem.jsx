import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoMdGitCompare } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../ProductItem/ProductItem.css'; // Use same CSS

function RecommendItem({ product }) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!product) return null;

  const discountedPrice = product.mrp - (product.mrp * (product.discount / 100));

  const handleAddToCart = async () => {
    if (!userId || !token) {
      toast.error("Please login to add items to your cart.");
      return;
    }

    setAdding(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/${userId}/add`,
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      toast.success("Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="productItem group relative w-[240px] shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute top-2 left-2 bg-[#ff5252] text-white text-[12px] px-2 py-1 rounded-md font-semibold z-20">
        {product.discount}%
      </span>

      {/* Quick Actions */}
      <div className="absolute top-0 right-2 flex flex-col items-center gap-2 z-20 opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
        <button className="bg-white p-2 rounded-full shadow hover:bg-[#ff5252] hover:text-white">
          <MdOutlineZoomOutMap className="text-[18px]" />
        </button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-[#ff5252] hover:text-white">
          <IoMdGitCompare className="text-[18px]" />
        </button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-[#ff5252] hover:text-white">
          <FaRegHeart className="text-[18px]" />
        </button>
      </div>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="imgWrapper w-full h-[220px] overflow-hidden relative cursor-pointer">
          <img
            src={product.images?.[0]}
            alt="Product"
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src={product.images?.[1] || product.images?.[0]}
            alt="Product Hover"
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="info p-4 bg-white">
        <h6 className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">{product.brand}</h6>
        <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-2 mt-1 mb-2">{product.productName}</h3>
        <Rating name="product-rating" value={product.rating || 0} size="small" readOnly />
        <div className="flex items-center gap-2 mt-2">
          <span className="line-through text-gray-400 text-[14px]">₹{product.mrp.toFixed(2)}</span>
          <span className="text-[#ff5252] font-bold text-[15px]">₹{discountedPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="mt-4 w-full flex items-center justify-center gap-2 border border-[#ff5252] text-[#ff5252] text-[13px] font-semibold py-2 rounded-md hover:bg-[#ff5252] hover:text-white transition cursor-pointer"
        >
          <FaShoppingCart className="text-[14px]" />
          {adding ? "ADDING..." : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

export default RecommendItem;
