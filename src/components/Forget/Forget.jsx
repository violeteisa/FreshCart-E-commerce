import React from "react";
import Style from "./Forget.module.css";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import Background from "../../assets/images/shopping-cart-filled-with-coins-copy-space-background.jpg";
import { Helmet } from "react-helmet";

export default function Forget() {
  let { setuserLogin } = useContext(UserContext);

  let validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required"),
  });

  let navigate = useNavigate(); //!NAVIGATION HOOK
  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleLogin(formValues) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        formValues
      );

      if (data.statusMsg === "success") {
        toast.success(data.message, {
          duration: 1000,
          position: "bottom-right",
        });
        setIsLoading(false);
        navigate("/resetCode");
      }
    } catch (error) {
      setapiError(error?.response?.data?.message);
      console.log(error);
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    // validate: handleValidation,
    validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";

    const overlay = document.createElement("div");
    overlay.className = Style.overlay;
    document.body.appendChild(overlay);
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundPosition = "";
      document.body.removeChild(overlay);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="py-12 max-w-xl mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <h2 className="text-slate-600 text-3xl font-bold my-6">
          Forgot Password
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="flex items-center text-center ">
            <button
              type="submit"
              className="text-white  bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
