import React from "react";
import Chart from "./Chart";
import {connect} from "react-redux";
import {unsubscribeOnAssetData} from "../../../redux/chart-reducer";
import {ChartCandlestick} from "./ChartCandlestick";

class ChartContainer extends React.Component{

    render() {
        return <ChartCandlestick {...this.props} />
    }
}


let mapStateToProps = (state) => ({
    data:state.chart.data,
    visualOptions: state.chart.visualOptions,
    currentAssetId: state.assets.currentAssetId,
});


export default connect(mapStateToProps, {unsubscribeOnAssetData})(ChartContainer);