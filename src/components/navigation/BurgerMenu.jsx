import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const address = "0xabc";
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="p-2= text-white rounded-md focus:outline-none hover:bg-gray-500 transition duration-300 ease-in-out"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div
          className={`${
            isOpen ? "opacity-1 visible" : "opacity-0 invisible"
          } absolute z-50 mt-2 ml-[-40px] bg-black rounded-md shadow-md transition duration-300 ease-in-out backdrop-filter backdrop-blur-lg bg-opacity-20`}
        >
          <ul className="py-2 text-white">
            <li className="px-4 py-2 hover:scale-125 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("/");
                    setIsOpen(false);
                  }
                }}
              >
                HOME
              </button>
            </li>
            <li className="px-4 py-2 hover:scale-125 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("marketplace");
                    setIsOpen(false);
                  }
                }}
              >
                BUY SHOES
              </button>
            </li>
            <li className="px-4 py-2 hover:scale-110 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("mint-nft");
                    setIsOpen(false);
                  }
                }}
              >
                MINT YOUR NFT
              </button>
            </li>
            <li className="px-4 py-2 hover:scale-110 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("generate-nft");
                    setIsOpen(false);
                  }
                }}
              >
                GENERATE YOUR NFT
              </button>
            </li>
            <li className="px-4 py-2 hover:scale-110 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("contact-us");
                    setIsOpen(false);
                  }
                }}
              >
                CONTACT US
              </button>
            </li>
            <li className="px-4 py-2 hover:scale-110 transition durantion-200 cursor-pointer flex justify-center">
              <button
                onClick={() => {
                  if (address) {
                    navigate("cgu");
                    setIsOpen(false);
                  }
                }}
              >
                CGU
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
