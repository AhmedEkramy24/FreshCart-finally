import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("user-token"),
  };
  const [cart, setCart] = useState(null);
  async function addToCart(id) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers,
        }
      );
      getAllProductsFromCart();
      
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllProductsFromCart() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProductsFromCart();
  }, []);
  return (
    <>
      <CartContext.Provider
        value={{ cart, addToCart, getAllProductsFromCart, headers }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
