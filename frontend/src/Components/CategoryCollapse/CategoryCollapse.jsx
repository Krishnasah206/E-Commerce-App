import React, { useState } from 'react';
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function CategoryCollapse() {
  const [isFashionOpen, setIsFashionOpen] = useState(false);

  const toggleFashion = () => {
    setIsFashionOpen(!isFashionOpen);
  };

  return (
    <div className="scroll">
      <ul className="w-full">
        {/* Fashion Category */}
        <li className="list-none relative">
          <div className="relative">
            <Button
              className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all"
              onClick={toggleFashion}
            >
              Fashion
            </Button>

            {isFashionOpen ? (
              <FaRegSquareMinus
                className="absolute top-[14px] right-[15px] text-[16px] text-gray-600 cursor-pointer"
                onClick={toggleFashion}
              />
            ) : (
              <FaRegPlusSquare
                className="absolute top-[14px] right-[15px] text-[16px] text-gray-600 cursor-pointer"
                onClick={toggleFashion}
              />
            )}
          </div>

          {isFashionOpen && (
            <ul className="submenu w-full pl-6 mt-1">
              {['Men', 'Women', 'Children'].map((sub, i) => (
                <li className="list-none relative" key={i}>
                  <Link to="/productListing" className='w-full'>
                    <Button className="w-full !text-left !justify-start !px-6 !py-2 !text-[14px] !text-gray-600 hover:!bg-gray-50 transition">
                      {sub}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Other categories */}
        {['Electronics', 'Bags', 'Footwear', 'Groceries', 'Beauty', 'Wellness', 'Jewellery'].map((cat, i) => (
          <li className="list-none relative" key={i}>
            <Link to="/productListing" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                {cat}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryCollapse;
