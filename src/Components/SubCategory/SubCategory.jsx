import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function SubCategory() {
  const { id } = useParams();
  let { addProduct } = useContext(CartContext);
  let { addProductToWishlist, deleteProductFromWishlist } =
    useContext(WishlistContext);
  let [select, setSelect] = useState(false);

  let { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["subCategory", id],
    queryFn: () => {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
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
  return (
    <>
      {
        <div className="flex flex-wrap">
          {data.data.data.map((product, index) => (
           <RecentProducts product={product} key={index} />
          ))}
        </div>
      }
    </>
  );
}
