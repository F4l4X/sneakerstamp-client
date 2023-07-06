import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  GenerateNft,
  Hero,
  Marketplace,
  MintNft,
  ContactUs,
  Profile,
  NftDetails,
} from "./pages";
import { Navbar } from "./components";
import Cgu from "./pages/Cgu";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/mint-nft" element={<MintNft />} />
        <Route path="/generate-nft" element={<GenerateNft />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile/:address" element={<Profile />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route
          path="/assets/:contractAddress/:tokenId"
          element={<NftDetails />}
        />
      </Routes>
    </div>
  );
};

/*
<div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Routes>
          <Route path='/' element={<Hero />}/>
        </Routes>
      </div>
*/
export default App;
