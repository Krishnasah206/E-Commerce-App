import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiX } from 'react-icons/bi';

const Cart = ({ anchor = 'right', open, toggleDrawer, cartItems = [], onRemoveItem }) => {
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

const navigate = useNavigate();


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
          <IconButton onClick={() => toggleDrawer(false)()}>
            <BiX size={24} />
          </IconButton>
        </Box>
        <Divider />

        {/* Scrollable Items Section */}
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
                  <Typography variant="body1" noWrap>{item.productName}</Typography>
                  <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  <Typography variant="body2" color="error">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
                <IconButton onClick={() => onRemoveItem(item.id)}>
                  <MdOutlineDeleteOutline size={20} />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        {/* Fixed Bottom Section */}
        <Box sx={{ p: 2, borderTop: '1px solid #ccc' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1">Total (tax excl.)</Typography>
            <Typography variant="body1" color="error">
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
