import React from "react";
import {connect} from "react-redux";
import {getAccountsList} from "../../redux/investments-reducer";
import SharesNav from "./SharesNav/SharesNav";
import Chart from "./Chart/Chart";



const Investments = (props) =>{


    return <>
        <SharesNav/>
        <Chart/>
    </>

}
const mapStateToProps = (state) => ({
    content: state.investments.content
})

export default connect(mapStateToProps, {getAccountsList})(Investments);

// export default Investments;