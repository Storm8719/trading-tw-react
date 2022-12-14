import React from "react";
import Assets from "./Assets";
import {connect} from "react-redux";
import {initialyzeAssetsList, setCurrentAssetId} from "../../../redux/assets-reducer";

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


export default connect(mapStateToProps, {initialyzeAssetsList, setCurrentAssetId})(AssetsContainer);
