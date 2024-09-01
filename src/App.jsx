
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecentPeoducts from "./components/RecentPeoducts/RecentPeoducts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import Orders from "./components/Orders/Orders";
import Forget from "./components/Forget/Forget";
import ResetCode from "./components/ResetCode/ResetCode";
import NewPassword from "./components/NewPassword/NewPassword";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";

ReactQueryDevtools;
function App() {
  let query = new QueryClient();
  let x = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        
        
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <RecentPeoducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "forget",
          element: <Forget />,
        },
        {
          path: "resetCode",
          element: <ResetCode />,
        },
        { path: "login", element: <Login /> },
        { path: "newPassword", element: <NewPassword /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <ReactQueryDevtools />
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
