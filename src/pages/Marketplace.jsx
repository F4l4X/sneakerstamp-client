import React, { useEffect, useState } from "react";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { motion } from "framer-motion";
import { SneakersCard } from "../components";

import SideBar from "../components/marketplace/SideBar";

const marketPlaceContractAddress = import.meta.env
  .VITE_MARKETPLACE_CONTRACT_ADDRESS;
const backendUrl = import.meta.env.VITE_NFT_BACKEND_URL;

const Marketplace = () => {
  const [listedItems, setListedItems] = useState(null);
  const { contract, isLoading } = useContract(marketPlaceContractAddress);
  const { data } = useContractRead(contract, "fetchActiveItems");
  const navigate = useNavigate();

  useEffect(() => {
    async function getNftMetadata() {
      if (data) {
        let nft = [];
        for (let i = 0; i < data.length; i++) {
          try {
            const res = await axios.get(
              `http://${backendUrl}/assets/${data[i].nftContract}/${parseInt(
                data[i].tokenId._hex
              )}/metadata`
            );
            if (res.status === 201) {
              const nftWithMetadata = await fetchMissingMetadata(
                res.data.result
              );
              nftWithMetadata.price = data[i].price._hex.toString(16);
              nft.push(nftWithMetadata);
            }
          } catch (error) {
            console.error(
              `Error fetching metadata for object at index ${i}:`,
              error
            );
          }
        }
        setListedItems(nft);
        return nft;
      }
    }

    getNftMetadata();
  }, [data]);

  async function fetchMissingMetadata(object) {
    if (!object.metadata) {
      try {
        const response = await fetch(object.tokenUri);
        if (response.ok) {
          const metadata = await response.json();
          object.metadata = metadata;
        } else {
          console.error(`Failed to fetch metadata for object at index ${i}.`);
          object.metadata = null;
        }
      } catch (error) {
        console.error(
          `Error fetching metadata for object at index ${i}:`,
          error
        );
      }
    }
    return object;
  }

  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="w-3/4 p-4">
        {listedItems && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {listedItems.map((nft, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/assets/${nft.tokenAddress}/${nft.tokenId}`, {
                    state: { nft },
                  });
                }}
              >
                <SneakersCard
                  key={index}
                  isListed={true}
                  price={nft.price}
                  brand={nft.metadata.attributes[0].value}
                  model={nft.metadata.attributes[1].value}
                  img={nft.metadata.image}
                  size={nft.metadata.attributes[4].value}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
