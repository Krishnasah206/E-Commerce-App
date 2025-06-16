import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const CategoryPanel = (props) => {
  const [isFashionOpen, setIsFashionOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    props.openCatPanel(newOpen);
  };

  const toggleFashion = () => {
    setIsFashionOpen(!isFashionOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-4 text-[18px] font-semibold text-gray-800 border-b flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[22px] text-gray-600 hover:text-red-500 transition"
        />
      </h3>


      <div className="scroll">
        <ul className="w-full">
          {/* Fashion Category */}
          <li className="list-none relative">
            <div className="relative">
              <Link to="/" className='w-full'>
                <Button
                  className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all "
                  onClick={toggleFashion}
                >
                  Fashion
                </Button>
              </Link>
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
                
                <li className="list-none relative">
                  <Link to="/" className='w-full'>
                    <Button className="w-full !text-left !justify-start !px-6 !py-2 !text-[14px] !text-gray-600 hover:!bg-gray-50 transition">
                      Men
                    </Button>
                  </Link>
                </li>
                <li className="list-none relative">
                    <Link to="/" className='w-full'>
                  <Button className="w-full !text-left !justify-start !px-6 !py-2 !text-[14px] !text-gray-600 hover:!bg-gray-50 transition">
                    Women
                  </Button>
                  </Link>
                </li>
                <li className="list-none relative">
                  <Link to="/" className='w-full'>
                  <Button className="w-full !text-left !justify-start !px-6 !py-2 !text-[14px] !text-gray-600 hover:!bg-gray-50 transition">
                    Children
                  </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other categories manually written */}
          <li className="list-none relative">
            <Link>
            <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
              Electronics
            </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Bags
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Footwear
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Groceries
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Beauty
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Wellness
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-4 !py-3 !text-[15px] !text-[rgba(0,0,0,0.8)] hover:!bg-gray-100 transition-all">
                Jewellery
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
