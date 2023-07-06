import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useContractWrite, useContract } from "@thirdweb-dev/react";
import axios from "axios";

import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import styles from "../styles";
import { FormField, Loader, QrCodeToPDF, ErrorBox } from "../components";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
const backendUrl = import.meta.env.VITE_NFT_BACKEND_URL;

const GenerateNft = () => {
  const [qrCodeReady, setQrCodeReady] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState(null);
  const [isBackendCallLoading, setIsBackendCallLoading] = useState(false);

  const { contract } = useContract(contractAddress);
  const {
    mutateAsync,
    isLoading: isContractLoading,
    error: contractError,
  } = useContractWrite(contract, "createToken");

  const now = new Date();
  const isoDate = now.toISOString().split("T")[0];

  const [values, setValues] = useState({
    brand: "Nike",
    model: "Dunk Low",
    colorway: "Red",
    styleCode: "AJ1RD12",
    size: "EU43",
    productionDate: isoDate,
    imageUri: "",
  });

  const createToken = async (tokenURL, tokenUUID) => {
    try {
      const res = await mutateAsync({
        args: [tokenURL, tokenUUID],
      });
      setError(null);
      return res.receipt.events;
    } catch (error) {
      setError(error);
    }
    return null;
  };

  const getTokenIdFromTransactionEvents = (events) => {
    const tokenCreatedEvent = events.find(
      (event) => event.event === "tokenCreated"
    );
    if (tokenCreatedEvent) {
      return parseInt(tokenCreatedEvent.args[0]._hex);
    }
    return null;
  };

  const handleSubmit = useCallback(
    async (event) => {
      setError(null);
      setIsBackendCallLoading(true);
      setQrCodeData(null);
      event.preventDefault();
      try {
        const response = await axios.post(
          `http://${backendUrl}/upload`,
          {
            ...values,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        );
        const events = await createToken(
          response.data.tokenURL,
          response.data.tokenUUID
        );
        const tokenId = getTokenIdFromTransactionEvents(events);
        setQrCodeData({
          tokenId: tokenId,
          tokenUuid: response.data.tokenUUID,
        });
        setQrCodeReady(true);
        setIsBackendCallLoading(false);
      } catch (error) {
        setError(error);
        setIsBackendCallLoading(false);
      }
    },
    [values]
  );

  const handleFormFieldChange = (id, e) => {
    setValues({ ...values, [id]: e.target.value });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <motion.div variants={slideIn("right", "tween", 0.2, 1)}>
        <div className="items-center justify-center flex flex-col bg-black rounded-[10px] mx-auto sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px]">
            <h1
              variants={textVariant(1.2)}
              className="text-white font-bold sm:text-[24px] text-[18px] leading-[38px]"
            >
              Generate your NFT
            </h1>
          </div>
          <div className="absolute w-[50%] inset-0 gradient-03" />
          <form
            // onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col z-10"
          >
            <div className="flex flex-wrap items-center gap-[40px]">
              <FormField
                labelName="Brand"
                placeholder="Nike"
                inputType="text"
                value={values.brand}
                handleChange={(e) => {
                  handleFormFieldChange("brand", e);
                }}
              />
              <FormField
                labelName="Model"
                placeholder="Dunk Low"
                inputType="text"
                value={values.model}
                handleChange={(e) => {
                  handleFormFieldChange("model", e);
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-[40px] mt-6">
              <FormField
                labelName="Colorway"
                placeholder="Bird Yello"
                inputType="text"
                value={values.colorway}
                handleChange={(e) => {
                  handleFormFieldChange("colorway", e);
                }}
              />
              <FormField
                labelName="Stylecode"
                placeholder="0xabc"
                inputType="text"
                value={values.styleCode}
                handleChange={(e) => {
                  handleFormFieldChange("styleCode", e);
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-[40px] mt-6">
              <FormField
                labelName="Size"
                placeholder="EU43.5"
                inputType="text"
                value={values.size}
                handleChange={(e) => {
                  handleFormFieldChange("size", e);
                }}
              />
              <FormField
                labelName="Production Date"
                placeholder="Production Date"
                inputType="date"
                value={values.productionDate}
                handleChange={(e) => {
                  handleFormFieldChange("productionDate", e);
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-[40px] mt-6">
              <FormField
                labelName="Image"
                placeholder="Place image URL of the shoes"
                inputType="url"
                value={values.imageUri}
                handleChange={(e) => {
                  handleFormFieldChange("imageUri", e);
                }}
              />
            </div>
            <div className="flex justify-center items-center mt-[40px]">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:scale-110 transition duration-200 rounded-md sm:px-6 sm:py-3 text-white"
                disabled={isContractLoading || isBackendCallLoading}
              >
                {isContractLoading || isBackendCallLoading ? (
                  <Loader color="grey" />
                ) : (
                  <p>Submit</p>
                )}
              </button>
            </div>
          </form>
          {!isContractLoading && !contractError && qrCodeReady && (
            <div className="text-white">
              <QrCodeToPDF data={qrCodeData} filename={values.model} />
            </div>
          )}
        </div>
        {(error || contractError) && (
          <ErrorBox
            errorName={contractError ? contractError.name : error.name}
            errorDescription={
              contractError ? contractError.message : error.message
            }
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default GenerateNft;
