import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [hidePass, setHidePass] = useState(true);
  const [hideRePass, setHideRePass] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  let {userToken, setUserToken} = useContext(UserContext);

  let navigate = useNavigate();

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

  // custum validate

  function customValidate(data) {
    let errors = {};
    if (!data.name) {
      errors.name = "name is required";
    } else if (!/^[A-Z]\w{3,15}$/.test(data.name)) {
      errors.name = "name is not vaild one ex: John Doe";
    } else if (!data.email) {
      errors.email = " email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      errors.name = "email is not vaild one ex: test@example.com";
    } else if (!data.password) {
      errors.password = " password is required";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password)) {
      errors.password =
        "password should be : \n - At least 8 characters \n - At least one letter (uppercase or lowercase) \n - At least one digit";
    } else if (!data.rePassword === data.password) {
      errors.rePassword = " rePassword must be equal main password";
    } else if (!data.phone) {
      errors.phone = "phone is required";
    } else if (!/^(\+20|0)1[0125]\d{8}$/.test(data.phone)) {
      errors.name = "phon should be egyptian one";
    }

    return errors;
  }

  // yub validation

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(2, "Too Short!")
      .max(20, "Too Long!"),
    email: Yup.string().required("email is requuired").email("Invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "password should be at least 8 characters"
      ),
    rePassword: Yup.string()
      .required("rePasssword is required")
      .oneOf([Yup.ref("password")], "shold be equal password"),
    
  });

  async function register(values) {
    try {
      setIsSubmit(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setIsSubmit(false);
      navigate("../home");
      localStorage.setItem("user-token" , data.token);
      setUserToken(localStorage.getItem("user-token"));
    } catch (error) {
      setApiError(error.response.data.message);
      setIsSubmit(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      
      <form className=" sm:w-1/2 mx-auto p-3 my-16" onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl">Register Now :</h1>
        {apiError && (
          <div
            className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
            role="alert"
          >
            {apiError}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {formik.errors.name && formik.touched.name && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            placeholder=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type={hidePass ? "password" : "text"}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
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
            type={hideRePass ? "password" : "text"}
            name="rePassword"
            id="rePass"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="rePass"
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
              hideRePass ? "fa-eye-slash" : "fa-eye"
            } absolute right-0 top-[18px]  cursor-pointer`}
          ></i>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          )}
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
    </>
  );
}
