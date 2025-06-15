import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Search from '../Search/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGitCompareArrows } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navbar from '../Navbar/Navbar';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="bg-white w-full z-50">
        {/* Top strip scrolls normally */}
        <div className="top-strip py-2 border-t border-b border-gray-500">
          <div className="container flex items-center justify-between">
            <p className="text-sm font-medium w-1/2">
              Get up to 50% off new season styles, limited time only
            </p>
            <ul className="flex items-center gap-3">
              <li><Link to="/help-center" className="text-sm font-medium link">Help Center</Link></li>
              <li><Link to="/order-tracking" className="text-sm font-medium link">Order Tracking</Link></li>
            </ul>
          </div>
        </div>

        {/* Sticky middle + navbar */}
        <div
          className={`w-full bg-white transition-all duration-300 ease-in-out ${
            isSticky ? 'fixed top-0 shadow-md animate-fade' : 'relative'
          }`}
        >
          {/* Middle */}
          <div className="py-2 border-b border-gray-500">
            <div className="container flex items-center justify-between">
              <div className="w-[15%]">
                <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
              </div>
              <div className="w-[50%]">
                <Search />
              </div>
              <div className="w-[30%] flex items-center pl-7">
                <ul className="flex items-center justify-end gap-3 w-full">
                  <li>
                    <Link to="/login" className="text-sm font-medium link mr-1">Login</Link> | &nbsp;
                    <Link to="/register" className="text-sm font-medium link">Register</Link>
                  </li>
                  <li>
                    <Tooltip title="Wishlist">
                      <IconButton><StyledBadge badgeContent={4} color="secondary"><FaRegHeart /></StyledBadge></IconButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Compare">
                      <IconButton><StyledBadge badgeContent={5} color="secondary"><LuGitCompareArrows /></StyledBadge></IconButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Cart">
                      <IconButton><StyledBadge badgeContent={4} color="secondary"><MdOutlineShoppingCart /></StyledBadge></IconButton>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navbar */}
          <Navbar />
        </div>

        {/* Layout placeholder to prevent jump */}
        <div style={{ height: isSticky ? '112px' : '0px' }}></div>
      </header>
    </>
  );
}



export default Header;