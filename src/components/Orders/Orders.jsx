import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Orders() {
  const userToken = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(userToken);
  const userId = decodedToken.id;

  function getUserOrders(userId) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + userId);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getUserOrders(userId),
    select: (data) => data.data
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='container text-center'>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      
      <h2 className="text-center text-3xl md:text-4xl font-semibold text-teal-600 pt-20 pb-5">
        All Your Orders
      </h2>
      
      {data?.map((order, index) => (
        <div key={index} className="py-14 px-4 gap-4 bg-slate-200 rounded shadow-lg md:px-6 2xl:px-20 2xl:container 2xl:mx-auto mb-8"> {/* Add margin-bottom here */}
          <div className="flex justify-start item-start space-y-2 flex-col ">
            <h1 className="text-3xl text-slate-700 lg:text-4xl font-semibold  ">
              Order no : {order._id}
            </h1>
            <p className="text-base font-medium leading-6 text-slate-700">Date : {order.createdAt}</p>
            <p className="text-base font-medium leading-6 text-slate-700">Payment Type: {order.paymentMethodType}</p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-2xl md:text-4xl self-center text-center font-semibold leading-6 xl:leading-5 text-slate-800">Your Cart</p>
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className="pb-4 md:pb-8 w-full md:w-full">
                    {order.cartItems?.map((product, i) => (
                      <div key={i} className='flex my-4 py-4 flex-col md:flex-row md:items-center md:my-2 md:py-2 w-full md:justify-around'>
                        <img className="w-full md:w-40 md:block" src={product?.product.imageCover} alt={product?.product.title} />
                        <div className='md:px-10'>
                          <h3 className="text-xl xl:text-2xl pb-5 font-semibold leading-6 text-slate-800">{product?.product.title.split(' ').slice(0, 2).join(' ')}</h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-lg leading-none text-slate-800"><span className="text-slate-500">Category: </span> {product.product.category.name}</p>
                            <p className="text-lg leading-none text-slate-800"><span className="text-slate-500">Brand: </span> {product.product.brand.name}</p>
                            <p className="text-lg leading-none text-slate-800"><span className="text-slate-500">Rating: </span>{product.product.ratingsAverage}</p>
                          </div>
                        </div>
                        <div className="flex items-start justify-around w-1/2 md:ml-4 pt-4 md:pt-0">
                          <p className="xl:text-xl font-semibold  leading-6">${product.price}</p>
                          <p className="xl:text-xl  font-semibold leading-6 text-slate-800">{product.count}</p>
                          <p className="xl:text-xl font-semibold leading-6 text-slate-800">Total: ${product.price*product.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row border bg-slate-50 rounded-lg shadow-lg w-3/4 m-auto space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full dark:bg-background-primary space-y-6">
                  <h3 className="text-2xl font-semibold leading-5 text-slate-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-slate-200 border-b pb-4">
                    <div className="flex justify-around w-full">
                      <p className="text-lg font-semibold  text-slate-800">Items Price</p>
                      <p className="text-lg font-semibold   text-slate-600">${order?.totalOrderPrice}</p>
                    </div>
                    <div className="flex justify-around w-full">
                      <p className="text-lg font-semibold  text-slate-800">Tax Price</p>
                      <p className="text-lg font-semibold  text-slate-600">${order?.taxPrice}</p>
                    </div>
                    <div className="flex justify-around items-center w-full">
                      <p className="text-lg font-semibold  text-slate-800">Shipping Price</p>
                      <p className="text-lg font-semibold  text-slate-600">${order?.shippingPrice}</p>
                    </div>
                  </div>
                  <div className="flex justify-around items-center w-full">
                    <p className="text-lg  font-bold text-slate-800">Total</p>
                    <p className="text-lg  font-bold text-slate-600">${order?.totalOrderPrice + order?.taxPrice + order?.shippingPrice}</p>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
     
        </div>
         
      ))}
         <Link to={"/"} className="text-center py-6 md:py-14">
              <button
                onClick={() => clearProduct()}
                className="bg-teal-700 hover:bg-teal-800 py-3 w-full md:w-1/6 font-semibold hover:shadow-2xl rounded text-white"
              >
              Shop 
              </button>
            </Link>
    </div>
  );
}
