import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiX } from 'react-icons/bi';

const Cart = ({ anchor = 'right', open, toggleDrawer }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch cart items when drawer opens
  useEffect(() => {
    console.log(userId, token);
    if (!userId || !open) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cart/details/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, [open, userId, token]);

  // Remove item from cart
  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/cart/${userId}/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 400,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
      >
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Shopping Cart ({cartItems.length})</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <BiX size={24} />
          </IconButton>
        </Box>
        <Divider />

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" color="text.secondary">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item, index) => (
              <Box key={item.id || index} sx={{ display: 'flex', mb: 2 }}>
                <img
                  src={item.image}
                  alt={item.productName}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '180px'
                    }}
                  >
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  <Typography variant="body2" color="error">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
                <IconButton onClick={() => handleRemoveItem(item.productId)}>
                  <MdOutlineDeleteOutline size={20} />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        {/* Bottom Total and Actions */}
        <Box sx={{ p: 2, borderTop: '1px solid #ccc' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1">Total (tax excl.)</Typography>
            <Typography variant="body1" fontWeight="bold" color="error">
              ₹{getTotal().toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#ff4d4d' }}
              onClick={() => {
                toggleDrawer(false)();
                navigate('/cartListing');
              }}
            >
              View Cart
            </Button>
            <Button variant="outlined" fullWidth color="error">
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
