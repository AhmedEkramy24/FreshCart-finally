import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ResetPass() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [apiError, setApiError] = useState("");
  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid Email"),
    newPassword: Yup.string().required("Password is required"),
  });

  const [hidePass, setHidePass] = useState(true);

  function handleHidePass() {
    if (hidePass) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: ResetPassApi,
  });

  async function ResetPassApi(values) {
    try {
      setIsLogin(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      toast.success("success");
      setUserToken(data.token);
      localStorage.setItem("user-token", data.token);
      navigate("/");
      setIsLogin(false);
      setApiError("");
    } catch (error) {
      console.warn(error);
      setApiError(error.response.data.message);
      setIsLogin(false);
    }
  }
  return (
    <>
      <div className="container mt-14 p-2">
        <h1 className="text-3xl">
          <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
          Reset Password :
        </h1>
        <form className="max-w-sm mx-auto my-16" onSubmit={formik.handleSubmit}>
          <h1 className="text-2xl mb-5">Login :</h1>
          {apiError && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {apiError}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="name@flowbite.com"
            />
            {formik.errors.email && formik.touched.email && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your new password
            </label>
            <input
              type={hidePass ? "password" : "text"}
              id="newPassword"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.newPassword}
              </div>
            )}
            <i
              onClick={() => {
                handleHidePass();
              }}
              className={`fa-solid ${
                hidePass ? "fa-eye-slash" : "fa-eye"
              } absolute right-2 top-[41px] cursor-pointer`}
            ></i>
          </div>

          {isLogin ? (
            <button type="button" className="">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
