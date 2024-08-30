import React from "react";
import NotfoundImage from '../../assets/images/error.svg'
import { Helmet } from "react-helmet";



export default function Notfound() {

    return (
    <>
       <Helmet>
        <title>NotFound</title> 
      </Helmet>
<div className="container flex justify-center items-center pt-28">
    <img src={NotfoundImage} alt="" />
</div>
    </>
        
    )
}


