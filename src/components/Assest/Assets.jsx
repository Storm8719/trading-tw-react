import React, {useEffect} from "react";

const Assets = (props) => {
    let assetsList = props.assets.map(e =>
        e.id === props.currentAsset ?
            <div className={'asset-'+e.status} key={e.id}><b>{e.from} / {e.to} {e.salePrice} {e.buyPrice}</b></div> :
            <div className={'asset-'+e.status} onClick={() => props.setCurrentAssetId(e.id)} key={e.id}>{e.from} / {e.to} {e.salePrice} {e.buyPrice}</div>
    )

    useEffect(
        () => {
            console.log("initialyzeAssetsList!")
            props.initialyzeAssetsList();
        },[])

    return <div>
        {assetsList.length > 0 ? assetsList : <div>Loading... </div>}
    </div>
}

export default Assets;