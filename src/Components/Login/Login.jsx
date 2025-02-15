import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "./../../Context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const [hidePass, setHidePass] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  let { userToken, setUserToken } = useContext(UserContext);

  function handleHidePass() {
    if (hidePass) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
  }

  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("write your email").email("wrong email"),
    password: Yup.string().required("write your password"),
  });

  async function login(values) {
    try {
      setIsLogin(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setApiError(null);
      setIsLogin(false);
      toast.success("success");
      navigate("/");
      localStorage.setItem("user-token", data.token);
      setUserToken(localStorage.getItem("user-token"));
    } catch (error) {
      setApiError(error.response.data.message);
      setIsLogin(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="p-2">
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
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type={hidePass ? "password" : "text"}
            id="password"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {formik.errors.password}
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

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {isLogin ? (
              <button type="button" className="">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button type="submit" className="">
                Submit
              </button>
            )}
            <Link to={"/forgetpass"}>
              <p className="text-sky-700 underline">Forget Password ?</p>
            </Link>
          </div>
          <Link to={"/register"}>
            <p className="underline text-main">Don't have an account?</p>
          </Link>
        </div>
      </form>
      </div>
    </>
  );
}
