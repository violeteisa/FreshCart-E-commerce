import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { WishlistContext } from "../../Context/WishlistContext";
import { Helmet } from "react-helmet";


export default function ProductDetails() {
  let { addProductToCarts } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  let { addProductToWishlist, deleteWishlistItem, setWishlist, Wishlist } = useContext(WishlistContext);
  let { id, category } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
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


  function getProductDetails(id) {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setLoading(false)
        
      })
      .catch((error) => {
        toast.error("Failed to load product details.");
        setLoading(false)
      });
  }

  function getRelatedProduct(category) {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter((product) => product.category.name === category);
        setRelatedProduct(related);
        setLoading(false)
      })
      .catch((error) => {
        toast.error("Failed to load related products.");
        setLoading(false)
      });
  }

  async function addProduct(productId){
    setCurrentProductId(productId)
    setLoading(true)
      let response = await addProductToCarts(productId)
      if(response.data.status=='success'){
        setLoading(false)
        toast.success(response.data.message,
         { duration: 1000,
          position:'bottom-right'
          }
        )
      }else{
        setLoading(false)
        toast.error(response.data.message,
          { duration: 1000,
            position:'bottom-right'
            }
        )
      }
  
  
      console.log(response)
    }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id, category]);
  if (loading) {
    return <LoadingScreen />;
  }

  async function toggleWishlist(productId) {
    setLoading(true); 
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
    setLoading(false); 
  }
  return (
    <>
    <Helmet>

    <title>Products Details</title> 
    </Helmet>
      <div className="row">
        <div className="md:w-1/4 sm:w-full">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img key={index} className="w-full" src={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="md:w-3/4 sm:w-full">
          <div className="px-3">
            <h1 className="text-3xl mb-4 font-semibold text-gray-950">{productDetails?.title}</h1>
            <p className="text-gray-700 mb-4">{productDetails?.description}</p>
            <div className="flex justify-between items-center">
              <span>{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-600"></i> {productDetails?.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => addProduct(productDetails?.id)} 
                className="btn w-full bg-teal-500 hover:bg-teal-600 m-auto"
                disabled={loading && currentProductId === productDetails?.id}
              >
                {loading && currentProductId === productDetails?.id ? "Adding..." : "Add to Cart"}
              </button>
              <button
                    onClick={() => toggleWishlist(productDetails?.id)}
                  >
                    <i
                      className={`fa-solid fa-heart text-xl ps-2 ${
                        wishlistItems.includes(productDetails?.id) ? 'text-red-600' : ''
                      }`}
                    ></i>
                  </button>            </div>
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-3xl">Related Products</h2>
      <div className="row">
        {relatedProduct.map((product) => (
          <div className="md:w-1/4 sm:w-1/2 px-2" key={product.id}>
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <div className="product rounded-sm px-4 py-4">
                <img src={product.imageCover} alt={product.title} />
                <span className="block text-teal-600">{product.category.name}</span>
                <h3 className="text-base font-semibold text-gray-800 mt-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-600"></i> {product.ratingsAverage}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => addProduct(product.id)} 
                    className="btn w-full bg-teal-500 add-to-cart"
                    disabled={loading && currentProductId === product.id}
                  >
                    {loading && currentProductId === product.id ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product?.id)}
                  >
                    <i
                      className={`fa-solid fa-heart text-xl ps-2 ${
                        wishlistItems.includes(product?.id) ? 'text-red-600' : ''
                      }`}
                    ></i>
                  </button>                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
