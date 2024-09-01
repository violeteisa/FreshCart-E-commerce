import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    getLoggedUserCart,
    updateCartItemCount,
    deleteCartItem,
    clearCartItem,
    setCart,
  } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getLoggedUserCart()
      .then((response) => {
        setCartDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getLoggedUserCart]);

  async function updateCartCount(productId, count) {
    setLoading(true);
    updateCartItemCount(productId, count)
      .then((response) => {
        setCartDetails(response.data.data);
        setCart(response.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error updating cart item count:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function deleteProduct(productId) {
    setLoading(true);
    deleteCartItem(productId)
      .then((response) => {
        setCartDetails(response.data.data);
        setCart(response.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function clearProduct() {
    setLoading(true);
    clearCartItem()
      .then((response) => {
        setCartDetails(response.data.data);
        setCart(response.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Carts</title>
      </Helmet>
      {loading && <LoadingScreen />}

      <div className="relative overflow-x-auto sm:rounded-lg mt-10">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-teal-500 pt-10 pb-5">
          Cart Shop
        </h2>

        {cartDetails?.products.length === 0 ? (
          <h4 className="text-center text-xl md:text-2xl text-slate-500 pb-5">
            There is no Products in your cart
          </h4>
        ) : (
          <>
            <h4 className="text-center text-xl md:text-2xl text-slate-500 pb-5">
              Total Price: {cartDetails?.totalCartPrice} EGP
            </h4>
            <div className="w-full md:w-4/5 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <div>
                {cartDetails?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="bg-white border-b flex flex-col md-:w-full md:flex-row justify-between items-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4"
                  >
                    <div className="mb-4 md:mb-0">
                      <img
                        src={product.product.imageCover}
                        className=" md:w-40  max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </div>
                    <div className="text-center md:text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </div>
                    <div className="flex items-center">
                      {/* - */}
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className=" py-4 font-semibold text-gray-900  dark:text-white">
                      {product.price} EGP
                    </div>
                    <div className="px-6 py-4">
                      <span
                        onClick={() => deleteProduct(product.product.id)}
                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center py-6 md:py-14">
              <Link to={"/checkout"}>
                <button className="bg-teal-500 px-6 py-3 rounded text-white hover:shadow-2xl">
                  CheckOut Now
                </button>
              </Link>
            </div>
            <div className="text-center py-6 md:py-14">
              <button
                onClick={() => clearProduct()}
                className="bg-slate-900 hover:bg-slate-950 py-3 w-full md:w-1/6 font-semibold hover:shadow-2xl rounded text-white"
              >
                Clear your cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
