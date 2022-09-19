import WebsocketAPI from "../api/ws";

const SET_CURRENT_ASSET = 'SET_CURRENT_ASSET';

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
            return {
                ...state,
                currentAssetId: action.assetId
            };
        default:
            return state;
    }
}

export const setCurrentAsset = (assetId) => ({type: SET_CURRENT_ASSET, assetId:assetId});

export const subscribeAcceptData = () => (dispatch) => {
    const ws = new WebsocketAPI;
    ws.subscribe((assetId) => {
        dispatch(setCurrentAsset(assetId))
    })
}

export const unsubscribeAcceptData = () => {
    const ws = new WebsocketAPI;
    ws.unsubscribe();
}

export default assetsReducer;