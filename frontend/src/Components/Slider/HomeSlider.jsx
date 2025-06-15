import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

function HomeSlider() {
  return (
    <div className='homeSlider py-4'>
      <div className="container">
        <Swiper
          spaceBetween={30}
          // loop={true}
          // autoplay={{
          //   delay: 3000, // slide every 3 seconds
          //   disableOnInteraction: false, // continues autoplay even after user interacts
          // }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="sliderHome"
        >
          {[
            'https://serviceapi.spicezgold.com/download/1748955943280_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg',
            'https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg',
            'https://serviceapi.spicezgold.com/download/1748955908049_NewProject(13).jpg',
            'https://serviceapi.spicezgold.com/download/1748955883517_NewProject(6).jpg',
            'https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg',
          ].map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="item rounded-[10px] overflow-hidden">
                <img src={src} alt={`Slide ${idx + 1}`} className="w-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
