import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreateNFT />} />
            <Route
              exact
              path="/explore"
              element={<NftView nftList={nftList} />}
            />
            <Route path="/nft_details/?NFT:nft_id" element={<NftDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div> */}
        {/* <h1>hello</h1> */}
        <Home />
      </div>
    </Router>
  );
}

export default App;
