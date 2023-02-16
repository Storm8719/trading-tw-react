import React from "react";
import s from "./Heatmap.module.css";

const HeatmapItem = (props) => {

    const {itemStyle, name, el_S} = props;

    const getRandomBGColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    return <div className={s.el} style={{ background: getRandomBGColor(), ...itemStyle}}><span className={s.keySpan}>{name} {Math.round(el_S)}</span></div>
}

export default HeatmapItem;