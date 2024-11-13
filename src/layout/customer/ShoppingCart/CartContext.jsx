import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productId = `${product.name}-${product.color}`;
  
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
  
    if (existingProductIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, id: productId, quantity: 1 },
      ]);
    }
  };


  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems,setCartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};
