import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
        All Categories
      </h1>
      {
        <div className="flex flex-wrap">
          {data.data.data.map((category, index) => (
            <Link
              to={`${category._id}`}
              key={index}
              className=" md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-3"
            >
              <div className="shadow-xl product">
                <img src={category.image} className="w-full h-[400px]" alt="" />
                <p className="text-center text-main text-lg font-bold py-3 bg-gray-100">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      }
    </>
  );
}
