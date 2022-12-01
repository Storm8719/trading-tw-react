import React, {useState, useEffect} from 'react';
import s from "./OrderBookInvestments.module.css";
import {setOrderbookData, subscribeOnOrderbook, unsubscribeOnOrderbook} from "../../../redux/investments-reducer";
import {connect} from "react-redux";


const OrderBookInvestments = (props) => {
    const {currentInstrumentFigi, subscribeOnOrderbook, unsubscribeOnOrderbook, orderbook} = props
    useEffect(
        () => {
            subscribeOnOrderbook(currentInstrumentFigi);
            return () => {
                unsubscribeOnOrderbook(currentInstrumentFigi);
            }
        },
        [currentInstrumentFigi]
    )

    if(!orderbook) return "Loading...";

    const {bids, asks} = orderbook;

    const maxAmount = asks.concat(bids).reduce(function (max, current){
        return current[1] > max ? current[1] : max;
    }, 0)

    const orderBids = (arr, max) =>
        <>
            <div className={s.valuesBox}>
                <div>Value </div>
                <div>Amount</div>
                <div>Bid</div>
            </div>
            {arr &&
            arr.map((item, index) => (
                <div key={index} className={s.orderLine}>
                    <div className={s.progressBarBoxBids}>
                        <div className={s.progressBar} style={{width: ((item[1] * 90) / max) + "%"}}> </div>
                    </div>
                    <div className={s.valuesBox}>
                        <div> {Math.round(item[0] * item[1])} </div>
                        <div> {item[1]} </div>
                        <div> {item[0]} </div>
                    </div>
                </div>
            ))}
        </>

    const orderAsks = (arr, max) =>
        <>
            <div className={s.valuesBox}>
                <div>Ask</div>
                <div>Amount </div>
                <div>Value </div>
            </div>
            {arr &&
            arr.map((item, index) => (
                <div key={index} className={s.orderLine}>
                    <div className={s.progressBarBoxAsks}>
                        <div className={s.progressBar} style={{width: ((item[1] * 90) / max) + "%"}}> </div>
                    </div>
                    <div className={s.valuesBox}>
                        <div> {item[0]} </div>
                        <div> {item[1]} </div>
                        <div> {Math.round(item[0] * item[1])} </div>
                    </div>
                </div>
            ))}
        </>

    return (
        <div className={s.orderContainer}>
            <div className={s.ordersColumn}>
                {orderBids(bids, maxAmount)}
            </div>
            <div className={s.ordersColumn}>
                {orderAsks(asks, maxAmount)}
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    currentInstrumentFigi: state.investments.currentInstrumentInfo.figi,
    orderbook: state.investments.orderbook
});

export default connect(mapStateToProps, {setOrderbookData, subscribeOnOrderbook, unsubscribeOnOrderbook})(OrderBookInvestments);

// export default OrderBookInvestments;