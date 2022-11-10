import React from "react";
import {connect} from "react-redux";
import {removeFavoriteFigi, setFavoriteFigi} from "../../../redux/investments-reducer";

const AddToFavoriteButton = (props) => {

    if(!props.figi) return "Loading...";

    return <>
        {props.figi === props.favoriteFigi
            ? <div onClick={ () => {props.removeFavoriteFigi()} }>In favorite</div>
            : <div onClick={ () => {props.setFavoriteFigi(props.figi)} }>Add To Favorite</div>
        }
    </>
}

let mapStateToProps = (state) => ({
    favoriteFigi: state.investments.favoriteFigi
});


export default connect(mapStateToProps, {setFavoriteFigi, removeFavoriteFigi})(AddToFavoriteButton);