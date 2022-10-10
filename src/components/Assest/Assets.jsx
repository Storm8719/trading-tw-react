import React, {useEffect} from "react";

const Assets = (props) => {
    // let currentAsset = props.assets.filter(e => e.id === props.currentAsset)[0];
    // const [initialized, setInit] = useState(false);


    let assetsList = props.assets.map(e =>
        e.id === props.currentAsset ?
            <div className={'asset-'+e.status} key={e.id}><b>{e.from} / {e.to} {e.salePrice} {e.buyPrice}</b></div> :
            <div className={'asset-'+e.status} onClick={() => props.setCurrentAssetAll(e.id)} key={e.id}>{e.from} / {e.to} {e.salePrice} {e.buyPrice}</div>)

    useEffect(
        () => {
            console.log("initialyzeAssetsList!")
            props.initialyzeAssetsList();
        },[])
    return <div>
        {assetsList.length > 0 ? assetsList : <div>Loading... </div>}
        <button onClick={props.subscribeAcceptData}>start</button>
        <button onClick={props.unsubscribeAcceptData}>stop</button>
    </div>
}

export default Assets;