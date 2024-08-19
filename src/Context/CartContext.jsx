import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null);
  async function getCart() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );
      setCart(data);
    } catch (error) {
    }
  }
  async function clearCart() {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers,
      }
    );
    setCart(null);
  }
  async function addProduct(productId) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId,
      },
      {
        headers,
      }
    );
    toast.success("Added Successfully");
  }
  async function updateProduct(productId, count) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers,
      }
    );
    setCart(data);
  }
  async function deleteProduct(productId) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers,
      }
    );
    setCart(data);
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        getCart,
        cart,
        updateProduct,
        deleteProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
