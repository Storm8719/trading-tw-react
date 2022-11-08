import axios from "axios";
import {convertOneCandleData, fromTo} from "../helpers/helpers";
import moment from "moment";
import {sandbox_token} from "../config";

const instance = axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:3020',
    // headers:     {
    //     "API-KEY": ""
    // }
});

const openApiSandbox = axios.create({
    withCredentials: false,
    baseURL: 'https://api-invest.tinkoff.ru/openapi/sandbox',
    headers:     {
        "Authorization": `Bearer ${sandbox_token}`
    }
});

export const quotesApi = {
    getQuotes(currency = "USD", assetId = 1){
        return instance.post(`/api`, {action:'getQuotesForAsset', data:{
                currency:currency,
                assetId:assetId
            }})
    },
    getCryptoAssetsList(){
        return instance.get(`/api/get-crypto-assets-list`)
    }
}

export const tinkoffApi = {
    getAccountsList(){
        console.log("1111");
        return "1111";
    },
    async getShares(){
        const shares = await openApiSandbox.get('/market/stocks');
        return shares.data.payload.instruments.filter(i => i.currency === "RUB");
    },
    async getCandles(figi, timeOffset = '-1d', candleInterval = "1min"){
        const candles = await openApiSandbox.get('/market/candles', {params: {figi, ...fromTo(timeOffset), interval:candleInterval}});
        return candles.data.payload.candles.map((e)=>{
            return convertOneCandleData(e);
        });
    },
}

