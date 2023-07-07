import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";

import { MdOutlineSubject, MdLabelOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronUp, FiEye } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { BsTicket } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsArrowDownUp, BsCart2, BsStars } from "react-icons/bs";
import { CgArrowsH } from "react-icons/cg";
import { TfiNewWindow } from "react-icons/tfi";

import { BuyNFTModal, DelistNFTModal, ListNFTModal } from "../components";

const backendUrl = "https://sneakerstamp-efeda8a01089.herokuapp.com/";

const NftDetails = () => {
  const [showTraits, setShowTraits] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showListings, setShowListings] = useState(false);
  const [showItemActivity, setShowItemActivity] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isModalListOpen, setIsListModalOpen] = useState(false);
  const [isModalDelistOpen, setIsDelistModalOpen] = useState(false);
  const [isModalBuyOpen, setIsBuyModalOpen] = useState(false);
  const [nftActivity, setNftActivity] = useState(null);

  const { state } = useLocation();
  const address = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNftActivity() {
      try {
        const res = await axios.get(
          `http://${backendUrl}/assets/${state.nft.tokenAddress}/${state.nft.tokenId}/activity`
        );
        if (res.status === 201) {
          setNftActivity(getNftEvents(res.data.result));
        }
      } catch (error) {}
    }
    fetchNftActivity();
  }, []);

  const getNftEvents = (nftActivity) => {
    let events = [];
    for (let i = 0; i < nftActivity.length - 1; i++) {
      let eventType = "";
      if (
        nftActivity[i].fromAddress !=
          "0x0000000000000000000000000000000000000000" &&
        nftActivity[i].value === "0"
      ) {
        eventType = "Transfer";
      }
      if (
        nftActivity[i].fromAddress !=
          "0x0000000000000000000000000000000000000000" &&
        nftActivity[i].value != 0
      ) {
        eventType = "Sale";
      }
      events.push({
        type: eventType,
        price:
          nftActivity[i].value != 0
            ? (nftActivity[i].value / 1000000000000000000).toString() + " MATIC"
            : "",
        from: nftActivity[i].fromAddress,
        to: nftActivity[i].toAddress,
        date: getDateDifference(nftActivity[i].blockTimestamp),
        txHash: nftActivity[i].transactionHash,
      });
    }
    events.push({
      type: "Minted",
      price: "",
      from: nftActivity[nftActivity.length - 1].fromAddress,
      to: nftActivity[nftActivity.length - 1].toAddress,
      date: getDateDifference(
        nftActivity[nftActivity.length - 1].blockTimestamp
      ),
      txHash: nftActivity[nftActivity.length - 1].transactionHash,
    });
    return events;
  };

  const getDateDifference = (dateString) => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);

    const differenceInTime = currentDate.getTime() - givenDate.getTime();
    const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
    const differenceInHours = Math.floor(differenceInTime / (1000 * 60 * 60));
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minutes ago`;
    } else if (differenceInHours < 24) {
      return `${differenceInHours} hours ago`;
    } else {
      return `${differenceInDays} days ago`;
    }
  };

  const compareStringsIgnoreCase = (string1, string2) => {
    const regex = new RegExp(`^${string1}$`, "i");
    return regex.test(string2);
  };
  const formatEthereumAddress = (address) => {
    if (!address) {
      return "";
    }
    const prefix = address.substring(0, 4);
    const suffix = address.substring(address.length - 3);
    return `${prefix}...${suffix}`;
  };

  const getOwnerAddress = (ownerAddress) => {
    if (compareStringsIgnoreCase(ownerAddress, address)) {
      return "you";
    }
    return formatEthereumAddress(ownerAddress);
  };

  const handleOpenListModal = () => {
    setIsListModalOpen(true);
  };

  const handleCloseListModal = () => {
    setIsListModalOpen(false);
  };

  const handleOpenDelistModal = () => {
    setIsDelistModalOpen(true);
  };

  const handleCloseDelistModal = () => {
    setIsDelistModalOpen(false);
  };

  const handleOpenBuyModal = () => {
    setIsBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  const handleListNft = () => {};

  return (
    <div>
      <div className="fixed right-1/3 bottom-1/2">
        <div className="absolute inset-0 gradient-07" />
      </div>
      <div>
        <ListNFTModal
          isOpen={isModalListOpen}
          closeModal={handleCloseListModal}
          className="fixed"
          tokenId={state.nft.tokenId}
        />
      </div>
      <div>
        <DelistNFTModal
          isOpen={isModalDelistOpen}
          closeModal={handleCloseDelistModal}
          className="fixed"
          tokenId={state.nft.tokenId}
        />
      </div>
      {state.nft.price &&
        !compareStringsIgnoreCase(state.nft.ownerOf, address) && (
          <div>
            <BuyNFTModal
              isOpen={isModalBuyOpen}
              closeModal={handleCloseBuyModal}
              className="fixed"
              tokenId={state.nft.tokenId}
              tokenPrice={state.nft.price}
            />
          </div>
        )}
      <div
        className={
          isModalListOpen || isModalDelistOpen
            ? "flex flex-col blur-sm"
            : "flex flex-col"
        }
      >
        <div className="flex box-border">
          <div className="grow-0 w-1/3">
            <article className="m-5 rounded-full border-1 border-solid border-gray-300">
              <div className="flex align-center justify-center relative rounded-md border-solid border-2 border-gray-400">
                <img
                  className="w-full h-full"
                  src={state.nft.metadata.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://www.auto-ecole-adoue.com/wp-content/themes/consultix/images/no-image-found-360x260.png";
                  }}
                />
              </div>
              <div className="flex rounded-tl-md rounded-tr-md border-solid border-2 border-gray-400 mt-5">
                <div className="flex gap-2 items-center m-4">
                  <MdOutlineSubject className="w-6 h-6 text-white" />
                  <h3 className="text-md text-white font-semibold">
                    Description
                  </h3>
                </div>
              </div>
              <div className="flex relative border-solid border-t-0 border-2 border-gray-400">
                <div className="flex items-center m-5">
                  <h3 className="text-md text-gray-300 text-justify">
                    {state.nft.metadata.description}
                  </h3>
                </div>
              </div>
              <div className="flex border-solid border-t-0 border-2 border-gray-400">
                <div className="flex w-full gap-2 m-4">
                  <MdLabelOutline className="w-6 h-6 text-white" />
                  <h3 className="text-md text-white font-semibold">Traits</h3>
                  <div className="flex w-full justify-end">
                    {showTraits ? (
                      <FiChevronUp
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowTraits(!showTraits)}
                      />
                    ) : (
                      <FiChevronDown
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowTraits(!showTraits)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {showTraits && (
                <div className="flex border-solid border-t-0 border-2 border-gray-400">
                  <div className="flex flex-wrap m-5 w-full justify-center items-center">
                    {state.nft.metadata.attributes.map((trait, index) => (
                      <div
                        className="flex flex-col items-center w-fit m-2 p-4 rounded-md border-solid border-2 border-gray-400"
                        key={index}
                      >
                        <h4 className="uppercase text-gray-300">
                          {trait.trait_type}
                        </h4>
                        <h5 className="text-gray-100 font-semibold">
                          {trait.value}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex border-t-0 border-solid border-2 border-gray-400  rounded-b-md">
                <div className="flex w-full gap-2 m-4">
                  <IoDocumentTextOutline className="w-6 h-6 text-white" />
                  <h3 className="text-md text-white font-semibold">Details</h3>

                  <div className="flex w-full justify-end">
                    {showTraits ? (
                      <FiChevronUp
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                      />
                    ) : (
                      <FiChevronDown
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {showDetails && (
                <div className="flex-row relative rounded-br-md rounded-bl-md border-solid border-t-0 border-2 border-gray-400">
                  <div className="flex m-5 mt-0 pt-5">
                    <h3 className="text-md text-gray-300 ">
                      Contract Address{" "}
                    </h3>
                    <a
                      className="text-md text-blue-500 absolute right-5"
                      href={`https://mumbai.polygonscan.com/address/${state.nft.tokenAddress}`}
                      target="_blank"
                    >
                      {formatEthereumAddress(state.nft.tokenAddress)}
                    </a>
                  </div>

                  <div className="flex align-center m-5">
                    <h3 className="text-md text-gray-300 ">Token ID</h3>
                    <a
                      className="text-md text-blue-500 absolute right-5"
                      href={state.nft.tokenUri}
                      target="_blank"
                    >
                      {state.nft.tokenId}
                    </a>
                  </div>
                  <div className="flex  align-center m-5">
                    <h3 className="text-md text-gray-300 ">Token Standard</h3>
                    <h3 className="text-md text-gray-100 absolute right-5">
                      {state.nft.contractType}
                    </h3>
                  </div>
                </div>
              )}
            </article>
          </div>

          <div className="flew w-2/3  grow-0">
            <div className="m-5 flex w-full ">
              <a className="text-md text-blue-500" href="">
                {state.nft.name}
              </a>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col ">
                <div className="ml-5 mt-8 flex">
                  <h2 className="text-2xl font-semibold text-white">
                    {state.nft.metadata.name}
                  </h2>
                </div>
                <div className="ml-5 mb-5 flex ">
                  <h4 className="text-md text-gray-300">Owned by</h4>
                  <h4
                    className="ml-1 text-md text-blue-500 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${state.nft.ownerOf}`);
                    }}
                  >
                    {getOwnerAddress(state.nft.ownerOf)}
                  </h4>
                </div>
              </div>
              {compareStringsIgnoreCase(state.nft.ownerOf, address) ? (
                !state.nft.price ? (
                  <div className="flex w-fit">
                    <button
                      onClick={handleOpenListModal}
                      className="bg-blue-500 h-fit rounded-md sm:px-6 sm:py-3 mr-5 text-white hover:scale-110 transition duration-200"
                    >
                      List Sneakers
                    </button>
                  </div>
                ) : (
                  <div className="flex w-fit">
                    <button
                      onClick={handleOpenDelistModal}
                      className="bg-blue-500 h-fit rounded-md sm:px-6 sm:py-3 mr-5 text-white hover:scale-110 transition duration-200"
                    >
                      Cancell Listing
                    </button>
                  </div>
                )
              ) : state.nft.price ? (
                <div className="flex w-fit">
                  <button
                    onClick={handleOpenBuyModal}
                    className="bg-blue-500 h-fit rounded-md sm:px-6 sm:py-3 mr-5 text-white hover:scale-110 transition duration-200"
                  >
                    Buy Nft
                  </button>
                </div>
              ) : null}
            </div>
            <div className="m-5 mt-8 flex">
              <FiEye className="w-6 h-6 text-white cursor-pointer" />
              <h4 className="ml-2 text-md text-gray-300">8 views</h4>
            </div>

            <article className="m-5 border-1 border-solid border-gray-300">
              <div
                className={
                  showPriceHistory
                    ? "flex rounded-t-md border-solid border-2 border-gray-400 mt-5"
                    : "flex rounded-md border-solid border-2 border-gray-400 mt-5"
                }
              >
                <div className="flex w-full items-center gap-2 m-2 ml-3">
                  <FaChartLine className="w-10 h-10 text-white" />
                  <h3 className="text-md text-white font-semibold flex w-full">
                    Price History
                  </h3>
                  <div className="flex w-full justify-end">
                    {showPriceHistory ? (
                      <FiChevronUp
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowPriceHistory(!showPriceHistory)}
                      />
                    ) : (
                      <FiChevronDown
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowPriceHistory(!showPriceHistory)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {showPriceHistory && (
                <div className="flex rounded-b-md border-solid border-t-0 border-2 border-gray-400">
                  <div className="flex flex-col m-5 min-w-fit justify-center items-center w-full">
                    <img
                      className="w-fit"
                      src="https://testnets.opensea.io/static/images/empty-asks.svg"
                    />
                    <p className="text-gray-300 m-2">No price history yet</p>
                  </div>
                </div>
              )}
              <div
                className={
                  showListings
                    ? "flex rounded-t-md border-solid border-2 border-gray-400 mt-5"
                    : "flex rounded-md border-solid border-2 border-gray-400 mt-5"
                }
              >
                <div className="flex w-full gap-2 m-4">
                  <BsTicket className="w-6 h-6 text-white" />
                  <h3 className="text-md text-white font-semibold">Listings</h3>
                  <div className="flex w-full justify-end">
                    {showListings ? (
                      <FiChevronUp
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowListings(!showListings)}
                      />
                    ) : (
                      <FiChevronDown
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowListings(!showListings)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {showListings && (
                <div className="flex rounded-b-md border-solid border-t-0 border-2 border-gray-400">
                  <div className="flex flex-col m-5 min-w-fit justify-center items-center w-full">
                    <img
                      className="w-fit"
                      src="https://testnets.opensea.io/static/images/empty-bids.svg"
                    />
                    <p className="text-gray-300 m-2">No listings yet</p>
                  </div>
                </div>
              )}
              <div
                className={
                  showOffers
                    ? "flex rounded-t-md border-solid border-2 border-gray-400 mt-5"
                    : "flex rounded-md border-solid border-2 border-gray-400 mt-5"
                }
              >
                <div className="flex w-full gap-2 m-4">
                  <AiOutlineUnorderedList className="w-6 h-6 text-white" />
                  <h3 className="text-md text-white font-semibold">Offers</h3>

                  <div className="flex w-full justify-end">
                    {showOffers ? (
                      <FiChevronUp
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowOffers(!showOffers)}
                      />
                    ) : (
                      <FiChevronDown
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setShowOffers(!showOffers)}
                      />
                    )}
                  </div>
                </div>
              </div>
              {showOffers && (
                <div className="flex rounded-b-md border-solid border-t-0 border-2 border-gray-400">
                  <div className="flex flex-col m-5 min-w-fit justify-center items-center w-full">
                    <img
                      className="w-fit"
                      src="https://testnets.opensea.io/static/images/empty-asks.svg"
                    />
                    <p className="text-gray-300 m-2">No offers yet</p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
        <div className="w-full">
          <article className="m-5 border-1 border-solid border-gray-300">
            <div
              className={
                showItemActivity
                  ? "flex rounded-t-md border-solid border-2 border-gray-400 mt-5"
                  : "flex rounded-md border-solid border-2 border-gray-400 mt-5"
              }
            >
              <div className="flex w-full items-center gap-2 m-2 ml-3">
                <BsArrowDownUp className="w-10 h-10 text-white" />
                <h3 className="text-md text-white font-semibold flex w-full">
                  Item Activity
                </h3>
                <div className="flex w-full justify-end">
                  {showItemActivity ? (
                    <FiChevronUp
                      className="w-6 h-6 text-white cursor-pointer"
                      onClick={() => setShowItemActivity(!showItemActivity)}
                    />
                  ) : (
                    <FiChevronDown
                      className="w-6 h-6 text-white cursor-pointer"
                      onClick={() => setShowItemActivity(!showItemActivity)}
                    />
                  )}
                </div>
              </div>
            </div>
            {showItemActivity && nftActivity && (
              <div className="flex border-solid border-t-0 border-2 border-gray-400">
                <div className="flex flex-wrap  w-full">
                  <table className="table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-white  border-gray-300">
                          Event
                        </th>
                        <th className="px-4 py-2 text-white  border-gray-300">
                          Price
                        </th>
                        <th className="px-4 py-2 text-white  border-gray-300">
                          From
                        </th>
                        <th className="px-4 py-2 text-white  border-gray-300">
                          To
                        </th>
                        <th className="px-4 py-2 text-white  border-gray-300">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {nftActivity.map((event, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-gray-300 flex justify-center items-center">
                            {event.type === "Sale" && (
                              <div className="flex gap-2">
                                <BsCart2 className="w-5 h-5 text-white" />
                                <p>Sale</p>
                              </div>
                            )}
                            {event.type === "Transfer" && (
                              <div className="flex gap-2">
                                <CgArrowsH className="w-5 h-5 text-white" />
                                <p>Transfer</p>
                              </div>
                            )}
                            {event.type === "Minted" && (
                              <div className="flex gap-2">
                                <BsStars className="w-5 h-5 text-white" />
                                <p>Minted</p>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-2  text-gray-300 text-center">
                            {event.price}
                          </td>
                          <td className="px-4 py-2  text-gray-300 text-center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${event.from}`}
                              className="text-md text-blue-500"
                              target="_blank"
                            >
                              {compareStringsIgnoreCase(event.from, address)
                                ? "you"
                                : formatEthereumAddress(event.from)}
                            </a>
                          </td>
                          <td className="px-4 py-2  text-gray-300 text-center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${event.to}`}
                              className="text-md text-blue-500"
                              target="_blank"
                            >
                              {compareStringsIgnoreCase(event.to, address)
                                ? "you"
                                : formatEthereumAddress(event.to)}
                            </a>
                          </td>
                          <td className="px-4 py-2 text-gray-300 flex justify-center items-center">
                            <div className="flex gap-2">
                              {event.date}
                              <a
                                href={`https://mumbai.polygonscan.com/tx/${event.txHash}`}
                                target="_blank"
                              >
                                <TfiNewWindow className="w-5 h-5 text-blue-500" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default NftDetails;
