import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Prouducts from "./Components/Products/Prouducts";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Caregories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";
import AllOrders from "./Components/allOrders/AllOrders";
import OrderDetails from "./Components/allOrders/OrderDetails";
import VisaCheckOut from "./Components/CheckOut/VisaCheckOut";
import CashCheckOut from "./Components/CheckOut/CashCheckOut";
import ArrowToTop from "./Components/ArrowToTop/ArrowToTop";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPass from "./Components/ResetPass/ResetPass";
import Settings from "./Components/Settings/Settings";
import UpdatePass from "./Components/UpdatePass/UpdatePass";
import UpdateData from "./Components/UpdateData/UpdateData";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Redux from "./Components/ReduxTest/Redux";

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Prouducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "orderdetails/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "visacheckout",
        element: (
          <ProtectedRoute>
            <VisaCheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "cashcheckout",
        element: (
          <ProtectedRoute>
            <CashCheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "updatepass",
        element: (
          <ProtectedRoute>
            <UpdatePass />
          </ProtectedRoute>
        ),
      },
      {
        path: "updatedata",
        element: (
          <ProtectedRoute>
            <UpdateData />
          </ProtectedRoute>
        ),
      },
      {
        path: "redux",
        element: (
          <ProtectedRoute>
            <Redux />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetpass",
        element: <ForgetPass />,
      },
      {
        path: "resetcode",
        element: <ResetCode />,
      },
      {
        path: "resetpass",
        element: <ResetPass />,
      },

      { index: true, path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={query}>
          <WishListContextProvider>
            <CartContextProvider>
              <UserContextProvider>
                <RouterProvider router={router}></RouterProvider>
                {/* <ReactQueryDevtools /> */}
                <ArrowToTop />
                <Toaster />
              </UserContextProvider>
            </CartContextProvider>
          </WishListContextProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
