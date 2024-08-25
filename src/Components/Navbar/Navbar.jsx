import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let { cart, getCart } = useContext(CartContext);
  let { wishlist, getWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getCart();
  }, [cart]);
  useEffect(() => {
    getWishlist();
  }, [wishlist]);

  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
    setToken(null);
  }

  const isOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="bg-gray-200  md:fixed md:z-50 top-0 inset-x-0 py-2 text-center capitalize flex pe-8 transition-all duration-500 ease-in">
        <div className="container flex flex-col px-2 md:flex-row justify-between items-center text-gray-500">
          <div className="flex flex-col md:flex-row space-x-3 w-full justify-between">
            <img src={logo} width={120} alt="" />
            {token && (
              <ul
                className={`flex flex-col md:flex-row transition-all duration-700 overflow-hidden items-center gap-4 flex-nowrap ${
                  open ? "mt-3 md:mt-0 h-[150px] md:h-8" : "h-0 md:flex md:h-8"
                }`}
              >
                <>
                  <li>
                    <NavLink to="" className={`text-hover`}>
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="products" className={`text-hover`}>
                      products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="categories" className={`text-hover`}>
                      categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="brands" className={`text-hover`}>
                      brands
                    </NavLink>
                  </li>
                </>
              </ul>
            )}
            <div className="">
              <ul
                className={`flex flex-col md:flex-row transition-all duration-700 overflow-hidden md:overflow-visible items-center gap-4 flex-nowrap ${
                  open ? "mt-3 md:mt-0 h-15" : "h-0 md:flex md:h-8"
                }`}
              >
               {token && <li>
                  <div className="absolute top-2 right-28 md:relative md:top-0 md:right-0 mt-1">
                    <Link to="/cart">
                      <i className="fa-solid fa-cart-shopping fa-xl"></i>
                      <span className="badge text-white bg-main">
                        {cart?.numOfCartItems > 0 ? cart.numOfCartItems : 0}
                      </span>
                    </Link>
                  </div>
                </li>}
                {token && <li>
                  <div className="absolute top-2 right-16 md:relative md:top-0 md:right-0 mt-1">
                    <Link to="/wishlist">
                      <i className="fa-solid fa-heart fa-xl text-red-700"></i>
                      <span className="badge text-white bg-main">
                        {wishlist?.count > 0 ? wishlist.count : 0}
                      </span>
                    </Link>
                  </div>
                </li>}
                {token ? (
                <>
                    <li>
                      <span onClick={logout} className="cursor-pointer">
                        <i className="fa-solid fa-right-from-bracket text-black text-2xl px-3"></i>
                      </span>
                    </li>
                </>
                ) : (
                  ""
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
