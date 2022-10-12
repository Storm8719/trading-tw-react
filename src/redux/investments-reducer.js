import {tinkoffApi} from "../api/api";

const SET_CURRENT_ASSET = 'ASSETS_REDUCER_SET_CURRENT_ASSET';

let initialState = {
    content: [
        // {id: 1, from: 'BTC', to:"USD"}
    ],
};

const investmentsReducer = (state = initialState, action) => {
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

// export const updateCurrentAssets = (assetsArr) => ({type: UPDATE_CURRENT_ASSETS, assets:assetsArr});

export const getAccountsList = () => async (dispatch) => {
    const accountsList = tinkoffApi.getAccountsList();
    console.dir(accountsList);
    // return accountsList;
}

// export const initialyzeAssetsList = () => async (dispatch) => {
//     const assetsList = await quotesApi.getCryptoAssetsList();
//     dispatch(updateCurrentAssets(assetsList.data));
//     dispatch(setCurrentAssetId(assetsList.data[0].id));
// }

export default investmentsReducer;