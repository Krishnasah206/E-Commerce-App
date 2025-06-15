import { Link } from 'react-router-dom'
import Search from '../Search/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGitCompareArrows } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));


function Header() {
  return (
    <header>
      <div className="top-strip py-2 border-t-[1px] border-gray-500 border-b-[1px]">
        <div className="container">
            <div className="flex items-center justify-between">
                <div className="col1 w-[50%]">
                    <p className="text-[14px] font-[500]">Get up to 50% off new season styles, limited time only</p>
                </div>

                <div className="col2 flex items-center justify-end">
                    <ul className='flex items-center gap-3'>
                        <li className='list-none'>
                            <Link to="/help-center" className="text-[13px] link font-[500] transition">Help Center{" "}</Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/order-tracking" className="text-[13px] link font-[500] transition">Order Tracking{" "}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

      <div className="header py-3">
        <div className="container flex items-center justify-between">
            <div className="col1 w-[15%]">
                <Link to="/"><img src='/logo.png' alt="Logo" /></Link>
            </div>
            <div className='col2 w-[50%]'><Search /></div>
            <div className='col3 w-[30%] flex items-center pl-7'>
                <ul className='flex items-center justify-end gap-3 w-full'>
                    <li className='list-none'>
                        <Link to="/login" className="link text-[15px] font-[500] transition">Login</Link> | &nbsp;
                        <Link to="/register" className="text-[15px] font-[500] link transition ml-3">Register</Link>
                    </li>
                    
                    
                    <li>
                        <Tooltip title="Wishlist">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <FaRegHeart />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Compare">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={5} color="secondary">
                                    <LuGitCompareArrows />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Cart">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={4} color="secondary">
                                    <MdOutlineShoppingCart />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
