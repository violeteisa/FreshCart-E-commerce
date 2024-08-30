import axios from "axios";
import { createContext, useState ,useEffect} from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null);

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToCarts(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCartItem() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function checkOut(cartId, url, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValues },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCart() {

   let response = await getLoggedUserCart();
   setCart(response.data)
  }

  useEffect(() => {
    getCart();
  
  }, [])
  
  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCarts,
        updateCartItemCount,
        deleteCartItem,
        clearCartItem,
        checkOut,
        setCart,
        cart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
