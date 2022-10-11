import axios from "axios";


const instance = axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:3020/',
    // headers:     {
    //     "API-KEY": ""
    // }
});

export const quotesApi = {
    getQuotes(currency = "USD", assetId = 1){
        return instance.post(`api`, {action:'getQuotesForAsset', data:{
                currency:currency,
                assetId:assetId
            }})
    },
    getCryptoAssetsList(){
        return instance.get(`api/get-crypto-assets-list`)
    }
}