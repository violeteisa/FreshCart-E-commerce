import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";


export default function CategoriesSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
        
      };
    const [categories, setCategoriesSlider] = useState([]);
    function getCategories() {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/categories")
        .then(({ data }) => {
            setCategoriesSlider(data.data);
        })
        .catch((error) => {});
    }
    useEffect(() => {
        getCategories();
    }, []);

    return <>
<div className="py-5">
    <h2 className="text-xl font-semibold text-gray-600 py-4">Shop popular Categories</h2>
    
<Slider  {...settings}>
    {categories.map((category)=> <div    key={category._id}>
        <img  className='w-full category-img'  src={category.image} alt={category.name}/>
        <h3>{category.name}</h3>
    </div>)}


</Slider>
</div>
    </>
}