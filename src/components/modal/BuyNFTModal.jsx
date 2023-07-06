import React, { useState, useCallback } from "react";
import { useContractWrite, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Modal from "react-modal";

import { ErrorBox, Loader } from "../../components";

const marketPlaceContractAddress = import.meta.env
  .VITE_MARKETPLACE_CONTRACT_ADDRESS;

const NftContractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

const BuyNFTModal = ({ isOpen, closeModal, tokenId, tokenPrice }) => {
  const [sellingPrice, setSellingPrice] = useState("");
  const [error, setError] = useState(null);
  const { contract } = useContract(
    "0xC021ef7f273018f736d8A734e400c43773f26d47"
  );
  const { contract: NftContract } = useContract(NftContractAddress);

  const {
    mutateAsync: mutateNftApproveAsync,
    isLoading: isNftApproveContractLoading,
    error: NftApproveContractError,
  } = useContractWrite(NftContract, "approve");

  const { mutateAsync, isLoading } = useContractWrite(
    contract,
    "createMarketItem"
  );

  const handleSellingPriceChange = (e) => {
    setSellingPrice(e.target.value);
  };

  const customStyles = {
    content: {
      display: "flex",
      positition: "fixed",
      background: "none",
      border: "none",
    },
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: "0.5",
      background: "none",
    },
  };

  const handleCloseModal = () => {
    setError(null);
    closeModal();
  };

  const approveNft = async () => {
    if (sellingPrice) {
      try {
        const res = await mutateNftApproveAsync({
          args: [marketPlaceContractAddress, tokenId],
        });
        setError(null);
        return res.receipt.events;
      } catch (error) {
        setError(error);
      }
      return null;
    }
    setError({
      name: "",
      message: "You must enter a selling price to list your sneakers nft",
    });
  };

  const createMarketItem = async () => {
    try {
      const res = await mutateAsync({
        args: [
          NftContractAddress,
          tokenId,
          ethers.utils.parseEther(sellingPrice),
        ],
        overrides: {
          value: ethers.utils.parseEther("0.025"),
        },
      });
      setError(null);
      return res.receipt.events;
    } catch (error) {
      setError(error);
    }
    return null;
  };

  const handleSubmit = useCallback(
    async (event) => {
      setError(null);
      event.preventDefault();
      const events = await approveNft();
      if (events) {
        await createMarketItem();
      }
    },
    [sellingPrice]
  );

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="List Nft"
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className=" flex flex-col bg-black rounded-[10px] mx-auto sm:p-10 p-4 w-[80%]">
        <div className="flex items-center  p-[16px] sm:min-w-[380px] flex-col">
          <h1 className="text-white font-bold sm:text-[24px] text-[18px] leading-[38px]">
            Buy Nft
          </h1>
          <div className="border-b-2 border-gray-300 w-full mt-10" />
        </div>
        <div className="absolute w-[50%] inset-0 gradient-03" />
        <div
          // onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col z-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-white font-medium text-[24px] mt-10 mb-[10px] items-center">
              Summary
            </span>
            <div className="flex gap-20 mt-6">
              <span className="text-gray-300">Current Price</span>
              <p className="text-gray-300">
                {ethers.utils.formatEther("1000000000000000000")} MATIC
              </p>
            </div>
            <div className="flex gap-20 mt-6">
              <span className="text-gray-300">Creator earnings </span>
              <p className="text-gray-300">0 %</p>
            </div>
            <div className="border-b border-gray-500 w-[20%] mt-6" />
            <div className="flex gap-20 mt-6">
              <span className="text-gray-300">SneakerStamp fee</span>
              <p className="text-gray-300">5 %</p>
            </div>
            <div className="flex gap-20 mt-10">
              <span className="text-gray-100 font-bold text-lg">Total</span>
              <p className="text-gray-300">
                {(ethers.utils.formatEther(tokenPrice) * 1.05).toFixed(2)} MATIC
              </p>
            </div>
          </div>

          <div className="flex gap-6 justify-center items-center mt-[40px]">
            {!isNftApproveContractLoading && (
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
              disabled={isNftApproveContractLoading}
            >
              {isNftApproveContractLoading ? (
                <Loader color="grey" />
              ) : (
                <p>Complete Listing</p>
              )}
            </button>
          </div>
        </div>
        <div className="mt-10">
          {(error || NftApproveContractError) && (
            <ErrorBox
              errorName={
                NftApproveContractError
                  ? NftApproveContractError.name
                  : error.name
              }
              errorDescription={
                NftApproveContractError
                  ? NftApproveContractError.message
                  : error.message
              }
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BuyNFTModal;
