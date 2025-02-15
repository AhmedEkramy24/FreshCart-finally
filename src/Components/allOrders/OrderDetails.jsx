import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  function displayDate(x) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date(x);
    let number = date.getUTCDate();
    let day = daysOfWeek[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day} ${number},${month} ${year} `;
  }
  let { id } = jwtDecode(localStorage.getItem("user-token"));
  let { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  async function getUserOrders() {
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      let userOrder = response.data.find((order) => order._id === orderId);

      if (userOrder) {
        setOrder(userOrder);
      } else {
        console.error("Order not found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <div className="p-2">
        {order ? (
          <div className="mt-14 container p-4 bg-slate-200 leading-8">
            <h1 className="text-2xl">Order Details : </h1>
            <div className="details p-4">
              <p>
                <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                Date : {displayDate(order.createdAt)}
              </p>
              <p>
                <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                Total Order Price :{" "}
                <span className="text-main font-semibold">
                  {order.totalOrderPrice} EGP
                </span>
              </p>
              {order.isDelivered ? (
                <p className="text-green-500">
                  <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                  Delivered
                </p>
              ) : (
                <p className="text-red-400 font-bold">
                  <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                  It will be delivered soon...
                </p>
              )}
              {order.isPaid ? (
                <p className="text-main">
                  <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                  It was paid
                </p>
              ) : (
                <p className="text-red-500 font-bold">
                  <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                  It has not been paid
                </p>
              )}
              <p className="capitalize">
                <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                payment Method Type :{" "}
                <span className="text-sky-700 font-bold">
                  {order.paymentMethodType}
                </span>
              </p>
              <p>
                <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                Cart Items Count :{" "}
                <span className="text-main font-bold">
                  {order.cartItems.length}
                </span>
              </p>
              <p>
                <i className="fa-solid fa-circle-arrow-right text-main me-1"></i>
                Cart Items :
              </p>
              {order.cartItems.map((product, index) => (
                <div
                  key={index}
                  className="mt-1 flex gap-4 relative items-center border-b border-slate-300 p-2"
                >
                  <div className="size-[150px] overflow-hidden rounded-lg">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-main">{product.product.title}</p>
                    <p>Category : {product.product.category.name}</p>
                    <span className="top-3 left-3 absolute size-[30px] rounded-full bg-main text-white  text-xl font-bold flex justify-center items-center">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex top-0  right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </>
  );
}
