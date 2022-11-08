import React from "react";
import {connect} from "react-redux";
import {unsubscribeOnAssetData} from "../../../redux/chart-reducer";
import ChartCandlestick from "./Chart";


let mapStateToProps = (state) => ({
    candles:state.chart.candles,
    visualOptions: state.chart.visualOptions,
    // currentInstrumentFigi: state.investments.currentInstrumentInfo.figi,
    currentInstrumentInfo: state.investments.currentInstrumentInfo,
});


export default connect(mapStateToProps, {unsubscribeOnAssetData})(ChartCandlestick);