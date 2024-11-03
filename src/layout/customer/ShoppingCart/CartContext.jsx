import  { createContext, useState } from "react";
import PropTypes from "prop-types";
// Tạo context
export const CartContext = createContext();

// Component provider cho giỏ hàng
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired // children là một node và bắt buộc
};
