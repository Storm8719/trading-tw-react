import React, {useEffect, useRef, useState} from 'react';
import { createChart } from 'lightweight-charts';
import {quotesApi, tinkoffApi} from "../../../api/api";
import s from './Chart.module.css'
import WebsocketAPI from "../../../api/ws";
import AddToFavoriteButton from "../ChartHeader/AddToFavoriteButton/AddToFavoriteButton";
import ChartHeader from "../ChartHeader/ChartHeader";
import {convertOneCandleData} from "../../../helpers/helpers";


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
            console.log('redraw TV chart');

            // const ws = new WebsocketAPI();

            const chart = createChart(chartContainerRef.current, {


                width: chartContainerRef.current.clientWidth,
                // width: 600,
                height: (chartContainerRef.current.clientWidth /2 ),
                timeScale: {
                    timeVisible: true,
                    // fixLeftEdge: true,
                    fixRightEdge: true,
                    rightBarStaysOnScroll: true
                    // secondsVisible: false,
                },
                handleScale:{
                    // kineticScroll:{
                    //     mouse: false
                    // },
                    // mouseWheel:false,
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

            // chart.timeScale().fitContent(); //ITimeScaleApi

            function myVisibleLogicalRangeChangeHandler(newVisibleLogicalRange) {
                if (newVisibleLogicalRange === null) {
                    // handle null
                }
                console.log(newVisibleLogicalRange)

                // handle new logical range
            }

            chart.timeScale().subscribeVisibleLogicalRangeChange(myVisibleLogicalRangeChangeHandler);

            let newSeries = chart.addCandlestickSeries();

            // chart.timeScale().timeToCoordinate()

            console.log(candles)
            newSeries.setData(candles);

            if(currentInstrumentInfo.figi){

                setTimeout(async ()=>{

                    const candles2 = await tinkoffApi.getCandles("BBG004730JJ5", '-1d', '1min', 1668016020);

                    chart.removeSeries(newSeries);
                    const newSeries2 = chart.addCandlestickSeries();
                    newSeries2.setData(candles2);

                },3000);

            }


            // setTimeout()

            const ws = new WebsocketAPI();
            ws.subscribeOnCandles(currentInstrumentInfo.figi, (candle)=>{
                // console.log(candle);
                newSeries.update({
                    time: Math.floor((+new Date(candle.time)) / 1000),
                    open: candle.o,
                    high: candle.h,
                    low: candle.l,
                    close: candle.c
                });
            });

            window.addEventListener('resize', handleResize);
            return () => {
                ws.unsubscribeFromCandles(currentInstrumentInfo.figi);
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [ candles, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );


    console.log('redraw chart component');
    return (
        <div className={s.chartBox}>
            <ChartHeader />
            <div
                ref={chartContainerRef}
            />
            {/*<button onClick={props.unsubscribeOnAssetData}>Unsubscribe</button>*/}
        </div>
    );
};

export default ChartCandlestick;