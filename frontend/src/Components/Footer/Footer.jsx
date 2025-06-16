import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Top Features Section */}
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
                
                <div className="p-4 group">
                <LiaShippingFastSolid className="text-2xl mx-auto mb-2 transition-all duration-300 transform group-hover:scale-130 group-hover:text-[#ff5252]" />
                <h3 className="font-bold mb-2">Free Shipping</h3>
                <p className="text-xs">For all Orders Over $100</p>
                </div>

                <div className="p-4 group">
                <PiKeyReturnLight className="text-2xl mx-auto mb-2 transition-all duration-300 transform group-hover:scale-130 group-hover:text-[#ff5252]" />
                <h3 className="font-bold mb-2">30 Days Returns</h3>
                <p className="text-xs">For an Exchange Product</p>
                </div>

                <div className="p-4 group">
                <IoWalletOutline className="text-2xl mx-auto mb-2 transition-all duration-300 transform group-hover:scale-130 group-hover:text-[#ff5252]" />
                <h3 className="font-bold mb-2">Secured Payment</h3>
                <p className="text-xs">Payment Cards Accepted</p>
                </div>

                <div className="p-4 group">
                <LiaGiftSolid className="text-2xl mx-auto mb-2 transition-all duration-300 transform group-hover:scale-130 group-hover:text-[#ff5252]" />
                <h3 className="font-bold mb-2">Special Gifts</h3>
                <p className="text-xs">Our First Product Order</p>
                </div>

                <div className="p-4 group">
                <BiSupport className="text-2xl mx-auto mb-2 transition-all duration-300 transform group-hover:scale-130 group-hover:text-[#ff5252]" />
                <h3 className="font-bold mb-2">Support 24/7</h3>
                <p className="text-xs">Contact us Anytime</p>
                </div>

            </div>
        </div>




      {/* Divider */}
      <div className="border-t-3 border-gray-200"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Column */}
            <div>
            <h4 className="font-bold text-base mb-4">Contact us</h4>
            <address className="not-italic">
                <p className="my-2 text-sm">sales@ourcompany.com</p>
                <p className='text-sm' >(+91) 9999999999</p>
            </address>
            <div className="mt-4">
                <button className="text-[#ff5252] font-medium">
                Online Chat
                </button>
                <p className="text-xs mt-1">Get Expert Help</p>
            </div>
            </div>

            {/* Products Column with border */}
            <div className="border-l-3 border-gray-200 pl-10">
            <h4 className="font-bold text-base mb-4">Products</h4>
            <ul className="space-y-2 text-sm ">
                {['Prices drop', 'New products', 'Best sales', 'Contact us', 'Sitemap', 'Stores'].map((item) => (
                <li key={item}>
                    <a href="#" className="hover:text-[#ff5252]">{item}</a>
                </li>
                ))}
            </ul>
            </div>


          {/* Company Column */}
          <div>
            <h4 className="font-bold text-base mb-4">Our company</h4>
            <ul className="space-y-2 text-sm">
              {['Delivery', 'Legal Notice', 'Terms and conditions of use', 'About us', 'Secure payment', 'Login'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#ff5252]">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-base mb-4">Subscribe to newsletter</h4>
            <p className="mb-4 text-xs">
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <form className="mb-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-[#ff5252] text-white py-2 rounded hover:bg-[#ff5252] transition"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 mr-2" 
              />
              <label htmlFor="terms" className="text-xs">
                I agree to the terms and conditions and the privacy policy
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 - Ecommerce Trendify</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;