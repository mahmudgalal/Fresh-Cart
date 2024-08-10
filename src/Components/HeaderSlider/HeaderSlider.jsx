import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'


export default function HeaderSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <img src={slider1} className="h-[300px] md:h-[400px]" alt="" />
      <img src={slider2} className="h-[300px] md:h-[400px]" alt="" />
      <img src={slider3} className="h-[300px] md:h-[400px]" alt="" />
    </Slider>
  );
}