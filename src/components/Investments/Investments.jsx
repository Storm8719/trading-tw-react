import React from "react";
import {connect} from "react-redux";
import {getAccountsList} from "../../redux/investments-reducer";
import SharesNav from "./SharesNav/SharesNav";
import ChartContainer from "./Chart/ChartContainer";
import s from "./Investments.module.css"
import OrderBookInvestments from "./Orderbook/OrderBookInvestments";


const Investments = (props) =>{


    return <div className={s.main}>
        <SharesNav/>
        <div className={s.sectionColumns}>
            <ChartContainer/>
            <OrderBookInvestments />
        </div>

        {/*<div style={{display: "block", width:"600px", height:"300px"}}> <App/> </div>*/}
    </div>

}
const mapStateToProps = (state) => ({
    content: state.investments.content
})

export default connect(mapStateToProps, {getAccountsList})(Investments);

// export default Investments;