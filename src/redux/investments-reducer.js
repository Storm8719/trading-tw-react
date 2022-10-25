import {tinkoffApi} from "../api/api";

const SET_CURRENT_INSTRUMENT = 'INVEST_REDUCER_SET_CURRENT_INSTRUMENT';
const SET_SHARES = 'INVEST_REDUCER_SET_SHARES';
const SET_SECTORS = 'INVEST_REDUCER_SET_SECTORS';

let initialState = {
    currentInstrumentFigi: null,
    content: [
        // {id: 1, from: 'BTC', to:"USD"}
    ],
    shares:[],
    sectors:[],
};

const investmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INSTRUMENT:
            return {
                ...state,
                currentInstrumentFigi: action.instrumentFigi
            };
        case SET_SHARES:
            return {
                ...state,
                shares: action.shares
            }
        case SET_SECTORS:
            return {
                ...state,
                sectors: [...action.sectors]
            }
        default:
            return state;
    }
}

// export const updateCurrentAssets = (assetsArr) => ({type: UPDATE_CURRENT_ASSETS, assets:assetsArr});
export const setCurrentInstrument = (instrumentFigi) => ({type: SET_CURRENT_INSTRUMENT, instrumentFigi:instrumentFigi});
export const setShares = (shares) => ({type:SET_SHARES, shares});
export const setSectors = (sectors) => ({type:SET_SECTORS, sectors});

export const getAccountsList = () => async (dispatch) => {
    const accountsList = tinkoffApi.getAccountsList();
    console.dir(accountsList);
    // return accountsList;
}

export const initializeShares = () => async (dispatch) => {
    const shares = await tinkoffApi.getShares();
    const sectors = [];
    shares.forEach(value => sectors.indexOf(value.sector) === -1 ? sectors.push(value.sector) : null);
    dispatch(setSectors(sectors));
    dispatch(setShares(shares));
    dispatch(setCurrentInstrument(shares[0].figi));

    console.log('Shares:');
    console.log(shares);
}

// export const initialyzeAssetsList = () => async (dispatch) => {
//     const assetsList = await quotesApi.getCryptoAssetsList();
//     dispatch(updateCurrentAssets(assetsList.data));
//     dispatch(setCurrentAssetId(assetsList.data[0].id));
// }

export default investmentsReducer;