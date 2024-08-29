import React, { useContext } from "react";
import { useLocation } from "react-router-dom";



const View = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <>
      <div class="w-1/2 my-20 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto">
        <div class="px-4 py-2">
          <h1 class="text-xl font-bold text-gray-800 uppercase dark:text-white">
            {data.productName}
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
            quidem sequi illum facere recusandae voluptatibus
          </p>
        </div>

        <img
          class="object-cover w-full h-48 mt-2"
          src={`https://production-api.payzo.in/${data.productImage[0]}`}
          alt="NIKE AIR"
        />

        <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 class="text-lg font-bold text-white">{data.productSalePrice}</h1>
        </div>
      </div>
    </>
  );
};

export default View;
