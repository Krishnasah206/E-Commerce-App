import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { Pagination } from 'swiper/modules';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function CatelogSlider() {
  return (
    <div className='homeCatSlider' >
        <div className="container">
            <Swiper
                slidesPerView={6}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                loop={true}
                
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/'>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                
                
            </Swiper>
        </div>
    </div>
  );
}


export default CatelogSlider;
