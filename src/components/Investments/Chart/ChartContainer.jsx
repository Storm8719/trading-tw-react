import React from "react";
import {connect} from "react-redux";
import {unsubscribeOnAssetData} from "../../../redux/chart-reducer";
import ChartCandlestick from "./Chart";


let mapStateToProps = (state) => ({
    candles:state.chart.candles,
    visualOptions: state.chart.visualOptions,
    currentInstrumentInfo: state.investments.currentInstrumentInfo,
    favoriteFigi: state.investments.favoriteFigi
});


export default connect(mapStateToProps, {unsubscribeOnAssetData})(ChartCandlestick);