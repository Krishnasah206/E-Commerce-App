// src/components/BlogSlider/BlogSlider.jsx
import React from 'react';
import BlogItem from '../BlogItem/BlogItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

function BlogSlider({ blogs = [] }) {
  return (
    <div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3.2 }
        }}
        spaceBetween={10}
        className="mySwiper"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className="!w-auto">
            <BlogItem blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BlogSlider;
