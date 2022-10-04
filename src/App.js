import logo from './logo.svg';
import './App.css';
import AssetsContainer from "./components/Assest/AssetsContainer";
import React from "react";
import ChartContainer from "./components/Chart/ChartContainer";
import {AppTest} from "./components/Chart/ChartTest";

function App() {
    const pr = {
        colors:{
            backgroundColor: 'white',
            lineColor: '#2962FF',
            textColor: 'black',
        }
    }
  return (
    <div className="app-container">
      {/*<header className="App-header">*/}
        <AssetsContainer/>
        <AppTest props={pr} />
        {/*<ChartContainer />*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
