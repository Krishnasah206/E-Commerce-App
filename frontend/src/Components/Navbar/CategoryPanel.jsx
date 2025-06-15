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
      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>

      <div className="scroll">
        <ul className="w-full">
          {/* Fashion Category */}
          <li className="list-none relative">
            <div className="relative">
              <Link to="/" className='w-full'>
                <Button
                  className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
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
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.7)]">
                      Men
                    </Button>
                  </Link>
                </li>
                <li className="list-none relative">
                    <Link to="/" className='w-full'>
                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.7)]">
                    Women
                  </Button>
                  </Link>
                </li>
                <li className="list-none relative">
                  <Link to="/" className='w-full'>
                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.7)]">
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
            <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
              Electronics
            </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Bags
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Footwear
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Groceries
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Beauty
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Wellness
              </Button>
            </Link>
          </li>
          <li className="list-none relative">
            <Link to="/" className='w-full'>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
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
