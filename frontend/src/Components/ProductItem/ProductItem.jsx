import React, { useState } from 'react';
import '../ProductItem/ProductItem.css';
import Rating from '@mui/material/Rating';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";

function ProductItem() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="productItem group relative w-[240px] shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Discount Badge */}
      <span className="absolute top-2 left-2 bg-[#ff5252] text-white text-[12px] px-2 py-1 rounded-md font-semibold z-20">
        10%
      </span>

      {/* Action Icons */}
      <div className="absolute top-0 right-2 flex flex-col items-center gap-2 z-20 opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
        <button className="bg-white p-2 rounded-full shadow transition-all hover:bg-[#ff5252] hover:text-white cursor-pointer">
          <MdOutlineZoomOutMap className="text-[18px]" />
        </button>
        <button className="bg-white p-2 rounded-full shadow transition-all hover:bg-[#ff5252] hover:text-white cursor-pointer">
          <IoMdGitCompare className="text-[18px]" />
        </button>
        <button className="bg-white p-2 rounded-full shadow transition-all hover:bg-[#ff5252] hover:text-white cursor-pointer">
          <FaRegHeart className="text-[18px]" />
        </button>
      </div>

      {/* Image Wrapper with Smooth Transition */}
      <div className="imgWrapper w-full h-[220px] overflow-hidden relative cursor-pointer">
        <img
          src="https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
          alt="Product"
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src="https://serviceapi.spicezgold.com/download/1742462552743_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-2-202308161432.webp"
          alt="Product Hover"
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Info Section */}
      <div className="info p-4 bg-white">
        <h6 className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
          CLAFOUTIS
        </h6>
        <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-2 mt-1 mb-2">
          Men Opaque Casual Shirt...
        </h3>
        <Rating name="product-rating" defaultValue={4} size="small" readOnly />

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          <span className="line-through text-gray-400 text-[14px]">₹1,650.00</span>
          <span className="text-[#ff5252] font-bold text-[15px]">₹1,450.00</span>
        </div>

        {/* Cart Button */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 border border-[#ff5252] text-[#ff5252] text-[13px] font-semibold py-2 rounded-md hover:bg-[#ff5252] hover:text-white transition cursor-pointer">
          <FaShoppingCart className="text-[14px]" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
