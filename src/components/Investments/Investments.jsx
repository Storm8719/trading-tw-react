import React from "react";
import {connect} from "react-redux";
import {getAccountsList} from "../../redux/investments-reducer";
import SharesNav from "./SharesNav/SharesNav";
import Chart from "./Chart/Chart";
import s from "./Investments.module.css"


const Investments = (props) =>{


    return <div className={s.main}>
        <SharesNav/>
        <Chart/>
    </div>

}
const mapStateToProps = (state) => ({
    content: state.investments.content
})

export default connect(mapStateToProps, {getAccountsList})(Investments);

// export default Investments;