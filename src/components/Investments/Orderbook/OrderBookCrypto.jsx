import React, {useState, useEffect} from 'react';
import s from "./OrderbookCrypto.module.css";

const OrderBookCrypto = () => {
    const [orders, setOrders] = useState([]);
    const currencyPair = 'btcusd';

    const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

    useEffect(() => {
        window.live = true;
        const subscribe = {
            event: 'bts:subscribe',
            data: {
                channel: `order_book_${currencyPair}`
            }
        };
        const ws = new WebSocket('wss://ws.bitstamp.net');

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (window.live) {
                setOrders(response.data);
            }
        };
        ws.onclose = () => {
            ws.close();
        };

        return () => {
            ws.close();
        };
    }, [currencyPair]);

    const {bids, asks} = orders;

    const addSumToResult = (arr) => {
        arr.reduce(function (sum, current) {
            const r_sum = +sum + (+current[1]);
            current.push(r_sum);
            return r_sum;
        }, 0);
    }

    if (typeof bids !== "undefined" && typeof asks !== "undefined") {
        addSumToResult(bids);
        addSumToResult(asks);
    }


    const orderBids = (arr) =>
        <>
            <div className={s.valuesBox}>
                <div>Sum</div>
                <div>Value ({currencyArray[1]})</div>
                <div>Amount ({currencyArray[0]})</div>
                <div>Bid</div>
            </div>
            {arr &&
            arr.map((item, index) => (
                <div key={index} className={s.orderLine}>
                    <div className={s.progressBarBoxBids}>
                        <div className={s.progressBar} style={{width: ((item[2] * 90) / arr.at(-1)[2]) + "%"}}> </div>
                    </div>
                    <div className={s.valuesBox}>
                        <div> {item[2].toFixed(2)} </div>
                        <div> {Math.round(item[0] * item[1])} </div>
                        <div> {item[1]} </div>
                        <div> {item[0]} </div>
                    </div>
                </div>
            ))}
        </>

    const orderAsks = (arr) =>
        <>
            <div className={s.valuesBox}>
                <div>Ask</div>
                <div>Amount ({currencyArray[0]})</div>
                <div>Value ({currencyArray[1]})</div>
                <div>Sum</div>
            </div>
            {arr &&
            arr.map((item, index) => (
                <div key={index} className={s.orderLine}>
                    <div className={s.progressBarBoxAsks}>
                        <div className={s.progressBar} style={{width: ((item[2] * 90) / arr.at(-1)[2]) + "%"}}> </div>
                    </div>
                    <div className={s.valuesBox}>
                        <div> {item[0]} </div>
                        <div> {item[1]} </div>
                        <div> {Math.round(item[0] * item[1])} </div>
                        <div> {item[2].toFixed(2)} </div>
                    </div>
                </div>
            ))}
        </>

    return (
        <div className={s.orderContainer}>
            <div className={s.ordersColumn}>
                {orderBids(bids)}
            </div>
            <div className={s.ordersColumn}>
                {orderAsks(asks)}
            </div>
        </div>
    );
};

export default OrderBookCrypto;
