import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuGitCompareArrows } from 'react-icons/lu';
import Rating from '@mui/material/Rating';
import ProductSlider from '../ProductSlider/ProductSlider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ProductDetails() {
  const images = [
    "https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-0-202305251453.webp",
    "https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-1-202305251453.jpg",
    "https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-1-202305251453.jpg",
    "https://serviceapi.spicezgold.com/download/1742444094460_aqualite-mens-black-grey-slider-product-images-rvlx7wvjex-1-202305251453.jpg"
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const [quantity, setQuantity] = React.useState(1);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <section className="productDetails bg-white">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Image List and Main Image */}
          <div className="w-full md:w-1/2 flex flex-row">
            <div className="imageList mb-4 flex flex-col gap-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 border rounded cursor-pointer ${mainImage === img ? 'opacity-100' : 'opacity-40'}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="image pl-4 ">
              <img src={mainImage} alt="Main product" className="w-full max-w-md rounded" />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="w-full pt-[90px] md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">
              Aqualite Black & Grey Slip-Resistance Sliders for Men
            </h2>

            <p className="text-md text-gray-600 mb-1 flex items-center gap-2">
              Brands: <span className="text-black font-medium">Aqualite</span>
              <Rating name="size-small" defaultValue={5} size="small" readOnly />
              <span className="text-gray-500">(5 reviews)</span>
            </p>

            <div className="flex items-center mb-3">
              <span className="line-through text-gray-500 mr-2">₹2050</span>
              <span className="text-red-600 font-bold text-xl">₹1850</span>
              <span className="ml-4 text-green-600 font-medium">Available In Stock: <span className="font-bold">42 Items</span></span>
            </div>

            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ipsa saepe tempora culpa ipsum dolore dolor temporibus libero dolorem, nemo architecto at vel iusto impedit beatae eveniet excepturi ducimus laudantium explicabo sit ea repudiandae id. Totam quas fugit reprehenderit obcaecati. Repudiandae velit animi iusto tempore ipsa sunt eos nobis perferendis?
            </p>

            <p className="text-sm text-gray-900 mb-3">Free Shipping (Est. Delivery Time 2-3 Days)</p>

            {/* Quantity Selector with Add to Cart */}
            <div className="flex items-center hover:border-[#ff5252] gap-4 mb-4">
              <FormControl sx={{ minWidth: 100 }} size="small">
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity-select"
                  value={quantity}
                  onChange={handleChange}
                  label="Quantity"
                >
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium">
                ADD TO CART
              </button>
            </div>


            {/* Wishlist & Compare */}
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`flex items-center gap-1 ${wishlist ? 'text-[#ff5252]' : 'text-gray-700'} hover:text-[#ff5252]`}
              >
                {wishlist ? <FaHeart /> : <FaRegHeart />} Add to Wishlist
              </button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                <LuGitCompareArrows /> Add to Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className="description pl-[100px] pr-[100px] bg-white pt-4 px-4">
        <div className="flex gap-4 mb-2">
          <button
            onClick={() => setActiveTab('description')}
            className={`font-semibold ${activeTab === 'description' ? 'text-red-500' : 'text-gray-500'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-semibold ${activeTab === 'reviews' ? 'text-red-500' : 'text-gray-500'}`}
          >
            Reviews (3)
          </button>
        </div>

        {activeTab === 'description' ? (
          <p className="bg-white p-5 rounded-xl shadow-md text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquam repellendus, magni, molestiae doloremque
            pariatur architecto quas libero deserunt, tenetur optio sit maiores nisi esse!
          </p>
        ) : (
          <div className="p-4 shadow rounded text-gray-600">
            <p>⭐️⭐️⭐️⭐️⭐️ - "Excellent Product!"</p>
            <p>⭐️⭐️⭐️⭐️ - "Very comfortable and stylish."</p>
            <p>⭐️⭐️⭐️ - "Decent quality for the price."</p>
          </div>
        )}
      </div>

      {/* Related Products */}
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
    </section>
  );
}

export default ProductDetails;
