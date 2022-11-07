import React, {useEffect} from "react";
import {connect} from "react-redux";
import {initializeShares} from "../../../redux/investments-reducer";
import ShareSearchContainer from "./ShareSearch/ShareSearchContainer";
import s from "./SharesNav.module.css";

const SharesNav = (props) => {

    useEffect(()=>{
        props.initializeShares();
    }, [])

    if(!props.shares.length) return 'Loading...';

    return <nav className={s.nav}>

        <ShareSearchContainer/>

        <div className={s.sharesList}>
            {props.shares.map((share) => (
                <div key={share.figi} className={s.shareItem}>
                    <div>{share.name} [{share.ticker}] </div>
                </div>
            ))}
        </div>
    </nav>
}

let mapStateToProps = (state) => ({
    shares : state.investments.shares,
});


export default connect(mapStateToProps, {initializeShares})(SharesNav);
