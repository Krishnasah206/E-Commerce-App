import React from 'react';
import BlogItem from '../BlogItem/BlogItem';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { Pagination } from 'swiper/modules';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function BlogSlider() {
  return (
    <div>
      <Swiper
              breakpoints={{
                  320: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 }
              }}
              spaceBetween={10}
              navigation={true}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              className="mySwiper"
        >
                <SwiperSlide className="!w-auto">
                    <BlogItem />
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                    <BlogItem />
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                    <BlogItem />
                </SwiperSlide>
                <SwiperSlide className="!w-auto">
                    <BlogItem />
                </SwiperSlide>
            
        </Swiper>
    </div>
  );
}

export default BlogSlider;
