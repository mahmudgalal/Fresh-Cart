import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
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
      console.log(error);
    }
  }
  async function clearCart() {
    setLoading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers,
      }
    );
    setCart(null);
    setLoading(false);
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
  async function checkout(ShippingAddress) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=https://fresh-cart-blond.vercel.app`,
      {
        ShippingAddress,
      },
      {
        headers,
      }
    );
    window.location.href = data.session.url;
    console.log(data);
  }
  async function updateProduct(productId, count) {
    setLoading(true);
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
    setLoading(false);
  }
  async function deleteProduct(productId) {
    setLoading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers,
      }
    );
    setCart(data);
    setLoading(false);
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
        loading,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
