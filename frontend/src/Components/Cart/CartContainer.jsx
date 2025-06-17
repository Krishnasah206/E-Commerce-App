import React from 'react';
import Cart from '../Cart/Cart';

function CartContainer({ open, toggleDrawer, cartItems, onRemoveItem }) {
  return (
    <div className="cartContainer">
      <Cart
        open={open}
        toggleDrawer={toggleDrawer}
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
}

export default CartContainer;
