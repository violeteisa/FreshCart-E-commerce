import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; 
import { PulseLoader } from "react-spinners";
import Pagination from "../Pagination/Pagination";
import { Helmet } from "react-helmet";

export default function RecentProducts() {
  const [loading, setIsLoading] = useState(false);
  const [Products, setProducts] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  let { addProductToCarts, setCart } = useContext(CartContext);
  let { addProductToWishlist, deleteWishlistItem, setWishlist, Wishlist } = useContext(WishlistContext);

  function getRecent(currentPage) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`);
  }

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  useEffect(() => {
    if (Wishlist && Wishlist.data) {
      const wishlistIds = Wishlist.data.map(item => item._id);
      setWishlistItems(wishlistIds);
      localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
    }
  }, [Wishlist]);

  let { data, isError, error, isFetching, isLoading } = useQuery({
    queryKey: ['recentProducts', currentPage],
    queryFn: () => getRecent(currentPage)
  });

  if (isLoading) {
    return <div className="w-full py-8 flex justify-center"><PulseLoader /></div>;
  }

  if (isError) {
    return <div className="w-full py-8 flex justify-center"><h3>{error.message}</h3></div>;
  }

  async function addProduct(productId) {
    setIsLoading(true); 
    let response = await addProductToCarts(productId);
    setIsLoading(false); 
    if (response.data.status === 'success') {
      setCart(response.data);
      toast.success(response.data.message, { duration: 1000, position: 'bottom-right' });
    } else {
      toast.error(response.data.message, { duration: 1000, position: 'bottom-right' });
    }
  }

  async function toggleWishlist(productId) {
    setIsLoading(true); 
    let newWishlist;
    if (wishlistItems.includes(productId)) {
      let response = await deleteWishlistItem(productId);
      if (response.data.status === 'success') {
        newWishlist = wishlistItems.filter(id => id !== productId);
        toast.success("Removed from wishlist", { duration: 1000, position: 'bottom-right' });
      } else {
        toast.error(response.data.message, { duration: 1000, position: 'bottom-right' });
      }
    } else {
      let response = await addProductToWishlist(productId);
      if (response.data.status === 'success') {
        newWishlist = [...wishlistItems, productId];
        toast.success(response.data.message, { duration: 1000, position: 'bottom-right' });
      } else {
        toast.error(response.data.message, { duration: 1000, position: 'bottom-right' });
      }
    }
    setWishlist(newWishlist);
    setWishlistItems(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsLoading(false); 
  }

  function handlePageChange({ selected }) {
    setCurrentPage(selected + 1);
  }

  const handleSearch = (value) => {
    if (value !== "") {
      setProducts(
        data.data.data.filter((x) =>
          x.title.split(" ").slice(0, 2).join(" ").toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setProducts(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Products</title> 
      </Helmet>
      <div className="mt-24">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-semibold  text-teal-500"
        >
          Search by product Name:
        </label>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          id="large-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-teal-600 focus:border-teal-600 dark:bg-stale-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-600 dark:focus:border-teal-600"
        />
      </div>
      <h1 className="text-center text-5xl font-semibold text-teal-500 mt-16 pb-5">Products</h1>
      {loading && <LoadingScreen />}
      <div className="row">
        {(Products || data.data.data).map((product) => (
          <div className="md:w-1/4 sm:w-1/2 px-2" key={product.id}>
            <div className="product rounded-sm px-4 py-4">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} />
                <span className="block text-teal-600">{product.category.name}</span>
                <h3 className="text-base font-semibold text-gray-800 mt-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span><i className="fas fa-star text-yellow-600"></i> {product.ratingsAverage}</span>
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => addProduct(product.id)}
                  className="btn w-full bg-teal-500 btn add-to-cart"
                >
                  Add to cart
                </button>
                <div className="">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <i
                      className={`fa-solid fa-heart text-xl ps-2 ${
                        wishlistItems.includes(product.id) ? 'text-red-600' : ''
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-20 w-full p-3 bg-teal-500 shadow-xl rounded font-semibold text-white">
          <Pagination
            handlePageChange={handlePageChange}
            pageCount={data?.data?.metadata?.numberOfPages}
          />
        </div>
      </div>
    </>
  );
}
