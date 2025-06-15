import React from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='py-2'>
        <div className="container flex items-center justify-end">
            <div className="col1 w-[20%]">
                <Button className='!text-black gap-2 w-full'>
                    <FaBarsStaggered className="text-[18px]" />
                    SHOP BY CATEGORIES
                    <FaAngleDown className='text-[13px] ml-auto font-bold' />
                </Button>
            </div>

            <div className="col_2 w-[60%]">
                <ul className='flex items-center gap-5'>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Home</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Fashion</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Electronics</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Bags</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Footwear</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Groceries</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Beauty</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Wellness</Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >Jewellery</Link>
                    </li>
                </ul>
            </div>

            <div className="col_3 w-[20%] flex items-center gap-2">
                <IoRocketOutline className="text-gray-600" />
                <p className='text-[14px] font-[500]'>Free International Delivery</p>
            </div>


        </div>
    </nav>
  );
}

export default Navbar;
