import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../../Context/CounterContext";
import { authContext } from "../../Context/AuthContext";

export default function Navbar() {
  const { token ,setToken } = useContext(authContext);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  function logout(){
    localStorage.removeItem('userToken');
    navigate('/login');
    setToken(null)
  }

  const isOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="bg-gray-200  md:fixed md:z-50 top-0 inset-x-0 py-2 text-center capitalize flex pe-8 transition-all duration-500 ease-in">
        <div className="container flex flex-col px-2 md:flex-row justify-between items-center text-gray-500">
          <div className="flex flex-col md:flex-row space-x-3 w-full">
            <img src={logo} width={120} alt="" />
            <ul
              className={`md:flex gap-2 items-center flex-col md:flex-row w-full ${
                open ? "flex" : "hidden"
              }`}
            >
              {token && (
                <>
                  <li>
                    <NavLink to="">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="cart">cart</NavLink>
                  </li>
                  <li>
                    <NavLink to="products">products</NavLink>
                  </li>
                  <li>
                    <NavLink to="categories">categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="brands">brands</NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="">
              <ul
                className={`md:flex gap-2 items-center flex-col md:flex-row w-full ${
                  open ? "flex" : "hidden"
                }`}
              >
                <li className="space-x-2 text-black flex">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-linkedin-in"></i>
                  <i className="fab fa-youtube"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-instagram"></i>
                </li>
                {token ? (
                  <li>
                    <span onClick={logout} className="cursor-pointer">logout</span>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="register">Register</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="md:hidden" onClick={() => isOpen()}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
    </>
  );
}
