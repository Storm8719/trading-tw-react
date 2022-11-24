import {tinkoffApi} from "../api/api";
import {setCurrentChartData} from "./chart-reducer";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SET_CURRENT_INSTRUMENT_INFO = 'INVEST_REDUCER_SET_CURRENT_INSTRUMENT_INFO';
const SET_SHARES = 'INVEST_REDUCER_SET_SHARES';
const SET_SECTORS = 'INVEST_REDUCER_SET_SECTORS';
const SET_FAVORITE_FIGI = 'INVEST_REDUCER_SET_FAVORITE_FIGI';
const REMOVE_FAVORITE_FIGI = 'INVEST_REDUCER_REMOVE_FAVORITE_FIGI';

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
    favoriteFigi: cookies.get('favoriteFigi')
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
        case SET_FAVORITE_FIGI:
            const date = new Date();
            date.setTime(date.getTime() + (30*24*60*60*1000));
            cookies.set('favoriteFigi', action.figi, { path: '/', expires: date })
            return {
                ...state,
                favoriteFigi: action.figi
            }
        case REMOVE_FAVORITE_FIGI:
            cookies.remove('favoriteFigi');
            return {
                ...state,
                favoriteFigi: null
            }
        default:
            return state;
    }
}


export const setCurrentInstrumentInfo = (instrumentFigi) => ({type: SET_CURRENT_INSTRUMENT_INFO, instrumentFigi});
export const setShares = (shares) => ({type:SET_SHARES, shares});
export const setSectors = (sectors) => ({type:SET_SECTORS, sectors});
export const setFavoriteFigi = (figi) => ({type:SET_FAVORITE_FIGI, figi});
export const removeFavoriteFigi = () => ({type: REMOVE_FAVORITE_FIGI});

export const getAccountsList = () => async (dispatch) => {
    const accountsList = tinkoffApi.getAccountsList();
    console.dir(accountsList);
}

export const initializeShares = () => async (dispatch) => {
    const shares = await tinkoffApi.getShares();
    dispatch(setShares(shares));
    dispatch(setCurrentInstrument((initialState.favoriteFigi && shares.some(share => share.figi === initialState.favoriteFigi)) ? initialState.favoriteFigi : shares[0].figi));
}


export const setCurrentInstrument = (figi) => async (dispatch) => {
    dispatch(setCurrentInstrumentInfo(figi));
    // dispatch(setCurrentChartData([]));
    const candles = await tinkoffApi.getCandles(figi);
    dispatch(setCurrentChartData(candles));
    const previusCandles = await tinkoffApi.getCandlesFor3LastDays(figi);
}


export default investmentsReducer;