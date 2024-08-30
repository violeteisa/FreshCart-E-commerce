import React from "react";
import Style from "./Pagination.module.css";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";


export default function Pagination({handlePageChange,pageCount}) {
    const [counter,useCounter]=useState(0)
    useEffect(()=>{}
    ,[])
    return (
    <>
     <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName	={Style.pagination}
        activeClassName	={Style.active}
      />
    </>
        
    )
}


