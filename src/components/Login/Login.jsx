import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Background from "../../assets/images/shopping-cart-filled-with-coins-copy-space-background.jpg";
import Style from "./Login.module.css";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setuserLogin } = useContext(UserContext);

  let validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Z][a-z][0-9]{5,10}$/,
        "password must start with capital letter"
      )
      .required("password is required"),
  });

  let navigate = useNavigate(); //!NAVIGATION HOOK
  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((response) => {
        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setuserLogin(response.data.token);
          setIsLoading(false);
          navigate('/');
        }
      })
      .catch((error) => {
        setapiError(error?.response?.data?.message);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    const overlay = document.createElement('div');
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

    <>   <Helmet>
    <title>Login</title> 
  </Helmet>
    <div className="py-10 max-w-xl mx-auto relative z-10">
      {apiError ? (
        <div
          className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      ) : null}
      <h2 className="text-slate-800 text-3xl font-bold my-6">Login Now</h2>
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
            className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute  text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <p className="pl-4 py-5 text-center text-slate-700 "> 
          <span className="font-semibold hover:underline hover:text-blue-600">
            <Link to={"/forget"}>Forgot Password?</Link>
          </span>
        </p>
        <div className="flex items-center text-center ">
          <button
            type="submit"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
          </button>
          <p className="pl-4 "> Didn't have an account yet? 
            <span className="font-semibold text-slate-700 hover:underline pl-3 hover:text-blue-600">
              <Link to={"/register"}>Register Now</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
    </>
  );
}
