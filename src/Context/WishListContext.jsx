import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast/headless";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("user-token"),
  };
  const [wishList, setWishList] = useState([]);
  const [count, setCount] = useState(0);

  async function addToWishList(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      getAllWishList();
    } catch (error) {
      console.warn(error);
    }
  }

  async function getAllWishList() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishList(data.data);
      setCount(data.count);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <React.Fragment>
      <WishListContext.Provider
        value={{
          addToWishList,
          getAllWishList,
          wishList,
          count,
          headers,
        }}
      >
        {children}
      </WishListContext.Provider>
    </React.Fragment>
  );
}
