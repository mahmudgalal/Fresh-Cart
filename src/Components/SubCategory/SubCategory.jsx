import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function SubCategory({ _id }) {
  function getSubCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${_id}/subcategories`
    );
  }
  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["subCategory", _id],
    queryFn: getSubCategory,
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
      <div className="flex flex-wrap gap-5 justify-center w-w-full">
        {data.data.data.length > 0 ? data.data.data.map((product, index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 border border-black">

              <h2 className="text-center text-main px-8 py-8">{product.name}</h2>
          </div>
        )) : <h2 className="text-center text-main px-8 py-8">There is no Sub Caregories</h2>}
      </div>
    </>
  );
}
