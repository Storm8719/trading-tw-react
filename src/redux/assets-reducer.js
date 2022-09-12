const SET_CURRENT_ASSET = 'SET_CURRENT_ASSET';

let initialState = {
    assets: [
        {id: 1, name: 'AUD/USD'},
    ],
    currentAssetId: null
};

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ASSET:
            return {
                ...state,
                newMessageBody: action.body
            };
        default:
            return state;
    }
}

export const setCurrentAsset = (assetId) => ({type: SET_CURRENT_ASSET, assetId:assetId})

export default assetsReducer;