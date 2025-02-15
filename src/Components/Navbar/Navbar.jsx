import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import logo from "./../../assets/images/freshcart-logo.svg";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  const [closeList, setCloseList] = useState(true);
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart, getAllProductsFromCart } = useContext(CartContext);
  let { count } = useContext(WishListContext);
  let navigte = useNavigate();

  function logOut() {
    localStorage.setItem("user-token", "");
    setUserToken(null);
    navigte("login");
  }

  return (
    <>
      <nav className="bg-slate-100 p-2 dark:bg-slate-700 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-2 flex items-center justify-between">
          {/* logo and links big screens */}
          <div className="flex items-center space-x-4">
            {/* logo */}
            <div className="logo text-nowrap">
              <Link to={userToken ? "" : "login"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            {/* links big screens */}
            {userToken && (
              <div className="links lg:block hidden">
                <ul className="flex space-x-2">
                  <li>
                    <NavLink to={""} className=" px-2 py-1 rounded-lg ">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"cart"} className=" px-2 py-1 rounded-lg ">
                      Cart
                    </NavLink>
                  </li>
                  <li className="text-nowrap">
                    <NavLink to={"wishlist"} className=" px-2 py-1 rounded-lg ">
                      Wish List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"categories"}
                      className="px-2 py-1 rounded-lg "
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"brands"}
                      className="px-2 py-1 rounded-lg hover:text-main"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"products"}
                      className="px-2 py-1 rounded-lg hover:text-main"
                    >
                      Prouducts
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {userToken && (
            <div className=" ms-auto me-3 flex flex-nowrap">
              <Link to={"settings"}>
                <span className="text-slate-500 text-xl me-3">
                  <i className={`fa-solid fa-gear ms-1`}></i>
                </span>
              </Link>
              <Link to={"wishlist"}>
                <span className="text-red-500 text-xl me-3 text-nowrap">
                  {count}
                  <i className={`fa-solid fa-heart ms-1`}></i>
                </span>
              </Link>
              <Link to={"/cart"}>
                <span className="text-xl text-main text-nowrap">
                  {cart && cart.numOfCartItems}
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
              </Link>
            </div>
          )}

          {/* social and login */}
          <div className="hidden space-x-5 lg:flex">
            {/* social media */}
            <div className="space-x-[15px] text-lg icons flex items-center me-5">
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook hover:text-main duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram hover:text-main duration-300" />
              </a>
              <a href="https://x.com" target="_blank">
                <i className="fa-brands fa-x-twitter hover:text-main duration-300" />
              </a>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok hover:text-main duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin hover:text-main duration-300" />
              </a>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube hover:text-main duration-300" />
              </a>
            </div>
            {/* login */}
            <div className="flex space-x-3 text-[14px] items-center">
              {!userToken ? (
                <ul className="flex items-center">
                  <li>
                    <NavLink to={"login"} className="rounded-lg px-2 py-1">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"register"} className="rounded-lg px-2 py-1">
                      Register
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <span
                  onClick={() => {
                    logOut();
                  }}
                  className="text-red-500 cursor-pointer text-[16px] text-nowrap"
                >
                  Log out
                </span>
              )}
            </div>
          </div>

          <span
            className="lg:hidden cursor-pointer text-lg"
            onClick={() => {
              setCloseList(false);
            }}
          >
            <i className="fa-solid fa-bars" />
          </span>

          {/* link small screens */}

          <div
            className={`${
              closeList ? "hidden" : "lg:hidden"
            } fixed top-0 right-0 bg-slate-200 pt-10 p-3 lg:hidden z-50 h-screen space-y-10`}
          >
            <span
              onClick={() => {
                setCloseList(true);
              }}
              className=" text-main  absolute top-[15px] right-[15px] text-3xl cursor-pointer"
            >
              <i className="fa-solid fa-xmark "></i>
            </span>
            {userToken && (
              <ul className="  w-[200px] space-y-3 mb-5">
                <li>
                  <NavLink to={""} className=" px-2 py-1 rounded-lg">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"cart"} className=" px-2 py-1 rounded-lg">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"wishlist"} className=" px-2 py-1 rounded-lg ">
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"categories"} className=" px-2 py-1 rounded-lg">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"brands"} className=" px-2 py-1 rounded-lg">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"products"} className=" px-2 py-1 rounded-lg">
                    Prouducts
                  </NavLink>
                </li>
              </ul>
            )}
            <div className="space-x-[15px] text-lg icons flex items-center mt-5">
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook hover:text-main duration-300" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram hover:text-main duration-300" />
              </a>
              <a href="https://x.com" target="_blank">
                <i className="fa-brands fa-x-twitter hover:text-main duration-300" />
              </a>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok hover:text-main duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin hover:text-main duration-300" />
              </a>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube hover:text-main duration-300" />
              </a>
            </div>
            <div className="text-[14px]">
              {!userToken ? (
                <ul className="items-center space-y-3 ">
                  <li>
                    <NavLink to={"login"} className="rounded-lg px-2 py-1">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"register"} className="rounded-lg px-2 py-1">
                      Register
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <span
                  onClick={() => {
                    logOut();
                  }}
                  className="mt-3 text-red-500 block w-fit rounded-lg px-2 py-1 cursor-pointer "
                >
                  Log out
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
