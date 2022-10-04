import React from "react";
import {setCurrentAssetAll} from "../../redux/assets-reducer";
import {subscribeAcceptData, setCurrentAsset} from "../../redux/assets-reducer";

const Assets = (props) => {
    // let currentAsset = props.assets.filter(e => e.id === props.currentAsset)[0];
    let assetsList = props.assets.map(e =>
        e.id === props.currentAsset ?
            <div className={'asset-'+e.status} key={e.id}><b>{e.name} {e.salePrice} {e.buyPrice}</b></div> :
            <div className={'asset-'+e.status} onClick={() => props.setCurrentAssetAll(e.id)} key={e.id}>{e.name} {e.salePrice} {e.buyPrice}</div>)
    return <div>
        {assetsList}
        <button onClick={props.subscribeAcceptData}>start</button>
        <button onClick={props.unsubscribeAcceptData}>stop</button>
    </div>
}

export default Assets;