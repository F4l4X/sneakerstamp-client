import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ChainId,
  ThirdwebProvider,
  metamaskWallet,
  ThirdwebSDKProvider,
} from "@thirdweb-dev/react";

import {
  ThirdwebStorage,
  StorageDownloader,
  IpfsUploader,
} from "@thirdweb-dev/storage";
import { Mumbai } from "@thirdweb-dev/chains";

import App from "./App";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const gatewayUrls = {
  "ipfs://": ["https://ipfs.thirdwebstorage.com/ipfs/"],
};
const downloader = new StorageDownloader();
const uploader = new IpfsUploader();
const storage = new ThirdwebStorage({ uploader, downloader, gatewayUrls });

root.render(
  <ThirdwebProvider
    supportedWallets={[metamaskWallet()]}
    activeChain="mumbai"
    dAppMeta={{
      name: "SneakerStamp",
      description: "Dapp markerplace of real sneakers on Polygon blockchain",
      url: "http://sneakerstamp.com",
    }}
    storageInterface={storage}
  >
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
);
