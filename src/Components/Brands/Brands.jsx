import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
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
          <div className="md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-2">
            <div className="product shadow-xl py-3">
              <img src={brand.image} alt="" />
              <h2 className="text-center font-bold">{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
