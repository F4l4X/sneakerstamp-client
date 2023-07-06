import React from "react";
import polygon from "../../../assets/polygon.png";
import { ethers } from "ethers";

const SneakersCard = ({ img, price, brand, model, isListed, size }) => {
  return (
    <div className="w-30 bg-white rounded-lg shadow-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
      <img
        src={img}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://www.auto-ecole-adoue.com/wp-content/themes/consultix/images/no-image-found-360x260.png";
        }}
        alt="Product"
        className="w-full h-50 object-cover rounded-t-lg"
      />
      <div className="p-4">
        {isListed && (
          <div className="text-gray-600 font-semibold text-lg mb-2 flex gap-2 items-center">
            {ethers.utils.formatEther(price)} MATIC
            <img className="w-5 h-5" src={polygon} />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h4 className="text-gray-500 text-md font-bold">Brand</h4>
            <h5 className="text-gray-500 text-md">{brand}</h5>
          </div>
          <div className="flex gap-2">
            <h4 className="text-gray-500 text-md font-bold">Model</h4>
            <h5 className="text-gray-500 text-md">{model}</h5>
          </div>
          <div className="flex gap-2">
            <h4 className="text-gray-500 text-md font-bold">Size</h4>
            <h5 className="text-gray-500 text-md">{size}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakersCard;
