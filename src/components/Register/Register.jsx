import React, { useContext } from "react";
import Style from "./Register.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Background from "../../assets/images/shopping-cart-filled-with-coins-copy-space-background.jpg";
import { Helmet } from "react-helmet";


export default function Register() {
let {setuserLogin} = useContext(UserContext)
  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "name min length is 3 ")
      .max(10, "name max length is 10")
      .required("name is required"),
    email: yup.string().email("invalid email").required("email is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be a valid egyption number")
      .required("phone is required"),
    password: yup
      .string()
      .matches(
        /^[A-Z][a-z][0-9]{5,10}$/,
        "password must start with capital letter"
      )
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password and repassword must be the same")
      .required("repassword is required"),
  });




  let navigate = useNavigate(); //!NAVIGATION HOOK
  const [apiError, setapiError] = useState("");
  const[isLoading,setIsLoading]=useState(false)  //false till click submit 
  function handleRegister(formValues) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
    .then((response) => {
      if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setuserLogin(response.data.token);
          navigate('/');
      }
  })
  .catch((error) => {
      setapiError(error?.response?.data?.message);
  })
  .finally(() => {
      setIsLoading(false);
  });
  

  }

 
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: handleValidation,
    validationSchema,
    onSubmit: handleRegister,
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
    <>
       <Helmet>
        <title>Register</title> 
      </Helmet>
      <div className="py-12 max-w-xl mx-auto">
      
      {apiError? <div
                className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
                role="alert"
              >
                {apiError}
              </div>:null}
        <h2 className="text-slate-800 text-3xl font-bold my-6">Register Now</h2>
      
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-stale-500 focus:outline-none focus:ring-0 focus:border-stale-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stale-600 peer-focus:dark:text-stale-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-stale-500 focus:outline-none focus:ring-0 focus:border-stale-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stale-600 peer-focus:dark:text-stale-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-stale-500 focus:outline-none focus:ring-0 focus:border-stale-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stale-600 peer-focus:dark:text-stale-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-stale-500 focus:outline-none focus:ring-0 focus:border-stale-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stale-600 peer-focus:dark:text-stale-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              password
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-stale-500 focus:outline-none focus:ring-0 focus:border-stale-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-stale-600 peer-focus:dark:text-stale-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              rePassword
            </label>
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
           {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Submit'} 
            
          </button>
        </form>
      </div>
    </>
  );
}
