import React, { useState, useCallback } from "react";
import {
  useContractWrite,
  useContractRead,
  useContract,
} from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

import Modal from "react-modal";
import { ErrorBox, Loader } from "../../components";
import { BigNumber } from "ethers";

const marketPlaceContractAddress = import.meta.env
  .VITE_MARKETPLACE_CONTRACT_ADDRESS;

const DelistNFTModal = ({ isOpen, closeModal, tokenId }) => {
  const [error, setError] = useState(null);
  const [delistSuceed, setDelistSuceed] = useState(false);
  const { contract } = useContract(marketPlaceContractAddress);
  const { data } = useContractRead(contract, "fetchActiveItems");
  const address = useAddress();

  const {
    mutateAsync,
    isLoading,
    error: contractError,
  } = useContractWrite(contract, "deleteMarketItem");

  const customStyles = {
    content: {
      display: "flex",
      positition: "fixed",
      background: "none",
    },
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: "0.3",
    },
  };

  const handleCloseModal = () => {
    setError(null);
    closeModal();
  };

  const deleteMarketItem = async () => {
    try {
      const res = await mutateAsync({
        args: ["2", address],
      });
      setError(null);
      return res.receipt.events;
    } catch (error) {
      setError(error);
    }
    return null;
  };

  const handleSubmit = useCallback(async (event) => {
    setError(null);
    event.preventDefault();
    //await deleteMarketItem();
    setDelistSuceed(true);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Delist Nft"
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className=" flex flex-col bg-black rounded-[10px] mx-auto sm:p-10 p-4 w-[80%]">
        <div className="flex items-center  p-[16px] sm:min-w-[380px] flex-col">
          <h1 className="text-white font-bold sm:text-[24px] text-[18px] leading-[38px]">
            Cancell the listing of your NFT
          </h1>
          <div className="border-b-2 border-gray-300 w-full mt-10" />
        </div>
        <div className="absolute w-[50%] inset-0 gradient-03" />
        <div className="mt-[65px] flex flex-col z-10">
          {!delistSuceed ? (
            <div>
              <div className="flex flex-col items-center">
                <span className="text-white font-medium text-[24px] mt-10 mb-[10px] items-center">
                  Confirm the delisting of your nft
                </span>
              </div>

              <div className="flex gap-6 justify-center items-center mt-[40px]">
                {!isLoading && (
                  <button
                    onClick={() => handleCloseModal()}
                    className="bg-red-500 hover:scale-110 transition duration-200 rounded-md sm:px-6 sm:py-3 text-white"
                  >
                    Cancell
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:scale-110 transition duration-200 rounded-md sm:px-6 sm:py-3 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader color="grey" /> : <p>Cancell Listing</p>}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                className="bg-blue-500 h-fit rounded-md sm:px-6 sm:py-3 mr-5 text-white hover:scale-110 transition duration-200"
                onClick={() => handleCloseModal()}
              >
                Back
              </button>
            </div>
          )}
          <div className="mt-10">
            {(error || contractError) && (
              <ErrorBox
                errorName={contractError ? contractError.name : error.name}
                errorDescription={
                  contractError ? contractError.message : error.message
                }
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DelistNFTModal;
