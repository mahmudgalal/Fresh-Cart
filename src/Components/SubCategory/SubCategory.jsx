import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";

export default function SubCategory() {
  const { id } = useParams();
  let {addProduct} = useContext(CartContext);
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
      <div className="flex justify-center w-full">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {
        <div className="flex flex-wrap">
          {data.data.data.map((product, index) => (
            <div
              className=" md:mx-0 w-1/2 md:w-1/3 lg:w-1/5 my-3 px-2"
              key={index}
            >
              <div className="overflow-hidden product shadow-lg px-3">
                <Link
                  to={`/productdetails/${product.category.name}/${product.id}`}
                >
                  <div>
                    <img
                      src={product.imageCover}
                      className="w-full h-[300px]"
                    />
                    <p className="text-main text-sm">{product.category.name}</p>
                    <h2>{product.title.split(" ").slice(0, 3).join(" ")}</h2>
                    <div className="flex justify-between mt-2">
                      <h3 className="text-fa-bold">{product.price}EGP</h3>
                      <h3>
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </h3>
                    </div>
                  </div>
                </Link>
                <button className="btn w-full bg-main text-white rounded my-2 py-2" onClick={() => addProduct(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
