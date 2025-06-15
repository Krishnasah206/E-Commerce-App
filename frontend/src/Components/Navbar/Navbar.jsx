import React, {useState} from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';
import '../Navbar/Navbar.css'; // Assuming you have a CSS file for Navbar styles

function Navbar() {

    const [isOpenCatPanel, setIsOpenCatPanel] = React.useState(false);

    const openCatPanel = () => {
        setIsOpenCatPanel(!isOpenCatPanel);
    }

  return (
    <>
    <nav className='py-2'>
        <div className="container flex items-center justify-end gap-8">
            <div className="col1 w-[20%]">
                <Button className='!text-black gap-2 w-full' onClick={openCatPanel}>
                    <FaBarsStaggered className="text-[18px]" />
                    SHOP BY CATEGORIES
                    <FaAngleDown className='text-[13px] ml-auto font-bold' />
                </Button>
            </div>

            <div className="col_2 w-[60%] relative">
                <ul className='nav flex items-center gap-3'>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Home</Button>
                        </Link>
                    </li>
                    <li className='list-none relative group'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Fashion</Button>
                        </Link>

                        {/* Dropdown Menu for Fashion */}
                        <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ">
                            <ul>
                                <li className="list-none w-full">
                                    <Link to="/" className='w-full' >
                                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                            Men
                                        </Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link to="/" className='w-full'>
                                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                            Women
                                        </Button>
                                    </Link>
                                </li>
                                <li className="list-none w-full">
                                    <Link to="/" className='w-full'>
                                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                            Children
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Electronics</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Bags</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Footwear</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Groceries</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Beauty</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Wellness</Button>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to="/" className='link transition text-[14px] font-[500]' >
                            <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] '>Jewellery</Button>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col_3 w-[20%] flex items-center ml-8 gap-2">
                <IoRocketOutline className="text-gray-600" />
                <p className='text-[14px] font-[500]'>Free International Delivery</p>
            </div>


        </div>
    </nav>

    <CategoryPanel openCatPanel={openCatPanel} isOpenCatPanel={isOpenCatPanel} />
    </>
  );
}

export default Navbar;
