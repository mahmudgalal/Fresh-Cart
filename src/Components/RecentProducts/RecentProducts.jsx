import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts({ product }) {
  let { addProduct } = useContext(CartContext);
  let { addProductToWishlist , deleteProductFromWishlist , fill } = useContext(WishlistContext);
  let [select, setSelect] = useState(false);
 function add(){
  addProductToWishlist(product.id);
  setSelect(!select);
 }
 function removed(){
   setSelect(!select);
  deleteProductFromWishlist(product.id);
 }
  return (
    <>
      <div className=" md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-2">
        <div className="overflow-hidden product shadow-lg px-3 relative">
          <div className="bg-transparent px-3  py-2 rounded absolute w-[50px] right-0 top-0 cursor-pointer">
            <i
              className={`${
                fill?.includes(product.id) ? "fa-solid" : "fa-regular"
              } fa-heart fa-2xl text-red-700`}
              onClick={() => select? removed() : add()}
            ></i>
          </div>
          <Link to={`/productdetails/${product.category.name}/${product.id}`}>
            <div>
              <img src={product.imageCover} className="w-full h-[300px]" />
              <p className="text-main text-sm">{product.category.name}</p>
              <h2>{product.title.split(" ").slice(0, 3).join(" ")}</h2>
              <div className="flex justify-between mt-2">
                <h3 className="text-fa-bold">{product.price}EGP</h3>
                <h3>
                  <i className="fas fa-star rating-color"></i>
                  {product.ratingsAverage}
                </h3>
              </div>
            </div>
          </Link>
          <button
            className="btn w-full bg-main text-white rounded my-2 py-2"
            onClick={() => addProduct(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
