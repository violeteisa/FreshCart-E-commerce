import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  useEffect(() => {}, []);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cart } = useContext(CartContext);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-gray-100 text-center lg:fixed border-gray-200  fixed z-50 top-0 left-0 right-0 py-2">
      <div className="max-w-screen-xl container flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Fresh cart Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col  md:p-0 mt-2 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
            {userLogin !== null ? (
              <>
                <li className="py-2">
                  <NavLink
                    to={""}
                    className="block  text-lg text-slate-900   rounded md:bg-transparent  md:p-0 "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    to={"Cart"}
                    className="block  text-lg text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0  "
                  >
                    {" "}
                    Cart
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    to={"products"}
                    className="block  text-lg text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0  "
                  >
                    {" "}
                    Products
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    to={"categories"}
                    className="block  text-lg text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0  "
                  >
                    {" "}
                    Categories
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    to={"brands"}
                    className="block  text-lg text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0  "
                  >
                    {" "}
                    Brands
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    to={"wishlist"}
                    className="block  text-lg  text-gray-900 rounded  md:hover:bg-transparent md:border-0  md:p-0  "
                  >
                    {" "}
                    WishList
                  </NavLink>
                </li>
              </>
            ) : null}

            {userLogin === null ? (
              <>
                <li className="py-2">
                  <NavLink
                    className="mx-2 py-4 text-lg text-slate-600 hover:text-slate-900  "
                    to={"login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="mx-2 py-4 text-lg text-slate-600 hover:text-slate-900  "
                    to={"register"}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="py-2">
                  <NavLink
                    to={"cart"}
                    className="mx-2 py-4 text-lg relative text-slate-900 font-light cursor-pointer "
                  >
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    <span className="bg-teal-500 text-white w-5 h-5 text-sm absolute top-0 left[-5px] rounded-full">
                      {cart?.numOfCartItems}
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            <li className="py-2">
              <i className="fab fa-instagram mx-2"></i>
              <i className="fab fa-facebook mx-2"></i>
              <i className="fab fa-tiktok mx-2"></i>
              <i className="fab fa-twitter mx-2"></i>
              <i className="fab fa-linkedin mx-2"></i>
              <i className="fab fa-youtube mx-2"></i>
            </li>
            <li onClick={logOut} className="py-2">
              <span
                className="mx-2 py-4 text-lg text-slate-600 hover:text-slate-900  cursor-pointer"
                to={"logout"}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
