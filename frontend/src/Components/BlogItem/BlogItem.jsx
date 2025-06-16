import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

function BlogItem() {
  return (
    <div className="blogItem w-[310px] group relative shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-xl">
      
      {/* Image Section */}
      <div className="imgWrapper w-full h-[180px] overflow-hidden">
        <img
          src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
          alt="Blog"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* Info Section */}
      <div className="p-4 bg-white">
        <h3 className="text-[16px] font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-red-500 transition">
          Sustainable Living Through Cutting-Edge Prefabricated Homes
        </h3>
        <p className="text-[14px] text-gray-600 line-clamp-4 mb-4">
          Give 2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an...
        </p>

        {/* Read More Button with Icon */}
        <button className="w-full flex items-center gap-1 pl-3 text-gray-500 text-[13px] font-semibold py-2 rounded-md hover:text-[#ff5252] transition cursor-pointer">
          Read More
          <FaAngleRight className="transition-transform group-hover:translate-x-1 duration-300" />
        </button>
      </div>
    </div>
  );
}

export default BlogItem;
