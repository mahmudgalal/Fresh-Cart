import React, { useEffect, useRef, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Popup from "reactjs-popup";
import SubCategory from "../SubCategory/SubCategory";

export default function Categories() {
  const ref = useRef();

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-[600px] items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-main text-5xl font-semibold text-center py-5">
        All Categories
      </h1>

      <div className="flex flex-wrap">
        {data.data.data.map((category, index) => (
          <Popup
            key={index}
            ref={ref}
            trigger={
              <button className="md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-3">
                <div>
                  <div className="shadow-xl product w-full">
                    <img
                      src={category.image}
                      className="w-full h-[400px]"
                      alt=""
                    />
                    <p className="text-center text-main text-lg font-bold py-3 bg-gray-100">
                      {category.name}
                    </p>
                  </div>
                </div>
              </button>
            }
            className="md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-2"
          >
            <div className="fixed inset-0 brand-opacity flex justify-center items-center">
              <div className="py-10 flex gap-8 flex-col justify-center items-center bg-white">
                <div><SubCategory _id={category._id} /></div>
              <button className="bg-gray-700 text-white p-2 rounded" onClick={() => ref.current.close()}>Close</button>
              </div>
            </div>
          </Popup>
        ))}
      </div>
    </>
  );
}
