import moment from "moment";

export const fromTo = (offset, endTimeJsTimestamp = +(new Date())) => {
    const offsetAmount = offset.match(/-\d+/)[0];
    const offsetUnit = offset.replace(offsetAmount, "");
    const [from, to] = [moment(endTimeJsTimestamp).add(offsetAmount, offsetUnit).format('YYYY-MM-DDTHH:mmZ'), moment(endTimeJsTimestamp).format('YYYY-MM-DDTHH:mmZ')];
    return {from, to}
}

export const convertCandlesData = (candlesArr) => {
    candlesArr.map((e) => {
        return convertOneCandleData(e);
    });
}

export const convertOneCandleData = (candle) => {
    return {
        time: Math.floor((+new Date(candle.time)) / 1000),
        open: candle.o,
        high: candle.h,
        low: candle.l,
        close: candle.c
    }
}