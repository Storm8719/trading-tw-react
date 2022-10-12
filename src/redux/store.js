import {applyMiddleware, combineReducers, createStore} from "redux";
import assetsReducer from "./assets-reducer";
import chartReducer from "./chart-reducer";
import thunkMiddleware from "redux-thunk";
import investmentsReducer from "./investments-reducer";

let reducers = combineReducers({
    assets: assetsReducer,
    chart:chartReducer,
    investments: investmentsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;