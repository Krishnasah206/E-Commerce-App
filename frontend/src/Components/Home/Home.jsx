import React from 'react';
import HomeSlider from '../Slider/HomeSlider';
import CatelogSlider from '../Slider/CatelogSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from '../Slider/AdsBannerSlider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../ProductSlider/ProductSlider';
import BlogSlider from '../BlogSlider/BlogSlider';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomePart2 from '../HomeBanner/HomePart2';

function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      

      <div className='relative  z-10'>
        <HomeSlider />
      </div>
      <CatelogSlider />

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Popular Products</h2>
              <p className="text-[14px] font-medium">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-[60%] ">
              <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Fashion" />
                  <Tab label="Electronics" />
                  <Tab label="Bags" />
                  <Tab label="Footwear" />
                  <Tab label="Groceries" />
                  <Tab label="Beauty" />
                  <Tab label="Wellness" />
                  <Tab label="Jewellery" />
                </Tabs>
              </Box>
            </div>
          </div>

          <ProductSlider />
        </div>
      </section>

      <section className="py-6">
        <div className="container flex gap-5">
          <div className="part1 w-[70%]">
            <HomeBanner />
          </div>

          <div className="part2 w-[30%] flex items-center gap-5 justify-between flex-col">
            <HomePart2 />
          </div>
        </div>
      </section>



      <section className="py-10 bg-white">
        <div className="container">
          <div className="freeShipping w-full py-4 p-4 border-2 border-black flex items-center justify-between rounded-md">
            
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600] uppercase">Free Shipping</span>
            </div>
            
            <div className="col2">
              <p className="mb-0 font-[500]">
                Free Delivery Now On Your First Order and Orders Over $200
              </p>
            </div>

            <div className="col3">
              <h1 className="text-[30px] font-[600] text-black">
                -Only $200*
              </h1>
            </div>
          </div>
        </div>

        <AdsBannerSlider items={4} />
      </section>

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Latest Products</h2>
            </div>
          </div>

          <ProductSlider />
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Featured Products</h2>
            </div>
          </div>

          <ProductSlider />
        </div>

        <AdsBannerSlider items={4} />
      </section>


      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Bags</h2>
            </div>
          </div>

          <ProductSlider />
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] font-[600]">Wellness</h2>
            </div>
          </div>

          <ProductSlider />
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <div className="leftSec w-[40%]">
              <h2 className="text-[20px] py-3 font-[600]">From the blog</h2>
            </div>
          </div>

          <BlogSlider />
        </div>
      </section>
    </>
  );
}

export default Home;
