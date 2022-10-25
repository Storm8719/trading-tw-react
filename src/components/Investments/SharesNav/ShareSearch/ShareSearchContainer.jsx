import ShareSearch from "./ShareSearch";
import React from "react";
import {connect} from "react-redux";
import {setCurrentInstrument} from "../../../../redux/investments-reducer";


let mapStateToProps = (state) => ({
    shares : state.investments.shares,
});

export default connect(mapStateToProps, {setCurrentInstrument})(ShareSearch);