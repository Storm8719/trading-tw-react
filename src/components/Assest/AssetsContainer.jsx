import React from "react";
import Assets from "./Assets";
import {connect} from "react-redux";
import {setCurrentAssetAll, subscribeAcceptData} from "../../redux/assets-reducer";

class AssetsContainer extends React.Component{
    render() {
        // debugger;
        return <Assets {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    assets : state.assets.assets,
    currentAsset: state.assets.currentAssetId,
});


export default connect(mapStateToProps, {setCurrentAssetAll, subscribeAcceptData})(AssetsContainer);
