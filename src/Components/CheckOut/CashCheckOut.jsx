import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { CartContext } from "./../../Context/CartContext";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function CashCheckOut() {

    let navigate = useNavigate()

  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .required("datails is required")
      .min(3, "min charachters is 3"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(\+20|0)1[0125]\d{8}$/, "should be egyptian number"),
    city: Yup.string()
      .required("city is required")
      .min(3, "min charachters is 3"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: checkOutUrl,
  });
  let { cart, headers } = useContext(CartContext);

  async function checkOutUrl(values) {
    let body = {
      shippingAddress: { values },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          body,
        },
        {
          headers,
        }
      );
      toast.success(data.status);
      navigate("/allorders")
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mt-14 p-4">
        <h1 className="text-3xl">Check out : </h1>

        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block font-medium text-gray-900 text-xl"
            >
              Details
            </label>
            <input
              value={formik.values.details}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="details"
              className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-main"
            />
            {formik.errors.details && formik.touched.details && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.details}
              </div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block font-medium text-gray-900 text-xl"
            >
              Phone
            </label>
            <input
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="phone"
              className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-main"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block font-medium text-gray-900 text-xl"
            >
              City
            </label>
            <input
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="city"
              className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-main"
            />
            {formik.errors.city && formik.touched.city && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.city}
              </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
