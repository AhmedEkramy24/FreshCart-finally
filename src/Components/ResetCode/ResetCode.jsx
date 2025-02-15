import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetCode() {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [apiError, setApiError] = useState("");
  let validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("code is required")
      .min(3, "code must be at least 4 characters"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: RecetCodeApi,
  });

  async function RecetCodeApi(values) {

    try {
      setIsLogin(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      toast.success(data.status);
      setIsLogin(false);
      navigate("/resetpass")
      setApiError("");
    } catch (error) {
      setApiError(error.response.data.message);
      console.warn(error);
      setIsLogin(false);
    }
  }
  return (
    <>
      <div className="container mt-14 p-4">
        <h1 className="text-3xl">
          <i className="fa-solid fa-circle-arrow-right text-main me-3"></i>
          Reset code :
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
              htmlFor="resetCode"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Reset Code :
            </label>
            <input
              type="text"
              id="resetCode"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formik.values.resetCode}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div
                className="p-4 my-1 text-sm text-red-800 rounded-lg bg-red-50 d"
                role="alert"
              >
                {formik.errors.resetCode}
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
