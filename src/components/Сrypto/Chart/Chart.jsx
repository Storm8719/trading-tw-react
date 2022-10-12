import React, {useEffect, useRef, useState} from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import WebsocketAPI from "../../../api/ws";


export const Chart = (props) => {
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
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                grid: {
                    vertLines: {
                        color: 'rgba(42, 46, 57, 0.2)',
                    },
                    horzLines: {
                        color: 'rgba(42, 46, 57, 0.2)',
                    },
                },
                crosshair: {
                    vertLine: {
                        width: 5,
                        color: 'rgba(224, 227, 235, 0.1)',
                        style: 0,
                    },
                    horzLine: {
                        visible: true,
                        labelVisible: true,
                        width: 5,
                        color: 'rgba(224, 227, 235, 0.1)',
                        style: 0,
                    },

                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                },
                width: chartContainerRef.current.clientWidth,
                height: 400,
            });
            console.log('redraw TV chart');
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({
                topColor: 'rgba(38, 198, 218, 0.56)',
                bottomColor: 'rgba(38, 198, 218, 0.04)',
                lineColor: 'rgba(38, 198, 218, 1)',
                lineWidth: 2,
                crossHairMarkerVisible: false,
            });

            const ws = new WebsocketAPI();

            if(!state.initialized){
                props.setCurrentAssetAll(currentAssetId);
                setState({initialized:true});
            }
            newSeries.setData(data);


            ws.subscribeOnAssetData(currentAssetId,(data) => {
                newSeries.update(data);
            });

            window.addEventListener('resize', handleResize);

            return () => {
                ws.unsubscribeOnAssetData(currentAssetId);
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

export default Chart;