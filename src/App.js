import logo from './logo.svg';
import './App.css';
import AssetsContainer from "./components/Assest/AssetsContainer";
import React from "react";
import ChartContainer from "./components/Chart/ChartContainer";

function App() {
  return (
    <div className="app-container">
      {/*<header className="App-header">*/}
        <AssetsContainer/>
        <ChartContainer />
      {/*</header>*/}
    </div>
  );
}

export default App;
