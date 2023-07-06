import React from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { useAddress } from "@thirdweb-dev/react";

import { navVariants } from "../../utils/motion";
import styles from "../../styles";

//import metamask from "../assets/metamask.png";
import BurgerMenu from "./BurgerMenu";
import { FiUser } from "react-icons/fi";
import { ConnectWallet } from "@thirdweb-dev/react";
import { NetworkChange, WrongNetwork } from "../../context/useNetworkMismatch ";

const Navbar = () => {
  const navigate = useNavigate();
  const address = useAddress();

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <WrongNetwork />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
      >
        <BurgerMenu />
        <h2
          className="font-extrabold text-[24px] leading-[30px] text-white cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          SNEAKERSTAMP
        </h2>
        <div className="flex gap-2 items-center">
          {address && (
            <button>
              <FiUser
                className="w-8 h-8 text-white mr-4 rounded-md focus:outline-none hover:bg-gray-500 transition duration-300 ease-in-out"
                onClick={() => {
                  navigate(`/profile/${address}`);
                }}
              />
            </button>
          )}
          <ConnectWallet />
          <NetworkChange />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
