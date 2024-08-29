import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../App";

const Cart = () => {
  const data = useContext(AppContext);
  const { deleteData } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Initialize cart items with quantities from the data
    setCartItems(data.CartData.map((item) => ({ ...item, Qty: 1 })));
  }, [data.CartData]);

  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].Qty += 1;
    setCartItems(newCartItems);
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].Qty > 1) {
      newCartItems[index].Qty -= 1;
      setCartItems(newCartItems);
    }
  };

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="font-bold px-4 py-3.5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="font-bold px-4 py-3.5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="font-bold px-4 py-3.5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Total Amount
                    </th>
                  </tr>
                </thead>
                {cartItems.map((item, index) => (
                  <tbody
                    key={index}
                    className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                  >
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="flex items-center mx-auto">
                          <h2
                            className="text-red-400 rounded-full cursor-pointer hover:text-red-500"
                            onClick={() => deleteData(item._id)}
                          >
                            <RiDeleteBin6Line className="text-2xl" />
                          </h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={`https://production-api.payzo.in/${item.productImage[0]}`}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {item.productName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ₹{item.productSalePrice}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <button
                            onClick={() => handleDecrement(index)}
                            className="px-3 py-1 text-xl text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60"
                          >
                            <FaMinus />
                          </button>
                          <p className="px-3 py-1 text-xl text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">
                            {item.Qty}
                          </p>
                          <button
                            onClick={() => handleIncrement(index)}
                            className="px-3 py-1 text-xl text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white">
                        <h1 className="font-bold">
                          ₹{item.productSalePrice * item.Qty}
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
