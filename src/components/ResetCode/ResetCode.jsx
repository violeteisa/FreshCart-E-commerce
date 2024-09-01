import React from "react";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Forget() {
  let { setuserLogin } = useContext(UserContext);

  let validationSchema = yup.object().shape({
    resetCode: yup
      .string()
      .matches(/^[0-9]{4,6}$/, "Invalid code format")
      .required("Code is required"),
  });

  let navigate = useNavigate(); //!NAVIGATION HOOK
  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false); //false till click submit
  async function handleResetCode(formValues) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      );

      if (data.status === "Success") {
        toast.success(data.message, {
          duration: 1000,
          position: "bottom-right",
        });
        setIsLoading(false);
        navigate("/newPassword");
      }
    } catch (error) {
      setapiError(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    // validate: handleValidation,
    validationSchema,
    onSubmit: handleResetCode,
  });

  return (
    <>
       <Helmet>
        <title>Reset code</title> 
      </Helmet>
      <div className="py-10 max-w-xl mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <h2 className="text-green-600 text-3xl font-bold my-6">Verify Code</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reset Code
            </label>
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="flex items-center text-center ">
            <button
              type="submit"
              className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
