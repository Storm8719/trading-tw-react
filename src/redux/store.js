import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import assetsReducer from "./assets-reducer";
import chartReducer from "./chart-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    assets: assetsReducer,
    chart:chartReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;


export default store;