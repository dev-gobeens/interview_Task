import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./component/card";
import Navbar from "./layout/Navbar";
import View from "./component/View";
import Cart from "./component/Cart";

export const AppContext = createContext();

const App = () => {
  const [CartData, setCartData] = useState([]);
  console.log(CartData, "lol");

  const handelUpdateCart = (val) => {
    const Arr = CartData.map((item) => item._id);
    if (Arr.includes(val._id)) {
      console.log("Item already in the cart!");
    } else {
      console.log("Item added succefully!");
      setCartData([...CartData, val]);
    }
    console.log("object");
  };

  const deleteData = (val)=>{
    const Arr = CartData.filter(item => item._id !=val)
    setCartData(Arr)
    toast("Item removed succefully!");
  }

  const store = {
    CartData,
    handelUpdateCart,
    deleteData
  };
  return (
    <>
      <AppContext.Provider value={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item/:_id" element={<View />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
};

export default App;
