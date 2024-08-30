import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ShippingAddressCash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { cartId } = useParams();

  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    phone: Yup.string().required("Phone is required"),
    details: Yup.string().required("Details is required"),
  });

  const initialValues = {
    city: "",
    phone: "",
    details: "",
  };

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setIsLoading(true);
    setShowSuccessMessage(false);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        {
          headers: {
            userToken: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(response.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate("/allorders");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "There was an error placing your order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full py-20 px-5">
      <Helmet>
        <title> Address</title>
      </Helmet>
      <div className="container m-auto xl:max-w-3xlbg-white w-full p-5 sm:p-10 rounded-md">
        <h1 className=" text-xl sm:text-3xl text-center font-semibold text-teal-800">
          Add your shipping address
        </h1>
        <div className="w-full mt-8">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4"
          >
            <input
              className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              name="city"
              type="text"
              placeholder="Enter Your City"
            />
            {touched.city && errors.city && (
              <p className="text-red-500">{errors.city}</p>
            )}
            <input
              className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
              name="details"
              type="text"
              placeholder="Enter Your Details"
            />
            <input
              className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              name="phone"
              type="tel"
              placeholder="Enter Your Phone"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500">{errors.phone}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="disabled:bg-[#282D2D] mt-5 tracking-wide font-semibold bg-main-theme text-gray-100 w-full py-4 rounded-lg hover:bg-main-theme/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <Link
                to={"/checkout"}
                className="bg-teal-700 hover:bg-teal-800 py-3 w-full md:w-1/6 font-semibold hover:shadow-2xl rounded text-white"
              >
                Checkout
                {isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}
              </Link>
            </button>
          </form>
          {showSuccessMessage && (
            <p className="text-green-500 mt-4 text-center">
              Order placed successfully!
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressCash;
