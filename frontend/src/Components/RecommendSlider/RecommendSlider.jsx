import React from 'react';
import RecommendItem from '../RecommendItem/RecommendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function RecommendSlider({ products = [] }) {
  if (!products.length) return null;

  return (
    <div className="productSlider overflow-hidden">
        <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        navigation
        modules={[Navigation]}
        className="mySwiper"
        >
        {products.map((product) => (
            <SwiperSlide key={product.id || product._id} className="!w-auto">
                <RecommendItem product={product} />
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
}

export default RecommendSlider;
