import WebsocketAPI from "../api/ws";
import {setCurrentChartData} from "./chart-reducer";

const SET_CURRENT_ASSET = 'ASSETS_REDUCER_SET_CURRENT_ASSET';
const UPDATE_CURRENT_ASSETS = 'ASSETS_REDUCER_UPDATE_CURRENT_ASSETS';

let initialState = {
    assets: [
        {id: 1, name: 'AUD/USD', salePrice: 22, buyPrice: 31},
        {id: 2, name: 'USDT/USD', salePrice: 32, buyPrice: 34},
        {id: 3, name: 'BTC/USD', salePrice: 12564, buyPrice: 13665},
        {id: 4, name: 'ETH/USD', salePrice: 2454, buyPrice: 3695},
        {id: 5, name: 'TRX/USD', salePrice: 1, buyPrice: 2},
        {id: 6, name: 'BNB/USD', salePrice: 4, buyPrice: 5},
        {id: 7, name: 'USDC/USD', salePrice: 7, buyPrice: 8},
    ],
    currentAssetId: 5
};

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ASSET:
            console.log(state);
            return {
                ...state,
                currentAssetId: action.assetId
            };
        case UPDATE_CURRENT_ASSETS:
            return {
                ...state,
                assets: [...action.assets]
            }
        default:
            return state;
    }
}

export const setCurrentAssetId = (assetId) => ({type: SET_CURRENT_ASSET, assetId:assetId});
export const updateCurrentAssets = (assetsArr) => ({type: UPDATE_CURRENT_ASSETS, assets:assetsArr});


export const setCurrentAssetAll = (assetId) => async (dispatch) => {
    const ws = new WebsocketAPI;
    const initialData = await ws.getInitialDataForAsset();
    dispatch(setCurrentChartData(initialData));
    dispatch(setCurrentAssetId(assetId));
}
// export const subscribeAcceptData = () => (dispatch) => {
//     const ws = new WebsocketAPI;
//     ws.subscribeOnAssets((assetArr) => {
//         // dispatch(setCurrentAsset(assetId));
//         dispatch(updateCurrentAssets(assetArr));
//     })
// }
//
// export const unsubscribeAcceptData = () => {
//     const ws = new WebsocketAPI;
//     ws.unsubscribeFromAssets();
// }

export default assetsReducer;