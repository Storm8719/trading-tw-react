import WebsocketAPI from "../api/ws";

const SET_CURRENT_CHART_DATA = 'SET_CURRENT_CHART_DATA';

let initialState = {
    candles:[
    ],
    visualOptions:{
        backgroundColor: '#2A2E39',
        lineColor: '#ffffff',
        textColor: 'white',
        areaTopColor : '#ff2929',
        areaBottomColor : 'rgba(0,0,0,0.89)',
    }
};

const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CHART_DATA:
            return {
                ...state,
                candles: action.candles,
            };
        default:
            return state;
    }
}

export const setCurrentChartData = (candles) => ({type:SET_CURRENT_CHART_DATA, candles})

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