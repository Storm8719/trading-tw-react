// import WebsocketAPI from "../api/ws";
// import {updateCurrentAssets} from "./assets-reducer";

// const SET_CURRENT_ASSET = 'CHART_REDUCER_SET_CURRENT_ASSET';
const SET_CURRENT_CHART_DATA = 'SET_CURRENT_CHART_DATA';
// const ADD_NEW_DATA = "CHART_REDUCER_ADD_NEW_DATA";

let initialState = {
    data:[
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
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