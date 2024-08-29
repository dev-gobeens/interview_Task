import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // State for sorting preference
  const { handelUpdateCart } = useContext(AppContext);

  const decryptFunc = (data) => {
    const decryptData = CryptoJS.AES.decrypt(data.Data, "kanhape");
    return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://production-api.payzo.in/api/product/list"
        );
        const dec = decryptFunc(response.data);
        setData(dec);
        setFilteredData(dec); // Initialize filteredData
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    filterAndSortData(event.target.value, sortOrder);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    filterAndSortData(inputValue, event.target.value);
  };

  const filterAndSortData = (input, sort) => {
    let filtered = data.filter((item) =>
      item.productName.toLowerCase().includes(input.toLowerCase())
    );

    if (sort === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.productSalePrice - b.productSalePrice);
    } else if (sort === "highToLow") {
      filtered = filtered.sort((a, b) => b.productSalePrice - a.productSalePrice);
    }

    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          className="border px-2 py-1 rounded-lg w-1/3 text-center"
          placeholder="Search here"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="lowToHigh"
              checked={sortOrder === "lowToHigh"}
              onChange={handleSortChange}
            />
            <span className="ml-2">Price Low to High</span>
          </label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="highToLow"
              checked={sortOrder === "highToLow"}
              onChange={handleSortChange}
            />
            <span className="ml-2">Price High to Low</span>
          </label>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {filteredData.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          filteredData.map((item) => (
            <div key={item._id} className="w-[85%] mx-auto">
              <div className="shadow-md border my-5 border-gray-200 rounded-lg">
                <div className="cursor-pointer">
                  <img
                    className="w-full h-52 object-cover"
                    src={`https://production-api.payzo.in/${item.productImage[0]}`}
                    alt={item.productName}
                  />
                  <div className="p-2">
                    <div className="space-y-0.5">
                      <h2 className="font-semibold">{item.productName}</h2>
                      <h2 className="space-x-2 items-center">
                        <span className="text-blue-500 text-lg font-medium">
                          ₹{item.productSalePrice}
                        </span>
                        <span className="line-through text-sm">
                          ₹{item.productActualPrice}
                        </span>
                        <span className="text-red-800 font-medium">
                          (25% Off)
                        </span>
                      </h2>
                      <h2 className="flex">{item.productDesc.slice(0, 100)}</h2>
                      <div className="flex mt-4 space-x-3 items-center justify-between">
                        <div>
                          <div className="flex text-center w-40 p-2 my-2 cursor-pointer border-gray-300 rounded-md border py-2 justify-center text-black bg-white">
                            <Link to={`/item/${item._id}`} state={item}>
                              <button className="tracking-wide font-semibold w-full">
                                Quick View
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div
                          onClick={() => handelUpdateCart(item)}
                          className="flex text-center p-2 my-2 cursor-pointer border-gray-300 rounded-md border py-2 justify-center text-black bg-white"
                        >
                          <div className="tracking-wide font-semibold w-full">
                            Add to Cart
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Card;
