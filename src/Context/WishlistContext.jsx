import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [wishlist, setWishlist] = useState(null);
  const [fill , setFill] = useState([])
  const [loading , setLoading] = useState(false);
  const [token , setToken] = useState(localStorage.getItem("userToken"))

  async function getWishlist() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers,
        }
      );
      setWishlist(data);
      setFill(data.data.map((el) => el.id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getWishlist();
     }
  } , [token])

  async function addProductToWishlist(productId) {
    setFill((fill) => [...fill , productId])
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId,
      },
      {
        headers,
      }
    );
    toast.success("Added Successfully");
  }
  async function deleteProductFromWishlist(productId) {
    setLoading(true)
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers,
      }
    );
    toast.error("removed Successfully");
    setWishlist(data);
    fill.shift(fill.indexOf(productId))
    setLoading(false)
  }
  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlist,
        wishlist,
        deleteProductFromWishlist,
        fill,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
