import React from "react";
import {connect} from "react-redux";
import {getAccountsList} from "../../redux/investments-reducer";

const Investments = (props) =>{
    return <>
        <div>Investments</div>
        <button onClick={props.getAccountsList}>Test</button>
    </>

}
const mapStateToProps = (state) => ({
    content: state.investments.content
})

export default connect(mapStateToProps, {getAccountsList})(Investments);

// export default Investments;