import React, {useState} from "react";
import {connect} from "react-redux";
import SharesNav from "./SharesNav/SharesNav";
import ChartContainer from "./Chart/ChartContainer";
import s from "./Investments.module.css"
import OrderBookInvestments from "./Orderbook/OrderBookInvestments";
import {setActiveTab} from "../../redux/investments-reducer";
import ChartHeader from "./ChartHeader/ChartHeader";


const Investments = (props) => {

    return <div className={s.main}>
        <SharesNav/>
        <div className={s.sectionColumns}>
            <ChartHeader />
            <div>
                {props.activeTab === 'chart' ? <ChartContainer/> : <OrderBookInvestments />}
            </div>
        </div>

        {/*<div style={{display: "block", width:"600px", height:"300px"}}> <App/> </div>*/}
    </div>

}
const mapStateToProps = (state) => ({
    content: state.investments.content,
    activeTab: state.investments.activeTab
})

export default connect(mapStateToProps, {setActiveTab})(Investments);

// export default Investments;