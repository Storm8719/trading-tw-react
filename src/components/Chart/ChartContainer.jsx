import React from "react";
import Chart from "./Chart";
import {connect} from "react-redux";
import {setCurrentAssetAll} from "../../redux/assets-reducer";

class ChartContainer extends React.Component{

    render() {
        return <Chart {...this.props} />
    }
}


let mapStateToProps = (state) => ({
    data:state.chart.data,
    visualOptions: state.chart.visualOptions,
    currentAssetId: state.assets.currentAssetId,
});


export default connect(mapStateToProps, {setCurrentAssetAll})(ChartContainer);