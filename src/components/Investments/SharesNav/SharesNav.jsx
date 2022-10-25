import React, {useEffect} from "react";
import {connect} from "react-redux";
import {initializeShares} from "../../../redux/investments-reducer";

const SharesNav = (props) => {


    useEffect(()=>{
        props.initializeShares();
    }, [])

    if(!props.shares.length) return 'Loading...';

    return <nav>
        {props.shares.map((share) => (
            <div key={share.figi}>
                <div>{share.name} ({share.ticker})</div>
                <div>{share.sector}</div>
                <br/>
            </div>
        ))}
    </nav>
}

let mapStateToProps = (state) => ({
    shares : state.investments.shares,
});


export default connect(mapStateToProps, {initializeShares})(SharesNav);
