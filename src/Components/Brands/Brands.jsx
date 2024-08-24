import React, { useEffect, useState , useRef } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import Popup from "reactjs-popup";

export default function Brands() {
  const ref = useRef()
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-[400px] items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-main text-5xl font-semibold text-center py-5">
        All Brands
      </h1>
      <div className="flex flex-wrap">
        {data.data.data.map((brand, index) => (
          <Popup
          ref={ref}
            trigger={
              <button>
                <div className="mx-3" key={index}>
                  <div className="product shadow-xl py-3">
                    <img src={brand.image} alt="" />
                    <h2 className="text-center font-bold">{brand.name}</h2>
                  </div>
                </div>
              </button>
            }
            className="md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-2"
            key={index}
          >
            <div className="fixed inset-0 brand-opacity flex justify-center items-center">
              <div className="w-[500px] py-10 flex gap-8 bg-white">
                <div>
                  <img src={brand.image} alt="" />
                </div>
                <div className="w-3/4 flex flex-col justify-center items-start gap-6">
                  <h2 className="text-main font-bold text-xl">{brand.name}</h2>
                  <button className="bg-gray-700 text-white p-2 rounded" onClick={() => ref.current.close()}>Close</button>
                </div>
              </div>
            </div>
          </Popup>
        ))}
      </div>
    </>
  );
}
