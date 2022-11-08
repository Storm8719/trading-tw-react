import React, {useEffect} from "react";
import {connect} from "react-redux";
import {initializeShares, setCurrentInstrument} from "../../../redux/investments-reducer";
import ShareSearchContainer from "./ShareSearch/ShareSearchContainer";
import s from "./SharesNav.module.css";

const SharesNav = (props) => {

    useEffect(() => {
        props.initializeShares();
    }, [])

    if (!props.shares.length) return 'Loading...';

    return <nav className={s.nav}>

        <ShareSearchContainer/>

        <div className={s.sharesList}>
            {props.shares.map((share) => (
                // {props.currentShareFigi === share.figi ? "active":""}
                    <div key={share.figi} className={props.currentShareFigi === share.figi ? s.current+" "+ s.shareItem : ""+ s.shareItem} onClick={() => {props.setCurrentInstrument(share.figi)}}>
                        <div>{share.name} [{share.ticker}]</div>
                    </div>
            ))}
        </div>
    </nav>
}

let mapStateToProps = (state) => ({
    shares: state.investments.shares,
    currentShareFigi: state.investments.currentInstrumentInfo.figi,
});


export default connect(mapStateToProps, {initializeShares, setCurrentInstrument})(SharesNav);
