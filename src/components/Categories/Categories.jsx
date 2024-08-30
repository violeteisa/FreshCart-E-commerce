import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Categories() {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ['getCategories'],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(res => res.data),
  });

  if (isLoading) {
    return (
      <div className="w-full py-8 flex justify-center items-center min-h-screen">
        <LoadingScreen />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full py-8 flex justify-center">
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="row m-6">
          {data?.data?.map((element) => (
            <div
              key={element?._id}
              className="lg:w-1/3 md:w-1/2 sm:m-auto gap-4 p-3 flex"
            >
              <div className="rounded-lg border w-[350px] h-[350px] brand">
                <img
                  className="w-full h-3/4 object-cover"
                  src={element?.image}
                  alt={element?.name}
                />
                <div className="p-5">
                  <p className="text-center text-3xl font-semibold mb-2 text-teal-600">
                    {element?.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
