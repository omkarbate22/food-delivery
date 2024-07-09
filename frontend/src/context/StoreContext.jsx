import { createContext, useState } from "react";
import { food_list } from "../assets/assets"; // Ensure this path is correct

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const { [itemId]: _, ...rest } = cartItems;
      setCartItems(rest);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((item) => item._id === itemId); // Use itemId instead of parseInt(itemId)
      if (item) {
        totalAmount += cartItems[itemId] * item.price;
      }
    }
    return totalAmount;
  };
  

  const getTotalItemCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      totalCount += cartItems[itemId];
    }
    return totalCount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemCount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
