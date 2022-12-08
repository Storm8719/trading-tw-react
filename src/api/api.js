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
    defaultAccountID: null,
    async getAccountsList(){
        const data = await openApiSandbox.get('/user/accounts');
        if(data.data.payload.accounts.length === 1){
            this.defaultAccountID = data.data.payload.accounts[0].brokerAccountId;
        }
        return data.data.payload.accounts;
    },
    async getShares(){
        const shares = await openApiSandbox.get('/market/stocks');
        return shares.data.payload.instruments.filter(i => i.currency === "RUB");
    },
    async getCandles(figi, timeOffset = '-1d', candleInterval = "1min", endTimeTimestamp = null){
        endTimeTimestamp = endTimeTimestamp ? endTimeTimestamp * 1000 : +(new Date());
        const candles = await openApiSandbox.get('/market/candles', {params: {figi, ...fromTo(timeOffset, endTimeTimestamp), interval:candleInterval}});
        return candles.data.payload.candles.map((e)=>{
            return convertOneCandleData(e);
        });
    },
    async createSandboxAccount(){
        const account = await openApiSandbox.post('/sandbox/register', {"brokerAccountType": "Tinkoff"});
        console.log(account.data.payload);
        return account.data.payload;
    },
    async getCandlesFor3LastDays(figi){//633.291015625 ms first , 503.857177734375 ms then
        console.time('FirstWay');
        return new Promise(function (resolve, reject) {

            let i = 0;

            const promises = [];

            const getPreviousDay = (date = new Date()) => {
                const previous = new Date(date.getTime());
                previous.setDate(date.getDate() - 1);
                promises.push(openApiSandbox.get('/market/candles', {params: {figi, ...fromTo('-1d', previous), interval:'1min'}}));
                i++;
                if (i >= 3) {
                    return false;
                }
                getPreviousDay(previous);
            }
            getPreviousDay();

            Promise.all(promises).then((results) => {
                console.log('results given')
                let candles = [];
                results.reverse().forEach((candlesObj) => {
                    candles = candles.concat(candlesObj.data.candles);
                })
                console.timeEnd('FirstWay');
                resolve(candles);
            }).catch((e) => {
                reject(e)
            })
        });
    }
}