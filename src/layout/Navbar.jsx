import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Navbar = () => {
  const {CartData} = useContext(AppContext)
  console.log(CartData, "CartData")
 
  return (
    <>
      <nav
        x-data="{ isOpen: false }"
        className="relative bg-white shadow dark:bg-gray-800"
      >
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between cart-opt">
            <a href="#">
              <img
                className="w-auto h-6 sm:h-7"
                src="https://merakiui.com/images/full-logo.svg"
                alt=""
              />
            </a>
          {/* <input className="px-1 rounded-lg" type="text" placeholder="Search here... " /> */}
          </div>


        <Link to='/cart'>
          <div className="absolute sm:block hidden inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 cursor-pointer ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
            <div className="flex justify-center md:block">
              <h1 className="text-white ">Cart : {CartData.length}</h1>
            </div>
          </div>
        </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
