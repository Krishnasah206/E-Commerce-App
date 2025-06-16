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
    <div className='productSlider' >
      <Swiper
        breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 }
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="mySwiper"
      >


        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide >
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-auto">
            <ProductItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSlider;
