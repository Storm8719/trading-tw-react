import React from "react";
import Assets from "./Assets";
import {connect} from "react-redux";
import {setCurrentAsset} from "../../redux/assets-reducer";

class AssetsContainer extends React.Component{
    render() {
        return <Assets />
    }
}

let mapStateToProps = (state) => ({
    assets : state.assets,
    currentAsset: state.currentAssetId,
});


export default connect(mapStateToProps, {setCurrentAsset})(AssetsContainer);
