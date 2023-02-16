import React, { useEffect } from "react";
import dataObj from "./data";
import s from "./Heatmap.module.css";


let data = [];
let askSum = 0;
for (let key in dataObj.assets) {
    askSum+= dataObj.assets[key].ask;
    data.push({ key, ask: dataObj.assets[key].ask})
}
let box_S = 480000;

let b_width = 800;
let b_height = 600;

data = data.map((el)=> {
    const percentFromAll = (el.ask / askSum) * 100;
    const el_S  = box_S * (percentFromAll/100);
    return {...el, percentFromAll, el_S};
});


const takeOneFourthFromBoxS = () => {
    const oneFourth = box_S/3
    box_S = box_S - oneFourth;
    return oneFourth;
}

const Heatmap = () => {

    console.log('askSum', askSum);
    data.sort(function (before, after) {
        return after.ask - before.ask;
    });
    let n = 0;
    data = data.map((el) => {
        n++;
        return {id:n, ...el}
    })
    
    // let percent = 0;
    // let s_summary = 0;
    // data.forEach(el => {
    //     percent+= el.percentFromAll;
    //     s_summary+= el.el_S;
    // });

    let flag = true;

    const calculateOneLine = () => {
        const lineTargetSSum = takeOneFourthFromBoxS();
        let lineSSum = 0;
        let lineElements = [];
        while(lineTargetSSum > lineSSum && data.length > 0 && lineElements.length < 8){
            let el = data.shift();
            lineElements.push(el);
            lineSSum+= el.el_S;
        }
        return lineElements;
    }

    const linesArr = [];
    // data.length = 30;
    while(data.length > 0){
        linesArr.push(calculateOneLine());
        // linesJSX += getJSXforLine(calculateOneLine());
    }

    const getRandomBGColor = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    
    const getJSXforLine = (line) => {
        
        let percentsSumForLine = 0;
        line.map(el => {
            percentsSumForLine += el.percentFromAll;
        })

        const st = flag ? {height:percentsSumForLine+"%"} : {width:percentsSumForLine+"%"};
        return <div style={st}>
            {line && line.map(el => {
                const itemStyle = flag ? {width:((el.percentFromAll/percentsSumForLine)*100)+"%"} : {height:((el.percentFromAll/percentsSumForLine)*100)+"%"};
                return <div className={s.el} style={{ background: getRandomBGColor(), ...itemStyle}}><span className={s.keySpan}>{el.key}</span></div>
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


    return <div className={s.box}>
            {drawHeatmap(linesArr)}
        </div>;
}

export default Heatmap;