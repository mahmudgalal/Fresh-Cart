import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import HeaderSlider from "../HeaderSlider/HeaderSlider.jsx";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../Loading/Loading.jsx";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts.jsx";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
  });

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
    });
  }, []);

  if (isLoading) {
    return <div className='flex justify-center w-full h-[600px] items-center'>
    <Loading/>
    </div>
  }

  return (
    <div>
      <div className="flex mb-4" data-aos="fade-left">
        <div className="w-full md:w-3/4 h-[300px] md:h-[400px]">
          <HeaderSlider />
        </div>
        <div className="hidden md:flex flex-col w-1/4">
          <img src={slider1} className="h-[200px] w-full" alt="" />
          <img src={slider2} className="h-[200px] w-full" alt="" />
        </div>
      </div>

      <CategorySlider />

      <div className="flex flex-wrap">
        {data?.data.data.map((product, index) => (
          <RecentProducts product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
