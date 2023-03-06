import React from "react";
import AddToFavoriteButton from "./AddToFavoriteButton/AddToFavoriteButton";
import {connect} from "react-redux";
import s from "./ChartHeader.module.css";
import {setActiveTab} from "../../../redux/investments-reducer";

const ChartHeader = (props) => {


    const {currentInstrumentInfo} = props;
    if (!currentInstrumentInfo.name) return <div className={s.headerMain}>No instrument selected</div>;
    return <div>
        <div className={s.displayTypeButtonsBox}>
            {props.activeTab === 'chart' ? <div className={s.active} onClick={() => {props.setActiveTab('chart')}}>Chart</div> : <div onClick={() => {props.setActiveTab('chart')}}>Chart</div> }
            {props.activeTab === 'orderbook' ? <div className={s.active} onClick={() => {props.setActiveTab('orderbook')}}>Orderbook</div> : <div onClick={() => {props.setActiveTab('orderbook')}}>Orderbook</div> }
        </div>
        <div className={s.headerMain}>
            <span className={s.headerMainText}> <b>{currentInstrumentInfo.name}</b> [{currentInstrumentInfo.ticker}][{currentInstrumentInfo.figi}] </span>
            <AddToFavoriteButton figi={currentInstrumentInfo.figi}/>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    currentInstrumentInfo: state.investments.currentInstrumentInfo,
    activeTab: state.investments.activeTab
});

export default connect(mapStateToProps, {setActiveTab})(ChartHeader)

