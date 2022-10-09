// import WebsocketAPI from "../api/ws";
// import {updateCurrentAssets} from "./assets-reducer";

// const SET_CURRENT_ASSET = 'CHART_REDUCER_SET_CURRENT_ASSET';
import WebsocketAPI from "../api/ws";

const SET_CURRENT_CHART_DATA = 'SET_CURRENT_CHART_DATA';
// const ADD_NEW_DATA = "CHART_REDUCER_ADD_NEW_DATA";

let initialState = {
    data:[
    ],
    visualOptions:{
        backgroundColor: 'black',
        lineColor: '#ffffff',
        textColor: 'white',
        areaTopColor : '#ff2929',
        areaBottomColor : 'rgba(0,0,0,0.89)',
    }
};

const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SET_CURRENT_ASSET:
        //     console.log(state);
        //     return {
        //         ...state,
        //         currentAssetName: action.assetName,
        //         currentAssetId:action.assetId,
        //     };
        case SET_CURRENT_CHART_DATA:
            return {
                ...state,
                data: action.data,
            };
        // case ADD_NEW_DATA:
        //     return {
        //         ...state,
        //         data: [...state.data, action.data],
        //     };
        default:
            return state;
    }
}

export const setCurrentChartData = (data) => ({type:SET_CURRENT_CHART_DATA, data:data})
// export const addNewData = (data) => ({type:ADD_NEW_DATA, data:data})

export const unsubscribeOnAssetData = (assetId) => (dispatch) =>{
    (new WebsocketAPI()).unsubscribeOnAssetData(assetId);
}

// export const subscribeAcceptData = (assetId = 1) => (dispatch) => {
//     const ws = new WebsocketAPI;
//
//     dispatch(setCurrentData(ws.getInitialDataForAsset(assetId)));
//
//     ws.subscribeOnAssetData(assetId, (data) => {
//         // dispatch(setCurrentAsset(assetId));
//         dispatch(addNewData(data));
//     })
// }
//
// export const unsubscribeAcceptData = (assetId) => (dispatch) => {
//     const ws = new WebsocketAPI;
//     ws.unsubscribeOnAssetData(assetId);
// }

export default chartReducer;