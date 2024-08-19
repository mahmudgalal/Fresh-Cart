import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Loading/Loading';
import AOS from "aos";
import "aos/dist/aos.css";
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {
const {id} = useParams()
let {addProduct} = useContext(CartContext)

useEffect(() => {
  AOS.init({
    duration: 3000,
    once: false,
  });
}, []);

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplaySpeed: 1500,
  autoplay: true,

}

let { data, error, isError, isLoading, isFetching } = useQuery({
  queryKey: ["productDetails", id],
  queryFn: () => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  },
});

if (isLoading) {
  return (
    <div className="flex justify-center w-full h-[600px] items-center">
      <Loading />
    </div>
  );
}



    
  return <div data-aos = 'zoom-in'>
    
    <div className='flex flex-col md:flex-row gap-12 my-10 mx-4 md:mx-0'>
      {
        data? <>
          <div className='w-full md:w-1/4 my-4 py-3'>
        <Slider {...settings}>
        { data.data.data.images?.map((image , index) => (
          <div key={index}>
             <img src={image} alt="" />
           </div>
         ))}
         
       </Slider>
         </div>
         <div className='flex flex-col justify-center items-start gap-3 w-full md:w-3/4'>
        <p className='text-2xl'>{data.data.data.title}</p>
        <p className='text-lg text-gray-400'>{data.data.data.description}</p>
        <p className='text-lg text-main'>{data.data.data.category?.slug}</p>
        <div className='flex justify-between w-full'>
        <h3 className='text-fa-bold'>{data.data.data.price}LE</h3>
        <h3><i className='fas fa-star rating-color'></i> {data.data.data.ratingsAverage}</h3>
        </div>
        <button className='btn w-full bg-main text-white rounded my-2 py-2' onClick={() => addProduct(data.data.data.id)}>Add to Cart</button>
      </div>
      
        </> :
          <div className='flex justify-center items-center w-full h-[500px]'>
          <Loading/>
          </div>
      }
      
    </div>
  
        <div data-aos='zoom-in'>
          <RelatedProducts id={data?.data.data.category._id}/>
        </div> 
      
  
  </div>
}
