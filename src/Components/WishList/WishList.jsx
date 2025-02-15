import React, { useContext, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function WishList() {
  let { getAllWishList, wishList, headers } = useContext(WishListContext);
  const [isLoading, setIsLoading] = useState(false);

  let { addToCart } = useContext(CartContext);

  async function deleteProduct(id) {
    setIsLoading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers }
    );
    getAllWishList();
    setIsLoading(false);
  }

  useEffect(() => {
    getAllWishList();
  }, []);

  return (
    <>
      <div className="p-2">
        {wishList ? (
          <div className="container mt-14 py-4 px-2 bg-slate-200 rounded-md">
            {wishList.map((product, index) => (
              <div
                key={index}
                className="border-b border-slate-300 p-4 flex items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  <div className="size-[100px] md:size-[150px] rounded-lg overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h2>{product.title.split(" ", 2).join(" ")}...</h2>
                    <p>price : {product.price}EGP</p>
                    <span
                      className="text-main hover:underline cursor-pointer"
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can text-red-500"></i>
                      remove
                    </span>
                  </div>
                </div>
                <button
                  className="text-sm text-nowrap"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
        {isLoading && (
          <div className="flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </>
  );
}
