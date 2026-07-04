// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const isExist = prev.find(item => item.id === product.id);
//       if (isExist) {
//         return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);