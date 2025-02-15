import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  let { cart, getAllProductsFromCart, headers } = useContext(CartContext);
  useEffect(() => {
    getAllProductsFromCart();
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  async function addCountToProduct(count, id) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: ++count },
      { headers }
    );
    getAllProductsFromCart();
  }

  async function lessCountToProduct(count, id) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: --count },
      { headers }
    );
    getAllProductsFromCart();
  }
  async function deleteProduct(id) {
    setIsLoading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers }
    );
    getAllProductsFromCart();
    setIsLoading(false);
  }
  async function clearCart() {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers }
    );
    getAllProductsFromCart();
  }

  return (
    <>
      <div className="container p-2 rounded-md overflow-hidden">
      {cart ? (
        <div className=" mt-16 p-4 bg-slate-200 relative">
          <h2 className="text-3xl">Shop Cart :</h2>
          <p className="text-main text-xl">
            Total Cart Price :{" "}
            <span className="underline">{cart.data.totalCartPrice} EGP</span>
          </p>
          {cart.data.products.map((product, index) => (
            <div
              key={index}
              className="flex border-b p-2 justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <div className="size-[120px] rounded-md overflow-hidden">
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl">
                    {product.product.title.split(" ", 2).join(" ")}...
                  </h2>
                  <p className="text-main">
                    Price : {product.price * product.count}
                  </p>

                  <p
                    onClick={() => {
                      deleteProduct(product.product.id);
                    }}
                    className="hover:text-main hover:underline cursor-pointer"
                  >
                    <i className="fa-solid fa-trash-can text-main me-1 "></i>
                    Remove
                  </p>
                </div>
              </div>
              <div className="flex flex-nowrap">
                <span
                  onClick={() => {
                    lessCountToProduct(product.count, product.product.id);
                  }}
                  className="rounded-sm border-main border-2 me-3 px-1 cursor-pointer"
                >
                  <i className="fas fa-minus"></i>
                </span>
                <span>{product.count}</span>
                <span
                  onClick={() => {
                    addCountToProduct(product.count, product.product.id);
                  }}
                  className="rounded-sm border-main border-2 ms-3 px-1 cursor-pointer"
                >
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              clearCart();
            }}
            className="mt-4 ms-auto block "
          >
            Clear Cart
          </button>
          <Link to={cart.numOfCartItems > 0 && "../checkout"}>
            <button className=" absolute top-4 right-3 text-sm bg-sky-700">
              Check out
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      </div>
    </>
  );
}
