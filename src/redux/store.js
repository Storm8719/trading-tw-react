import {applyMiddleware, combineReducers, createStore} from "redux";
import assetsReducer from "./assets-reducer";
import chartReducer from "./chart-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    assets: assetsReducer,
    chart:chartReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;