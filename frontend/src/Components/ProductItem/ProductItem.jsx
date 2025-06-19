import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import '../ProductItem/ProductItem.css';

function ProductItem() {
  const [product, setProduct] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/journal/api/products/68535a436fbc0d31e1ca78a9') // Replace with your actual endpoint
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, []);

  if (!product) return <div>Loading...</div>;

  const discountedPrice = product.mrp - (product.mrp * (product.discount / 100));

  return (
    <div
      className="productItem group relative w-[240px] shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute top-2 left-2 bg-[#ff5252] text-white text-[12px] px-2 py-1 rounded-md font-semibold z-20">
        {product.discount}%
      </span>

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

      <div className="imgWrapper w-full h-[220px] overflow-hidden relative cursor-pointer">
        <img
          src={product.images[0]}
          alt="Product"
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={product.images[1] || product.images[0]}
          alt="Product Hover"
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="info p-4 bg-white">
        <h6 className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">
          {product.brand}
        </h6>
        <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-2 mt-1 mb-2">
          {product.productName}
        </h3>
        <Rating name="product-rating" value={product.rating} size="small" readOnly />

        <div className="flex items-center gap-2 mt-2">
          <span className="line-through text-gray-400 text-[14px]">₹{product.mrp.toFixed(2)}</span>
          <span className="text-[#ff5252] font-bold text-[15px]">₹{discountedPrice.toFixed(2)}</span>
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 border border-[#ff5252] text-[#ff5252] text-[13px] font-semibold py-2 rounded-md hover:bg-[#ff5252] hover:text-white transition cursor-pointer">
          <FaShoppingCart className="text-[14px]" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
