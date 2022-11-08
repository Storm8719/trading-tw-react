import React, {useEffect, useRef, useState} from 'react';
import { createChart } from 'lightweight-charts';
import {quotesApi} from "../../../api/api";
import s from './Chart.module.css'
// import WebsocketAPI from "../../../api/ws";


export const ChartCandlestick = (props) => {
    console.log(props);
    const {
        candles,
        currentInstrumentInfo,
        visualOptions: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        },
    } = props;
    const chartContainerRef = useRef();

    // const [state, setState] = useState({initialized:false});


    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: (chartContainerRef.current.clientWidth /2 ) });
            };

            // const ws = new WebsocketAPI();

            const chart = createChart(chartContainerRef.current, {


                width: chartContainerRef.current.clientWidth,
                // width: 600,
                height: (chartContainerRef.current.clientWidth /2 ),
                timeScale: {
                    timeVisible: true,
                    // secondsVisible: false,
                },
                layout: {
                    backgroundColor: backgroundColor,
                    textColor: textColor,
                },
                crosshair: {
                    vertLine: {
                        width: 3,
                        color: 'rgba(224, 227, 235, 0.1)',
                        style: 0,
                    },
                    horzLine: {
                        visible: true,
                        labelVisible: true,
                        width: 3,
                        color: 'rgba(224, 227, 235, 0.1)',
                        style: 0,
                    },

                },
                grid: {
                    vertLines: {
                        color: 'rgba(55, 61, 75, 0.2)',
                    },
                    horzLines: {
                        color: 'rgba(55, 61, 75, 0.2)',
                    },
                },
            });
            console.log('redraw TV chart');
            // chart.timeScale().fitContent(); //ITimeScaleApi

            const newSeries = chart.addCandlestickSeries();
            newSeries.setData(candles);
            // newSeries.setData(data);
            // const ws = new WebsocketAPI();

            // if(!state.initialized){
            //     props.setCurrentAssetAll(currentAssetId);
            //     setState({initialized:true});
            // }
            // quotesApi.getQuotes('USD', currentAssetId).then((chartData) => {
            //     newSeries.setData(chartData.data);
            // })




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
        [ candles, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );
    console.log('redraw chart component');
    return (
        <div className={s.chartBox}>
            <h2>{currentInstrumentInfo.name} [{currentInstrumentInfo.ticker}]</h2>
            <div
                ref={chartContainerRef}
            />
            <button onClick={props.unsubscribeOnAssetData}>Unsubscribe</button>
        </div>
    );
};

export default ChartCandlestick;