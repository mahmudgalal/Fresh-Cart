import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function CategorySlider() {
  let {data} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  })

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };



  function getCategories() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }


  return (
    <div className="Slider-container">
      <Slider {...settings}>
        {data?.data.data.map((category, index) => (
          <div key={index} className="mt-2 mb-8">
            
            <img
              src={category.image}
              className="w-full h-[250px]"
              alt=""
            />
            <h3 className="text-center font-semibold text-lg bg-gray-200">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
