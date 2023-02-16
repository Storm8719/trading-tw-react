import React, { useEffect } from "react";
import dataObj from "./data";
import s from "./Heatmap.module.css";


let data = [];
let askSum = 0;
for (let key in dataObj.assets) {
    if(dataObj.assets[key].ask !== 0){
        askSum+= dataObj.assets[key].ask;
        data.push({ key, ask: dataObj.assets[key].ask})
    }
}


let b_width = 1500;
let b_height = 1000;
let box_S = b_width * b_height;

data = data.map((el)=> {
    const percentFromAll = (el.ask / askSum) * 100;
    const el_S  = box_S * (percentFromAll/100);
    return {...el, percentFromAll, el_S};
});


const takeOneFourthFromBoxS = () => {
    const oneFourth = box_S/4
    box_S = box_S - oneFourth;
    return oneFourth;
}

const Heatmap = () => {

    // console.log('askSum', askSum);
    data.sort(function (before, after) {
        return after.ask - before.ask;
    });
    console.log(data)
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
    //
    // console.log(percent);
    // console.log(s_summary);
    // console.log(box_S);

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

        console.log(line)
        
        let percentsSumForLine = 0;
        let lineS = 0;
        line.map(el => {
            percentsSumForLine += el.percentFromAll;
            lineS += el.el_S;
        });

        console.log('b_height ', b_height);
        console.log('b_width ', b_width);
        console.log('lineS',lineS);

        let ribLenght;
        let st;
        if(flag){
            ribLenght = (lineS/b_width).toFixed(3);
            b_height = (b_height - ribLenght).toFixed(3);
            st = {height:ribLenght+"px"};
        }else{
            ribLenght = (lineS/b_height).toFixed(3);
            b_width = (b_width - ribLenght).toFixed(3);
            st = {width:ribLenght+"px"};
        }
        // const ribLenght = flag ? () : (lineS/b_height);



        // const st = flag ? {height:ribLenght+"px"} : {width:ribLenght+"px"};


        return <div style={st}>
            {line && line.map(el => {
                console.log(percentsSumForLine);
                const itemStyle = flag ? {width:((el.percentFromAll/percentsSumForLine)*100)+"%"} : {height:((el.percentFromAll/percentsSumForLine)*100)+"%"};
                return <div className={s.el} style={{ background: getRandomBGColor(), ...itemStyle}}><span className={s.keySpan}>{el.key} {Math.round(el.el_S)}</span></div>
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


    return <div className={s.box} style={{width:b_width+"px", height:b_height+"px"}}>
            {drawHeatmap(linesArr)}
        </div>;
}

export default Heatmap;