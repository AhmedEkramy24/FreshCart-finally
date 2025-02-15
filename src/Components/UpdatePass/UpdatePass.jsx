import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function UpdatePass() {
  let navigate = useNavigate();
  const headers = {
    token: localStorage.getItem("user-token"),
  };

  let {setUserToken} = useContext(UserContext)

  const [hidePass, setHidePass] = useState(true);
  const [hideRePass, setHideRePass] = useState(true);
  const [hideCurrentPass, setHideCurrentPass] = useState(true);

  const [apiError, setApiError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  let validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("current password is required")
      .min(7, "Invalid password"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "password should be at least 8 characters"
      ),
    rePassword: Yup.string()
      .required("RePassword is requied")
      .oneOf([Yup.ref("password")], "RePassword Should be equal password"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: changePass,
  });

  async function changePass(values) {
    setIsSubmit(true);

    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        { headers }
      );
      toast.success(data.message);
      setApiError("");
      setIsSubmit(false);
      localStorage.setItem("user-token" , "");
      setUserToken("");
      navigate("/login");
      
    } catch (error) {
      console.warn(error);
      setApiError(error.response.data.errors.msg);
      setIsSubmit(false);
    }
  }

  function handleCurrentPass() {
    if (hideCurrentPass) {
      setHideCurrentPass(false);
    } else {
      setHideCurrentPass(true);
    }
  }

  function handleHidePass() {
    if (hidePass) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
  }
  function handleHideRePass() {
    if (hideRePass) {
      setHideRePass(false);
    } else {
      setHideRePass(true);
    }
  }

  return (
    <>
      <div className="container mt-14 p-4">
        <h1 className="text-3xl">
          <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
          Update Password :
        </h1>

        <form
          className=" sm:w-1/2 mx-auto p-3 my-16"
          onSubmit={formik.handleSubmit}
        >
          {apiError && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 mb-3"
              role="alert"
            >
              {apiError}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={!hideCurrentPass ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="currentPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Current Password
            </label>
            {formik.errors.currentPassword &&
              formik.touched.currentPassword && (
                <div
                  className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                  role="alert"
                >
                  {formik.errors.currentPassword}
                </div>
              )}
            <i
              onClick={() => {
                handleCurrentPass();
              }}
              className={`fa-solid ${
                hideCurrentPass ? "fa-eye-slash" : "fa-eye"
              } absolute right-0 top-[18px] cursor-pointer`}
            ></i>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
               type={!hidePass ? "text" : "password"}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=""
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
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
              } absolute right-0 top-[18px] cursor-pointer`}
            ></i>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
               type={!hideRePass ? "text" : "password"}
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              RePassword
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            )}
            <i
              onClick={() => {
                handleHideRePass();
              }}
              className={`fa-solid ${
                hidePass ? "fa-eye-slash" : "fa-eye"
              } absolute right-0 top-[18px] cursor-pointer`}
            ></i>
          </div>

          {isSubmit ? (
            <button
              type="button"
              className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center "
            >
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
