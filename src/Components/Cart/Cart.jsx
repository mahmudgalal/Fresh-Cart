import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";

export default function Cart() {
  let { cart, getCart, updateProduct, deleteProduct, clearCart } =
    useContext(CartContext);

  useEffect(() => {
    getCart();
  }, [cart]);

  return (
    <>
      <h1 className="text-5xl font-semibold py-3 text-center text-main">
        Cart
      </h1>
      <div className="w-full flex justify-end py-6">
        <button
          className="bg-red-700 text-white px-3 py-2  rounded me-4 "
          onClick={() => {
            clearCart();
          }}
        >
          Clear Cart
        </button>
      </div>{" "}
      {!cart ? (
        <div className="flex justify-center items-center w-full h-[400px]">
          <h1 className="text-main text-6xl">There is no Products</h1>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-16 py-3 text-center">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.data.products.map((product, index) => (
                <tr className="bg-white" key={index}>
                  <td className="p-4 flex justify-center">
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-[80px]"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none  focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          product.count > 0
                            ? updateProduct(
                                product.product.id,
                                product.count - 1
                              )
                            : deleteProduct(product.product.id)
                        }
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 text-center">
                          {product.count}
                        </span>
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          updateProduct(product.product.id, product.count + 1)
                        }
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-center">
                    {product.count * product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="font-medium text-red-600 hover:underline cursor-pointer flex justify-center"
                      onClick={() => deleteProduct(product.product.id)}
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900">
                <td className="ps-16 py-3 text-xl" colSpan={4}>
                  Total
                </td>
                <td className="px-6 py-3 text-xl">
                  {cart.data.totalCartPrice} EGP
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
