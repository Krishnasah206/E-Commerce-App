import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuGitCompareArrows } from 'react-icons/lu';
import ProductSlider from '../ProductSlider/ProductSlider';

function ProductDetails() {
  return (
    <>
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Product Images */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="mb-4 flex gap-2">
            <img src="https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-0-202305251453.webp" alt="thumb" className="w-12 h-12 border rounded cursor-pointer" />
            <img src="https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-1-202305251453.jpg" alt="thumb" className="w-12 h-12 border rounded opacity-40" />
          </div>
          <img src="https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-1-202305251453.jpg" alt="Main product" className="w-full max-w-md rounded" />
        </div>

        {/* Right - Product Info */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2">
            Aqualite Black & Grey Slip-Resistance Sliders for Men
          </h2>

          <p className="text-sm text-gray-600 mb-1">
            Brands: <span className="text-black font-medium">Aqualite</span>
          </p>

          <div className="flex items-center mb-3">
            <span className="line-through text-gray-500 mr-2">₹1450</span>
            <span className="text-red-600 font-bold text-xl">₹1850</span>
            <span className="ml-4 text-green-600 font-medium">Available In Stock: <span className="font-bold">74842 Items</span></span>
          </div>

          <p className="text-gray-600 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <p className="text-sm text-gray-700 mb-2">Free Shipping (Est. Delivery Time 2-3 Days)</p>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-4">
            <select className="border rounded px-2 py-1">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium">
              ADD TO CART
            </button>
          </div>

          <div className="flex gap-6 text-sm">
            <button className="flex items-center gap-1 text-gray-700 hover:text-black">
              <FaRegHeart /> Add to Wishlist
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-black">
              <LuGitCompareArrows /> Add to Compare
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t pt-4">
            <div className="flex gap-4 mb-2">
              <button className="text-red-500 font-semibold">Description</button>
              <button className="text-gray-500">Reviews (0)</button>
            </div>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Related Products</h2>
            </div>
          </div>

          <ProductSlider />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
