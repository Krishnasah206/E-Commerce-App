// src/components/BlogItem/BlogItem.jsx
import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

function BlogItem({ blog }) {
  return (
    <div className="blogItem w-[310px] group relative shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-xl">
      
      <div className="imgWrapper w-full h-[180px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
        />
      </div>

      <div className="p-4 bg-white">
        <h3 className="text-[16px] font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-red-500 transition">
          {blog.name}
        </h3>
        <p className="text-[14px] text-gray-600 line-clamp-4 mb-4">
          {blog.description.slice(0, 120)}...
        </p>

        <button className="w-full flex items-center gap-1 pl-3 text-gray-500 text-[13px] font-semibold py-2 rounded-md hover:text-[#ff5252] transition cursor-pointer">
          Read More
          <FaAngleRight className="transition-transform group-hover:translate-x-1 duration-300" />
        </button>
      </div>
    </div>
  );
}

export default BlogItem;
