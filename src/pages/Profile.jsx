import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { SneakersCard } from "../components";
import { fadeIn } from "../utils/motion";

const backendUrl = import.meta.env.VITE_NFT_BACKEND_URL;

const Profile = () => {
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profileNfts, setProfileNfts] = useState(null);
  const { address } = useParams();

  useEffect(() => {
    async function getProfilePicture() {
      if (address) {
        setProfilePictureUrl(
          `https://storage.googleapis.com/opensea-static/opensea-profile/${generateIntegerFromAddress(
            address
          )}.png`
        );
      }
    }
    async function getProfileNfts() {
      if (address) {
        const res = await axios.get(`http://${backendUrl}/profile/${address}`);
        if (res.status === 201) {
          await fetchMissingMetadata(res.data.result);
          setProfileNfts(res.data.result);
        }
      }
    }

    getProfilePicture();
    getProfileNfts();
  }, [address]);

  async function fetchMissingMetadata(objects) {
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
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
    }
    return objects;
  }

  function generateIntegerFromAddress(address) {
    const hash = hashCode(address);
    const generatedInteger = (Math.abs(hash) % 33) + 1;
    return generatedInteger;
  }

  function hashCode(str) {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  function formatEthereumAddress(address) {
    if (!address) {
      return "";
    }
    const prefix = address.substring(0, 4);
    const suffix = address.substring(address.length - 3);
    return `${prefix}...${suffix}`;
  }

  function getNftAttributes(attributes, attributeName) {
    console.log(attributes, attributeName);
    if (attributes) {
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].hasOwnProperty(attributeName)) {
          return attributes[i][attributeName];
        }
      }
    }
    return null;
  }

  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <div>
        <div className="flex flex-col m-2">
          <div className="rounded-md">
            {profilePictureUrl && (
              <img
                src={profilePictureUrl}
                className=" w-28 h-28 rounded-full border-4 border-white"
              />
            )}
          </div>
          <div className="mt-4">
            <a
              href={`https://mumbai.polygonscan.com/address/${address}`}
              className="text-xl text-blue-500 ml-3"
              target="_blank"
            >
              {formatEthereumAddress(address)}
            </a>
          </div>
        </div>
        {profileNfts ? (
          <div className="flex items-center flex-col mt-10">
            <h1 className="text-gray-300 text-3xl mb-10">Nft collection</h1>

            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {profileNfts.map((nft, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/assets/${nft.tokenAddress}/${nft.tokenId}`, {
                      state: { nft },
                    });
                  }}
                >
                  <SneakersCard
                    isListed={false}
                    key={index}
                    price={null}
                    brand={nft?.metadata.attributes[0].value}
                    model={nft?.metadata.attributes[1].value}
                    size={nft?.metadata.attributes[4].value}
                    img={nft?.metadata?.image}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div>
            <h1 className="text-gray-300 text-3xl mb-10">
              No nft owned by this profile
            </h1>
          </div>
        )}
      </div>
      )
    </div>
  );
};

export default Profile;
