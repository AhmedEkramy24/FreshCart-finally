import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function AllOrders() {
  let { id } = jwtDecode(localStorage.getItem("user-token"));

  function getUserOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  let { data, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    select: (data) => data.data,
  });

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



  return (
    <>
      <div className="p-2">
      {isLoading ? (
        <div className="flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container mt-14 p-4 bg-slate-200">
          <h1 className="text-2xl">All Orders : </h1>
          {data.map((order, index) => (
            <div
              key={index}
              className="border-b border-slate-400 p-2 hover:bg-slate-300 cursor-pointer"
            >
              <Link to={`/orderdetails/${order._id}`}>
                <h2 className="font-bold text-main text-xl">
                  Order {index + 1}
                </h2>
                <div className="details p-4">
                  <p>Date : {displayDate(order.createdAt)}</p>
                  <p>
                    Total Order Price :{" "}
                    <span className="text-main font-semibold">
                      {order.totalOrderPrice} EGP
                    </span>
                  </p>
                  <p className="text-main">Click To Show Order Details</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
