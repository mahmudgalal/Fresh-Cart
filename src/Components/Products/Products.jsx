import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products({ product }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  });

  useEffect(() => {
    getProducts();
  });

  return <>
    <h1 className='text-main text-5xl font-semibold text-center py-5'>All Products</h1>
    <div className="flex flex-wrap">
      {products.length ? (
        products.map((product, index) => (
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
