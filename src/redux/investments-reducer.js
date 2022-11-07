import {tinkoffApi} from "../api/api";
import {setCurrentChartData} from "./chart-reducer";

const SET_CURRENT_INSTRUMENT_FIGI = 'INVEST_REDUCER_SET_CURRENT_INSTRUMENT_FIGI';
const SET_SHARES = 'INVEST_REDUCER_SET_SHARES';
const SET_SECTORS = 'INVEST_REDUCER_SET_SECTORS';
// const SET_CANDLES = 'INVEST_REDUCER_SET_CANDLES';

let initialState = {
    currentInstrumentFigi: null,
    content: [
        // {id: 1, from: 'BTC', to:"USD"}
    ],
    // candles:[],
    shares:[],
    sectors:[],
};

const investmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INSTRUMENT_FIGI:
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
        // case SET_CANDLES:
        //     return {
        //         ...state,
        //         candles: [...action.candles]
        //     }
        default:
            return state;
    }
}


export const setCurrentInstrumentFigi = (instrumentFigi) => ({type: SET_CURRENT_INSTRUMENT_FIGI, instrumentFigi:instrumentFigi});
export const setShares = (shares) => ({type:SET_SHARES, shares});
export const setSectors = (sectors) => ({type:SET_SECTORS, sectors});
// export const setCandles = (candles) => ({type:SET_CANDLES, candles});

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
    setCurrentInstrumentFigi(figi);
    dispatch(setCurrentChartData([]));
    const candles = await tinkoffApi.getCandles(figi);
    dispatch(setCurrentChartData(candles));
}


export default investmentsReducer;