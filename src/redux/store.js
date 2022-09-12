import {combineReducers, createStore} from "redux";
import assetsReducer from "./assets-reducer";
import chartReducer from "./chart-reducer";

let reducers = combineReducers({
    assets: assetsReducer,
    chart:chartReducer,
});

let store = createStore(reducers);

window.store = store;


export default store;