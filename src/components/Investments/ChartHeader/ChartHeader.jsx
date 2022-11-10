import React from "react";
import AddToFavoriteButton from "./AddToFavoriteButton/AddToFavoriteButton";
import {connect} from "react-redux";
import s from "./ChartHeader.module.css";

const ChartHeader = (props) => {


    const {currentInstrumentInfo} = props;
    if(!currentInstrumentInfo.name) return <div className={s.headerMain}> </div>;
    return <div className={s.headerMain}>
        <span className={s.headerMainText}> <b>{currentInstrumentInfo.name}</b> [{currentInstrumentInfo.ticker}][{currentInstrumentInfo.figi}] </span>
        <AddToFavoriteButton figi={currentInstrumentInfo.figi}/>
    </div>
}

const mapStateToProps = (state) => ({
    currentInstrumentInfo: state.investments.currentInstrumentInfo,
});

export default connect(mapStateToProps, {})(ChartHeader)

