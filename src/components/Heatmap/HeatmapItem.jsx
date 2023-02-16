import React from "react";
import s from "./Heatmap.module.css";

const HeatmapItem = (props) => {

    const {itemStyle, name, el_S} = props;

    const getRandomBGColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    return <div data-tip={name} className={s.el} style={{ background: getRandomBGColor(), ...itemStyle}}><span style={{fontSize:(Math.round((el_S/4000)))+'px'}} className={s.keySpan} >{name}</span></div>
}

export default HeatmapItem;