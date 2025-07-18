import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function ProductSlider({ products = [], cartOpen = false, setCartItems = () => {} }) {
  if (!products.length) return null;

  return (
    <div className="productSlider overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id || product._id} className="!w-auto">
            <ProductItem
              product={product}
              token={localStorage.getItem("token")}
              cartOpen={cartOpen}
              setCartItems={setCartItems}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
