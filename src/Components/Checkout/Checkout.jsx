import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { checkoutInputs } from "../UI/UI";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {

    let {checkout} = useContext(CartContext)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token , setToken} = useContext(authContext);
  let navigate = useNavigate();
  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/");
      setApiError(null);
    } catch (error) {
      setApiError(error.response.data.message);
      setLoading(false);
    }
  }

  

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: checkout,
  });

  return (
    <div  data-aos="fade-left" className="mx-5 md:mx-0">
      <h2 className="text-center text-3xl my-12">Login Now</h2>
      <form className="max-w-md mx-auto my-16" onSubmit={formik.handleSubmit}>
        {
          checkoutInputs.map((el , index) => (
            <div className="mb-5" key={index}>
          <div className="relative z-0 w-full group" >
            <input
              type={el.type}
              name={el.type}
              id={el.type}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values[el.type]}
            />
            <label
              htmlFor={el.type}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
             {`Enter Your ${el.label}`}
            </label>
          </div>
        </div>
          ))
        }
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          {loading ? (
            <button
              type=""
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fa fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
