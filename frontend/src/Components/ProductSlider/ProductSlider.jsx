import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { Pagination } from 'swiper/modules';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function ProductSlider() {
  return (
    <div className='productSlider overflow-hidden' >
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {[...Array(10)].map((_, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
                <ProductItem />
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
