import {tinkoffApi} from "../api/api";
import WebsocketAPI from "../api/ws";

const SET_CURRENT_ACCOUNT = 'ACCOUNTS_REDUCER_SET_CURRENT_ACCOUNT';
const SET_ACCOUNTS_LIST = 'ACCOUNTS_REDUCER_SET_ACCOUNTS_LIST';


let initialState = {
    currentAccountId: null,
    accountsList: null,
};

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ACCOUNT:
            return {
                ...state,
                currentAccountId: action.accountId,
            };
        case SET_ACCOUNTS_LIST:
            return {
                ...state,
                accountsList: action.accountsList
            }
        default:
            return state;
    }
}


export const setCurrentAccount = (accountId) => ({type: SET_CURRENT_ACCOUNT, accountId});
export const setAccountsList = (accountsList) => ({type: SET_ACCOUNTS_LIST, accountsList});

export const initializeAccounts = () => async (dispatch) => {
    const accounts = await tinkoffApi.getAccountsList();
    dispatch(setAccountsList(accounts));
    console.log("init accounts");
}

export const createSandboxAccount = () => async (dispatch) => {
    const newAccount = await tinkoffApi.createSandboxAccount();
    newAccount ? initializeAccounts() : console.error("account not created")
}

export const deleteSandboxAccount = (accountId) => async (dispatch) => {
    await tinkoffApi.deleteSandboxAccount(accountId);
    initializeAccounts();
}

export default accountsReducer;