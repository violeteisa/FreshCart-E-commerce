import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import slider1 from '../../assets/images/main-slider-2.jpeg'
import slider2 from '../../assets/images/blog-img-2.jpeg'
import mainSlider1 from '../../assets/images/main-slider-3.jpeg'
import mainSlider2 from '../../assets/images/slide-2.jpeg'
import mainSlider3 from '../../assets/images/slide-1.jpeg'




export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false    

        
      };
    const [counter,useCounter]=useState(0)
    useEffect(()=>{}
    ,[])
    return (
    <>
    <div className="row">
        <div className="w-3/4 py-4"> 
        <Slider {...settings}>
            <img src={mainSlider1} className="w-full h-[400px]"/>
            <img src={mainSlider2} className="w-full h-[400px] "/>
            <img src={mainSlider3} className="w-full h-[400px] "/>
        </Slider>
        
        </div>
        <div className="w-1/4">
        <img src={slider1} className="w-full h-[200px]"/>
        <img src={slider2}  className="w-full h-[200px] "/>

        </div>
    </div>
    </>
        
    )
}


