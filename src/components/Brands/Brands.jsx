import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import 'flowbite/dist/flowbite.css';
import 'flowbite/dist/flowbite.js';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Brands() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    const handleOpenModal = (brand) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBrand(null);
    };

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }

    const { isError, error, isLoading, data } = useQuery({ queryKey: [`getBrands`], queryFn: getBrands });

    if (isLoading) {
        return <div className="w-full py-8 flex justify-center"><LoadingScreen /></div>;
    }
    if (isError) {
        return <div className="w-full py-8 flex justify-center"><h3>{error.message}</h3></div>;
    }

    return (
        <>
          <Helmet>
        <title>Brands</title> 
      </Helmet>
            <div className="container">
                <h1 className="text-center text-teal-500 text-5xl font-semibold p-5 m-8">All Brands</h1>
                <div className="row">
                    {data?.data?.data.map((element) => (
                        <div key={element?._id} className='lg:w-1/4 md:w-1/2  sm:m-auto gap-4 p-3 '>
                            <div className="p-3 border brand">
                                <button onClick={() => handleOpenModal(element)} className="block text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                                    <img className="w-full" src={element?.image} alt={element?.name} />
                                </button>
                                <p className="text-center">{element?.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedBrand && (
                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed bg-opacity-black inset-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <button onClick={handleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4 flex justify-between">
                                <div>
                                    <h3 className="text-5xl leading-relaxed  text-teal-400 dark:text-teal-300">
                                        {selectedBrand?.name}
                                    </h3>
                                    <p className=" text-2xl leading-relaxed   text-gray-500 dark:text-gray-400">
                                        {selectedBrand?.name}
                                    </p>
                                </div>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    <img src={selectedBrand?.image} alt={selectedBrand?.name} />
                                </p>
                            </div>
                            <div className="text-end items-center p-3 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleCloseModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
