import React, {useEffect} from "react";
import {connect} from "react-redux";
import {removeFavoriteFigi, setFavoriteFigi} from "../../../../redux/investments-reducer";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import s from './AddToFavoriteButton.module.css';
import ReactTooltip from 'react-tooltip';


const AddToFavoriteButton = (props) => {

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [props]);

    if(!props.figi) return null;

    return <>
        <ReactTooltip clickable={true}  place="left" delayUpdate={1000}/>
        {props.figi === props.favoriteFigi
            ? <StarFilled data-tip="Remove from favorite" data-delay-show='300' className={s.star} onClick={ () => {props.removeFavoriteFigi()} } />
            : <StarOutlined data-tip="Make favorite" data-delay-show='300' className={s.star} onClick={ () => {props.setFavoriteFigi(props.figi)} } />
        }
    </>
}

let mapStateToProps = (state) => ({
    favoriteFigi: state.investments.favoriteFigi
});


export default connect(mapStateToProps, {setFavoriteFigi, removeFavoriteFigi})(AddToFavoriteButton);