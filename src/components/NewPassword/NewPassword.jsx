import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function NewPassword() {
  const { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate(); // Navigation hook
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // false till click submit

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    newPassword: yup
      .string()
      .matches(
        /^[A-Z][a-z][0-9]{5,10}$/,
        "NewPassword must start with a capital letter and be between 6 and 11 characters"
      )
      .required("NewPassword is required"),
  });

  const handleNewPassword = async (formValues) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        formValues
      );
      if (data.token) {
        navigate('/login');
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    validationSchema,
    onSubmit: handleNewPassword,
  });

  return (

    <>
    
    <Helmet>
        <title>New Password</title> 
      </Helmet>
    <div className="py-6 max-w-xl mx-auto">
      {apiError && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      )}
      <h2 className="text-green-600 text-3xl font-bold my-6">Reset New Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            type="password" // Changed to password
            name="newPassword"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          )}
        </div>
        <div className="flex items-center text-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
