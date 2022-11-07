import React, {useEffect} from "react";
import {connect} from "react-redux";
import {unsubscribeOnAssetData} from "../../../redux/chart-reducer";
import ChartCandlestick from "./Chart";


let mapStateToProps = (state) => ({
    candles:state.chart.candles,
    visualOptions: state.chart.visualOptions,
    currentAssetId: state.assets.currentAssetId,
});


export default connect(mapStateToProps, {unsubscribeOnAssetData})(ChartCandlestick);