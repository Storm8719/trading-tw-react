import {quotesApi} from "../api/api";

const SET_CURRENT_ASSET = 'ASSETS_REDUCER_SET_CURRENT_ASSET';
const UPDATE_CURRENT_ASSETS = 'ASSETS_REDUCER_UPDATE_CURRENT_ASSETS';

let initialState = {
    assets: [
        // {id: 1, from: 'BTC', to:"USD"}
    ],
    currentAssetId: 1
};

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ASSET:
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


export const initialyzeAssetsList = () => async (dispatch) => {
    const assetsList = await quotesApi.getCryptoAssetsList();
    dispatch(updateCurrentAssets(assetsList.data));
    dispatch(setCurrentAssetId(assetsList.data[0].id));
}

// export const setCurrentAssetAll = (assetId) => async (dispatch) => {
//     const initialData = await (new WebsocketAPI()).getInitialDataForAsset();
//     dispatch(setCurrentChartData(initialData));
//     dispatch(setCurrentAssetId(assetId));
// }
// export const subscribeAcceptData = () => (dispatch) => {
//     (new WebsocketAPI()).subscribeOnAssets((assetArr) => {
//         // dispatch(setCurrentAsset(assetId));
//         dispatch(updateCurrentAssets(assetArr));
//     })
// }
// export const unsubscribeAcceptData = () => (dispatch) =>  {
//     (new WebsocketAPI()).unsubscribeFromAssets();
// }

export default assetsReducer;