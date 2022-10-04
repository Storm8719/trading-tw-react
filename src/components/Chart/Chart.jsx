import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import WebsocketAPI from "../../api/ws";
import {updateCurrentAssets} from "../../redux/assets-reducer";
// import {setCurrentAsset, subscribeAcceptData} from "../../redux/chart-reducer";

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
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            console.log('redraw TV chart');
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            const ws = new WebsocketAPI;
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
        </>
    );
};

export default Chart;