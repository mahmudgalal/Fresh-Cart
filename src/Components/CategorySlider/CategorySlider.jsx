import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";


export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
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



  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="Slider-container">
      <Slider {...settings}>
        {categories.map((category, index) => (
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
