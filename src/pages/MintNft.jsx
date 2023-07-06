import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrReader } from "react-qr-reader";
import {
  useContractWrite,
  useContract,
  ThirdwebNftMedia,
  useNFT,
} from "@thirdweb-dev/react";

import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import { ErrorBox, Loader } from "../components";
import styles from "../styles";
import axios from "axios";

const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;

// Temp composant, to use later on in NftCard component
const NftRender = ({ tokenId }) => {
  const [metadataUri, setMetadataUri] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const { contract } = useContract(contractAddress);
  const { data: nft, isLoading, error } = useNFT(contract, tokenId); //not working for the moment using AWS S3, will work when using MongoDB

  useEffect(() => {
    if (nft) {
      setMetadataUri(nft.metadata.uri);
    }
  }, [nft]);

  useEffect(() => {
    async function getMetadata() {
      if (metadataUri) {
        try {
          const res = await axios.get(metadataUri);
          if (res) {
            setMetadata(res.data);
          }
        } catch (error) {
          // Handle error
        }
      }
    }
    getMetadata();
  }, [metadataUri]);

  if (metadata) {
    return <ThirdwebNftMedia metadata={metadata} className="rounded-lg" />;
  } else {
    return <></>;
  }
};

const CreateNft = () => {
  const [startScan, setStartScan] = useState(false);
  const [transferDone, setTransferDone] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [error, setError] = useState(null);
  const { contract } = useContract(contractAddress);
  const {
    mutateAsync,
    isLoading: isContractLoading,
    error: contractError,
  } = useContractWrite(contract, "transferNFT");

  const mintToken = async (tokenId, tokenUuid) => {
    try {
      await mutateAsync({
        args: [tokenId, tokenUuid],
      });
      setTransferDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScan = async (scanData) => {
    setError(null);
    if (scanData?.text) {
      setStartScan(false);
      const data = JSON.parse(scanData.text);
      if (validateQrCodeData(data)) {
        setTokenId(data.tokenId);
      } else {
        setError({
          name: "Read qr code fail",
          message: "The Qr Code you provided is not a sneakerstamp qr code.",
        });
      }
      await mintToken(data.tokenId, data.tokenUuid);
      setStartScan(false);
    }
  };

  const handleError = (error) => {
    console.log(err);
  };

  const validateQrCodeData = (jsonData) => {
    if (
      jsonData &&
      typeof jsonData === "object" &&
      jsonData.tokenId !== null &&
      jsonData.tokenUuid !== null
    ) {
      return true;
    } else {
      return false;
    }
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
        <div className="items-center justify-center flex flex-col  rounded-[10px] mx-auto sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px]">
            <h1
              variants={textVariant(1.2)}
              className="text-white font-bold sm:text-[24px] text-[18px] leading-[38px]"
            >
              Mint your NFT
            </h1>
          </div>
          <div className="absolute w-[50%] inset-0 gradient-03" />
          <button
            onClick={() => {
              setStartScan(!startScan);
            }}
            className="bg-blue-500 rounded-md sm:px-6 sm:py-3 text-white hover:scale-110 transition duration-200"
          >
            {isContractLoading ? (
              <Loader color="grey" />
            ) : startScan ? (
              "Stop Scanning"
            ) : (
              "Scan my Qr Code"
            )}
          </button>

          {startScan && (
            <>
              <QrReader
                delay={1000}
                onError={handleError}
                onResult={handleScan}
                className="w-1/2 h-1/2"
              />
            </>
          )}
        </div>
      </motion.div>
      {transferDone && (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}>
          {/* <div className="rounded-[10px] border-[2px] mt-[30px] outline-none border-[#3a3a43] text-white flex justify-center items-center mx-[200px]"> */}
          <div className="flex justify-center">
            <NftRender tokenId={tokenId} />
          </div>
        </motion.div>
      )}
      {contractError && (
        <ErrorBox
          errorName={contractError.name}
          errorDescription={contractError.message}
        />
      )}
      {error && (
        <ErrorBox errorName={error.name} errorDescription={error.message} />
      )}
    </motion.div>
  );
};

export default CreateNft;
