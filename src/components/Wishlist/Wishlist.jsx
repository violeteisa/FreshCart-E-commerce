import React, { useContext, useState, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    getLoggedUserWishlist,
    deleteWishlistItem,
    setWishlist,
    addProductToCart,
  } = useContext(WishlistContext);
  const { addProductToCarts, setCart } = useContext(CartContext);

  async function getWishlistItems() {
    try {
      const response = await getLoggedUserWishlist();
      setWishlistDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProductFromWishlist(productId) {
    setIsDeleting(true);
    try {
      const response = await deleteWishlistItem(productId);
      if (response.data.status === "success") {
        setWishlistDetails((deletedItem) =>
          deletedItem.filter((product) => product._id !== productId)
        );
        setWishlist(response.data);
        toast.success(response.data.message, {
          duration: 1000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function addProduct(productId) {
    setIsLoading(true);
    try {
      let response = await addProductToCarts(productId);
      if (response.data.status === "success") {
        setCart(response.data);
        toast.success(response.data.message, {
          duration: 1000,
          position: "bottom-right",
        });
      } else {
        toast.error(response.data.message, {
          duration: 1000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      {isLoading || isDeleting ? (
        <LoadingScreen />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg mt-10">
          <h2 className="text-center text-4xl font-semibold text-teal-500 pt-10 pb-5 ">
            Your WishList
          </h2>
          {wishlistDetails?.length === 0 ? (
            <h4 className="text-center text-4xl text-slate-500 pb-5">
              Your wishList is empty
            </h4>
          ) : (
            <div className="w-4/5 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {wishlistDetails.map((product, index) => (
                <div
                  key={product.id || index}
                  className="bg-white border-b flex flex-col md-:w-full md:flex-row justify-between items-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mb-4"
                >
                  <div className="p-4 md:mb-0">
                    <img
                      src={product.imageCover}
                      className="md:w-40  max-w-full max-h-full"
                      alt={product.title}
                    />
                  </div>
                  <div className="md:flex md:flex-row text-center justify-between flex-grow p-4 ">
                    <div className=" my-auto">
                      <div className="text-center md:text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </div>
                      <div className="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </div>
                      <span
                        onClick={() => deleteProductFromWishlist(product._id)}
                        className="font-medium cursor-pointer px-6 py-2 text-red-600 dark:text-red-500 hover:underline"
                      >
                        <i className="fas fa-trash text-red-600 "></i> Remove
                      </span>
                    </div>
                    <div className="my-auto text-center  justify-center">
                      <button
                        onClick={() => addProduct(product.id)}
                        className="btn bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
