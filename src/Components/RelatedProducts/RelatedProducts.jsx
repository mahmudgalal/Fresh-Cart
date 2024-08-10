import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function RelatedProducts({ id }) {
  const [relatedProducts, setRelatedProducts] = useState();

  async function getRelatedProducts(id) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
    setRelatedProducts(data.data);
  }
  useEffect(() => {
    getRelatedProducts(id);
  });

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    autoplaySpeed: 2500,
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
  return (
    <div className="slider-container">
        <Slider {...settings}>
          {relatedProducts?.map((product, index) => (
            <div key={index} className="mt-2 mb-8 px-3 overflow-hidden ">
              <div className=" shadow-lg p-2 product">
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-center font-semibold text-lg pt-3">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h3>
                <div className="flex justify-between mt-2">
                  <h3 className="text-fa-bold">{product.price}EGP</h3>
                  <h3>
                    <i className="fas fa-star rating-color"></i>{" "}
                    {product.ratingsAverage}
                  </h3>
                </div>
                <button className="btn w-full bg-main text-white rounded my-2 py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
    </div>
  );
}
