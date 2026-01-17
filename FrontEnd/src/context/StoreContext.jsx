import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [food_list, setFoodList] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const addToCart = (id) => {
    setCartItem((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItem((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        total += item.price * cartItem[item._id];
      }
    });
    return total;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(url + "/api/food/list");
    setFoodList(res.data.data);
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const value = {
    food_list,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
