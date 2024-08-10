import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import AOS from "aos";
import "aos/dist/aos.css";

export default function Products() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

    
  return <>
    
    <h1 className="text-3xl">Products</h1>
  
  </>
}
