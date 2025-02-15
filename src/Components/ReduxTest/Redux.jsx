import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, increaseByAmount } from "../../redux/counterSlice";
import { useContext, useEffect } from "react";
import { getProducts } from "../../redux/productsSlice";
import { Link } from "react-router-dom";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function Redux() {
  let { count } = useSelector((state) => state.counterReducer);
  let { products, isLoading, error } = useSelector(
    (state) => state.productsReducer
  );
  let dispatch = useDispatch();
  let { addToWishList, wishList, getAllWishList } = useContext(WishListContext);

  useEffect(function () {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h2 className="text-3xl text-center mt-14">hello from redux {count}</h2>
      <button
        className="block mx-auto mt-3"
        onClick={() => {
          dispatch(increase());
        }}
      >
        increase
      </button>
      <button
        className="block mx-auto mt-3"
        onClick={() => {
          dispatch(decrease());
        }}
      >
        decrease
      </button>
      <button
        className="block mx-auto mt-3"
        onClick={() => {
          dispatch(increaseByAmount(10));
        }}
      >
        increaseByAmount
      </button>
      {!isLoading ? (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {products.map((product, index) => (
            <div
              key={index}
              className=" cursor-pointer group lg:w-2/12 md:w-3/12 p-2 gap-y-4 border  hover:text-main hover:scale-[1.05] hover:border-main hover:shadow-lg  rounded-lg w-full"
            >
              <span
                className=" flex justify-end"
                onClick={() => {
                  addToWishList(product.id);
                  toast.success("Add successfuly to wish list");
                  getAllWishList();
                }}
              >
                {wishList.some((item) => item.id === product.id) ? (
                  <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                ) : (
                  <i className="fa-regular fa-heart text-slate-300 text-xl"></i>
                )}
              </span>
              <Link to={`/productdetails/${product._id}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-[300px] md:h-[200px] object-cover"
                />
                <h2 className="text-main text-lg mt-1">
                  {product.category.name}
                </h2>
                <h3 className="text-xl">
                  {product.title.split(" ", 2).join(" ")}
                </h3>
                <div className="flex justify-between text-lg ">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fa-solid fa-star text-yellow-400 me-1"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  addToCart(product.id);
                }}
                className="w-full mt-2 md:translate-y-14 md:opacity-0 md:group-hover:translate-y-0 md:duration-[.5s] md:group-hover:opacity-100"
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
    </>
  );
}
