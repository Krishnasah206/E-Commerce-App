import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

function ProductSlider({ products = [] }) {
  return (
    <div className='productSlider overflow-hidden'>
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {products.map((product, idx) => (
          <SwiperSlide key={idx} className="!w-auto">
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
