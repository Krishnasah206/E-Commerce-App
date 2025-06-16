import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function AdsBannerSlider({ items }) {
  return (
    <div className="adsBannerSlider py-8 px-6 w-full">
      <Swiper
        spaceBetween={30}
        slidesPerView={items}
        navigation={true}
        modules={[Navigation]}
        className="sliderHome"
      >
        {[
          'https://serviceapi.spicezgold.com/download/1741669012402_banner1.webp',
          'https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp',
          'https://serviceapi.spicezgold.com/download/1741669057847_banner5.webp',
          'https://serviceapi.spicezgold.com/download/1742453755529_1741669087880_banner6.webp'
        ].map((src, idx) => (
          <SwiperSlide key={idx}>
            <Link to="#" className="group block rounded-[10px] overflow-hidden transition-all duration-300 ease-in-out">
              <div className="banner-box transition-shadow duration-300 ease-in-out">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-2"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AdsBannerSlider;
