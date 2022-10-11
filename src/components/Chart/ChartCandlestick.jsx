import React, {useEffect, useRef, useState} from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import WebsocketAPI from "../../api/ws";
import {quotesApi} from "../../api/api";


export const ChartCandlestick = (props) => {
    console.log(props);
    const {
        data,
        currentAssetId,
        visualOptions: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        },
    } = props;
    const chartContainerRef = useRef();

    const [state, setState] = useState({initialized:false});


    useEffect(
         () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {


                width: chartContainerRef.current.clientWidth,
                height: 400,
            });
            console.log('redraw TV chart');
            chart.timeScale().fitContent();

            const newSeries = chart.addCandlestickSeries();
             // newSeries.setData(data);
            // const ws = new WebsocketAPI();

            // if(!state.initialized){
            //     props.setCurrentAssetAll(currentAssetId);
            //     setState({initialized:true});
            // }
            quotesApi.getQuotes('USD', currentAssetId).then((chartData) => {
                newSeries.setData(chartData.data);
            })




            // ws.subscribeOnAssetData(currentAssetId,(data) => {
            //     newSeries.update(data);
            // });

            window.addEventListener('resize', handleResize);

            return () => {
                // ws.unsubscribeOnAssetData(currentAssetId);
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [currentAssetId, data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );
    console.log('redraw chart component');
    return (
        <>
            <h1>assetID: {currentAssetId}</h1>
            <div
                ref={chartContainerRef}
            />
            <button onClick={props.unsubscribeOnAssetData}>Unsubscribe</button>
        </>
    );
};

export default ChartCandlestick;