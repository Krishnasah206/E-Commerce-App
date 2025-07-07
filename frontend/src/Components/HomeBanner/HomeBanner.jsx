import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeBanner() {
  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      {[
        {
          img: 'https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg',
          title: 'Women Solid Round Green T-Shirt',
          price: '₹1,650.00',
        },
        {
          img: 'https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg',
          title: 'Buy Modern Chair In Black Color',
          price: '₹35,650.00',
        },
      ].map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="item w-full relative rounded-md overflow-hidden">
            <img
              src={slide.img}
              alt={`Banner ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="info animate-slideIn absolute top-0 right-0 w-[50%] h-full z-10 p-8 flex items-center flex-col justify-center bg-gradient-to-l from-white/80 to-transparent text-left">
              <h4 className="text-[18px] font-medium w-full mb-3">
                Big Saving Days Sale
              </h4>
              <h2 className="text-[32px] sm:text-[35px] font-bold w-full leading-tight">
                {slide.title}
              </h2>
              <h3 className="flex items-center gap-3 text-[18px] font-medium w-full mt-3 mb-3">
                Starting At Only{' '}
                <span className="text-[#ff5252] text-[30px] font-bold">
                  {slide.price}
                </span>
              </h3>
              <div className="w-full">
                <button className="bg-[#ff5252] hover:bg-[#e94747] text-white text-sm font-semibold px-5 py-2 rounded-md transition">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
