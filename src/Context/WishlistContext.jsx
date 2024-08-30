import axios from "axios";
import { createContext, useState ,useEffect} from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [Wishlist, setWishlist] = useState(null);

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

    function deleteWishlistItem(productId) {
      return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers,
        })
        .then((response) => response)
        .catch((error) => error);
    }





  async function getWishlist() {

   let response = await getLoggedUserWishlist();
   setWishlist(response.data)
  }

  useEffect(() => {
    getWishlist();
  
  }, [])
  
  return (
    <WishlistContext.Provider
      value={{
        getLoggedUserWishlist,
        addProductToWishlist,
    
        deleteWishlistItem,
        
        setWishlist,
        Wishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
