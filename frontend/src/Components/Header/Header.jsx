import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGitCompareArrows } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navbar from '../Navbar/Navbar';
import CartContainer from '../Cart/CartContainer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {
  const navigate = useNavigate();
  const { userName, logout } = useContext(AuthContext);
  // const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSticky, setIsSticky] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Inside Header component:
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleCart = (open) => () => setCartOpen(open);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${userId}/remove/${productId}`);
      setCartItems((prev) => prev.filter(item => item.id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🛒 Fetch user-specific cart items
  useEffect(() => {
    if (!userId || !token) return;
    
    const fetchCartItems = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart/details/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true
          }
        );
        console.log("Fetched cart items:", res.data);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items", err);
      }
    };

    fetchCartItems();
  }, [cartOpen, userId, token]);

  return (
    <>
      <header className="w-full z-50">
        {/* Top Strip */}
        <div className={`hidden lg:block top-strip py-2 border-t border-b border-gray-500 bg-white transition-all duration-500 ease-in-out ${
  isSticky ? 'opacity-0 -translate-y-full h-0 overflow-hidden' : 'opacity-100 translate-y-0'
        }`}>
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

        {/* Sticky Middle Header & Navbar */}
        <div className={`w-full bg-white transition-all duration-300 ease-in-out ${
          isSticky ? 'fixed top-0 shadow-md animate-fade' : 'relative'
        }`}>
          <div className="py-2 border-b border-gray-500">
            <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Logo */}
              <div className="w-full sm:w-[15%] flex justify-center sm:justify-start">
                <Link to="/">
                  {/* Logo for lg and above */}
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-10 hidden lg:block"
                  />
                  {/* Logo for sm and md */}
                  <img
                    src="/logo-small.jpg"
                    alt="Small Logo"
                    className="h-10 block lg:hidden"
                  />
                </Link>
              </div>


              {/* Search */}
              <div className="w-full sm:w-[50%] px-4 sm:px-0">
                <Search />
              </div>

              {/* Icons */}
              <div className="w-full sm:w-[30%] flex justify-center sm:justify-end items-center">
                <ul className="flex items-center gap-3">
                  {userName ? (
                    <li className="text-sm font-small flex items-center gap-2 px-1 py-1 cursor-pointer">
                      

                      <IconButton
                        onClick={handleProfileClick}
                        className="gap-1 hover:bg-gray-200 rounded-none px-2 py-1"
                        disableRipple
                        disableFocusRipple
                        sx={{
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: '#e5e7eb',
                            borderRadius: 0,
                          },
                        }}
                      >
                        <AccountCircleIcon fontSize="medium" />
                        <span className="hidden lg:inline-block">
                          {userName.charAt(0).toUpperCase() + userName.slice(1)}
                        </span>
                      </IconButton>


                      <Menu
                        anchorEl={anchorEl}
                        open={openProfileMenu}
                        onClose={handleCloseProfileMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <MenuItem component={Link} to="/" onClick={handleCloseProfileMenu}>My Profile</MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseProfileMenu();
                            window.location.href = "/cartListing"; // or use navigate()
                          }}
                        >
                          My Cart
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </li>

                  ) : (
                    <li className="text-sm font-medium link">
                      <Link to="/login" className="mr-1">Login</Link> | <Link to="/register">Register</Link>
                    </li>
                  )}

                  <li className="hidden lg:inline-block">
                    <Tooltip title="Wishlist">
                      <IconButton>
                        <StyledBadge badgeContent={0} color="secondary">
                          <FaRegHeart />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </li>
                  <li className="hidden lg:inline-block">
                    <Tooltip title="Compare">
                      <IconButton>
                        <StyledBadge badgeContent={0} color="secondary">
                          <LuGitCompareArrows />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Cart">
                      <IconButton onClick={toggleCart(true)}>
                        <StyledBadge badgeContent={cartItems?.length || 0} color="secondary">
                          <MdOutlineShoppingCart />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Navbar />
        </div>

        {/* Spacer */}
        <div style={{ height: isSticky ? '100px' : '0px' }}></div>

        {/* Cart Drawer */}
        <CartContainer
          open={cartOpen}
          toggleDrawer={toggleCart}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
        />
      </header>
    </>
  );
}

export default Header;
