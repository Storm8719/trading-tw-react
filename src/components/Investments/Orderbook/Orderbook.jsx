import React, { useState, useEffect } from 'react';

const OrderBook = () => {
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
            if(window.live){
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

    const { bids, asks } = orders;

    const addSumToResult = (arr) => {
        arr.reduce(function(sum, current) {
            const r_sum = +sum + (+current[1]);
            current.push(r_sum);
            return r_sum;
        }, 0);
    }

    if(typeof bids !== "undefined" && typeof asks !== "undefined"){
        addSumToResult(bids);
        addSumToResult(asks);
    }


    const orderBids = (arr) =>
        arr &&
        arr.map((item, index) => (
            <tr key={index}>
                <td> {item[2].toFixed(2)} </td>
                <td> {Math.round(item[0]*item[1])} </td>
                <td> {item[1]} </td>
                <td> {item[0]} </td>
            </tr>
        ));

    const orderAsks = (arr) =>
        arr &&
        arr.map((item, index) => (
            <tr key={index}>
                <td> {item[0]} </td>
                <td> {item[1]} </td>
                <td> {Math.round(item[0]*item[1])} </td>
                <td> {item[2].toFixed(2)} </td>
            </tr>
        ));
    const orderBidsHead = (title) => (
        <thead>
        <tr>
            <th colSpan="2">{title}</th>
        </tr>
        <tr>
            <th>Sum</th>
            <th>Value ({currencyArray[1]})</th>
            <th>Amount ({currencyArray[0]})</th>
            <th>Bid</th>
        </tr>
        </thead>
    );
    const orderAsksHead = (title) => (
        <thead>
        <tr>
            <th colSpan="2">{title}</th>
        </tr>
        <tr>
            <th>Ask</th>
            <th>Amount ({currencyArray[0]})</th>
            <th>Value ({currencyArray[1]})</th>
            <th>Sum</th>
        </tr>
        </thead>
    );
    return (
        <div className="order-container">
            <table>
                {orderBidsHead('Bids')}
                <tbody>{orderBids(bids)}</tbody>
            </table>

            <table>
                {orderAsksHead('Asks')}
                <tbody>{orderAsks(asks)}</tbody>
            </table>
        </div>
    );
};

export default OrderBook;
