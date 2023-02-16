import React from "react";
import dataObj from "./data";
import s from "./Heatmap.module.css";
import HeatmapItem from "./HeatmapItem";
import ReactTooltip from "react-tooltip";


const Heatmap = (props) => {

    let b_width = props.width ? props.width : 1500;
    let b_height = props.height ? props.height : 1000;
    let box_S = b_width * b_height;
    let data = [];
    let askSum = 0;

    for (let key in dataObj.assets) {
        if(dataObj.assets[key].ask !== 0){
            askSum+= dataObj.assets[key].ask;
            data.push({ key, ask: dataObj.assets[key].ask})
        }
    }

    data = data.map((el)=> {
        const percentFromAll = (el.ask / askSum) * 100;
        const el_S  = box_S * (percentFromAll/100);
        return {...el, percentFromAll, el_S};
    });


    data.sort(function (before, after) {
        return after.ask - before.ask;
    });

    let flag = true;

    const calculateOneLine = () => {
        const lineTargetSSum = box_S/4;
        box_S = box_S - lineTargetSSum;
        let lineSSum = 0;
        let lineElements = [];
        while(lineTargetSSum > lineSSum && data.length > 0 && lineElements.length < 5){
            let el = data.shift();
            lineElements.push(el);
            lineSSum+= el.el_S;
        }
        return lineElements;
    }

    const linesArr = [];

    while(data.length > 0){
        linesArr.push(calculateOneLine());
    }

    
    const getJSXforLine = (line) => {
        
        let percentsSumForLine = 0;
        let lineS = 0;
        line.map(el => {
            percentsSumForLine += el.percentFromAll;
            lineS += el.el_S;
        });

        let ribLenght;
        let st;
        if(flag){
            ribLenght = (lineS/b_width).toFixed(7);
            b_height = (b_height - ribLenght).toFixed(7);
            st = {minHeight:ribLenght+"px"};
        }else{
            ribLenght = (lineS/b_height).toFixed(7);
            b_width = (b_width - ribLenght).toFixed(7);
            st = {width:ribLenght+"px"};
        }

        return <div style={st}>
            {line && line.map(el => {
                const itemStyle = flag ? {width:(el.el_S/ribLenght)+"px"} : {minHeight:(el.el_S/ribLenght)+"px"};
                return <HeatmapItem key={el.key} name={el.key} itemStyle={itemStyle} el_S={el.el_S} />
            }
            )}
        </div>
    }

    const drawHeatmap = (linesArr) => {
        const classN = flag ? s.flexRow : s.flexColumn;
        flag = !flag;
        const st = flag ? {} : {};
        if(linesArr.length > 0){
            return <div className={classN} style={st}>{getJSXforLine(linesArr.shift())} {drawHeatmap(linesArr)}</div>
        }
    }


    return <>
        <ReactTooltip clickable={true} />
        <div className={s.box} style={{width:b_width+"px", height:b_height+"px"}}>
            {drawHeatmap(linesArr)}
        </div>
    </>;
}

export default Heatmap;