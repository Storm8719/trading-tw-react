const SET_CURRENT_ASSET = 'SET_CURRENT_ASSET';

let initialState = {
    currentAssetId: 1,
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
        { time: '2020-12-31', value: 22.67 },
    ],
    currentAssetName:"AUD/USD",
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
        case SET_CURRENT_ASSET:
            return {
                ...state,
                assetName: action.assetName,
                currentAssetId:action.assetId,
            };
        default:
            return state;
    }
}

export const setCurrentAsset = (assetId, assetName) => ({type: SET_CURRENT_ASSET, assetId:assetId, assetName:assetName})

export default chartReducer;