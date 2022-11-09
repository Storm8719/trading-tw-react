import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Crypto from "./components/Сrypto/Crypto";
import Investments from "./components/Investments/Investments";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="app-container">
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/crypto" element={<Crypto />} />
            <Route exact path="/investments" element={<Investments />} />
        </Routes>
    </div>
  );
}

export default App;
