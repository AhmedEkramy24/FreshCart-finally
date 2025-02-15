import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPass() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: ForgetPassApi,
  });

  async function ForgetPassApi(values) {
    try {
      setIsLogin(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.statusMsg);
      setApiError("");
      setIsLogin(false);
      navigate("/resetcode");
    } catch (error) {
      console.warn(error);
      setApiError(error.response.data.message);
      setIsLogin(false);
    }
  }
  return (
    <>
      <div className="container mt-14 p-4">
        <h1 className="text-3xl">
          <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
          Forget PassWord :
        </h1>
        <form className="max-w-sm mx-auto my-16" onSubmit={formik.handleSubmit}>
          {apiError && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {apiError}
            </div>
          )}
          <div className="mb-5 relative">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
            {isLogin ? (
              <button type="button" className="mt-3">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button type="submit" className="mt-3">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
