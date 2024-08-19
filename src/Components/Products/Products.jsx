import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";
import { useQuery } from "@tanstack/react-query";

export default function Products({ product }) {

  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  
    let {data , error , isError , isLoading , isFetching} = useQuery({
      queryKey: ['recentProducts'],
      queryFn: getProducts
    })



  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  });



  return <>
    <h1 className='text-main text-5xl font-semibold text-center py-5'>All Products</h1>
    <div className="flex flex-wrap">
      {data ? (
        data.data.data.map((product, index) => (
          <RecentProducts product={product} key={index} />
        ))
      ) : (
        <div className="flex justify-center w-full h-[600px] items-center">
          <Loading />
        </div>
      )}
    </div>
    </>;
}
