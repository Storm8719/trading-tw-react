import {tinkoffApi} from "../api/api";
import {setCurrentChartData} from "./chart-reducer";

const SET_CURRENT_INSTRUMENT_INFO = 'INVEST_REDUCER_SET_CURRENT_INSTRUMENT_INFO';
const SET_SHARES = 'INVEST_REDUCER_SET_SHARES';
const SET_SECTORS = 'INVEST_REDUCER_SET_SECTORS';

let initialState = {
    currentInstrumentInfo: {
        figi:null,
        ticker:null,
        isin:null,
        minPriceIncrement: null,
        lot:null,
        currency:null,
        name:null,
        type:null,
    },
    content: [
        // {id: 1, from: 'BTC', to:"USD"}
    ],
    shares:[],
    sectors:[],
};

const investmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INSTRUMENT_INFO:
            return {
                ...state,
                currentInstrumentInfo: {...state.shares.filter(e => e.figi === action.instrumentFigi)[0]},
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


export const setCurrentInstrumentInfo = (instrumentFigi) => ({type: SET_CURRENT_INSTRUMENT_INFO, instrumentFigi});
export const setShares = (shares) => ({type:SET_SHARES, shares});
export const setSectors = (sectors) => ({type:SET_SECTORS, sectors});

export const getAccountsList = () => async (dispatch) => {
    const accountsList = tinkoffApi.getAccountsList();
    console.dir(accountsList);
}

export const initializeShares = () => async (dispatch) => {
    const shares = await tinkoffApi.getShares();
    dispatch(setShares(shares));
    dispatch(setCurrentInstrument(shares[0].figi));
}


export const setCurrentInstrument = (figi) => async (dispatch) => {
    dispatch(setCurrentInstrumentInfo(figi));
    // dispatch(setCurrentChartData([]));
    const candles = await tinkoffApi.getCandles(figi);
    dispatch(setCurrentChartData(candles));
}


export default investmentsReducer;