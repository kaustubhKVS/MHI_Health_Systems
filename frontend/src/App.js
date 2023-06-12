import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ExplorePatients from "./components/ExplorePatients";
import CreatePrediction from "./components/CreatePrediction";

import ImageTrain from "./components/ImageTrain";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreatePrediction />} />
            <Route exact path="/explore" element={<ExplorePatients />} />
            <Route exact path="/image_test" element={<ImageTrain />} />
            {/* <Route exact path="/explore_patient" element={<ImageTest />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
