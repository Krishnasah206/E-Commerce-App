import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { Pagination } from 'swiper/modules';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

function CatelogSlider() {
  return (
    <div className='homeCatSlider pt-4 py-8 ' >
        <div className="container">
            <Swiper
                breakpoints={{
                    0: {
                    slidesPerView: 2,
                    },
                    768: {
                    slidesPerView: 4,
                    },
                    1024: {
                    slidesPerView: 6,
                    },
                }}
                slidesPerView={6}
                spaceBetween={30}
                navigation={true}
                loop={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Fashion' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.W8LhTFppBL8XvUK16t1WuAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Fashion</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Electronics' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.lNAk-VXigbaua5eh3sMdWwHaHa?w=181&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Electronics</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Bag' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.qZaLU-aG-4mKEiX7pbO05QHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Bags</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Footwear' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th?q=Footwear+Clip+Art&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=NP&setlang=en&adlt=moderate&t=1&mw=247" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Footwear</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Groceries' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.SrNMl82FE6DVpAuoSdmJXAHaHa?w=200&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Groceries</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Beauty' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.RXLrP1KKbV0ONKV9oGi4FAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Beauty</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Wellness' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://cdn-icons-png.flaticon.com/512/11053/11053968.png" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Wellness</h3>
                    </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to='/productListing' state={{ category: 'Jewellery' }}>
                    <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                        <img src="https://th.bing.com/th/id/OIP.m-bPNCtunxBipt5y53C-7AHaHa?w=202&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Category 1" className="w-[60px] transition-all " />
                        <h3 className="text-[15px] font-[500] mt-3">Jewellery</h3>
                    </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  );
}


export default CatelogSlider;
