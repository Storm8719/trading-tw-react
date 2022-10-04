//Imitation of websocket
class WebsocketAPI{
    isSubscribe = false;
    dataSendInterval = false;
    dataChangingInterval = false;
    assetsList = [
        {id: 1, name: 'AUD/USD', salePrice: 22, buyPrice: 31, status:'plain'},
        {id: 2, name: 'USDT/USD', salePrice: 32, buyPrice: 34, status:'plain'},
        {id: 3, name: 'BTC/USD', salePrice: 12564, buyPrice: 13665, status:'plain'},
        {id: 4, name: 'ETH/USD', salePrice: 2454, buyPrice: 3695, status:'plain'},
        {id: 5, name: 'TRX/USD', salePrice: 1, buyPrice: 2, status:'plain'},
        {id: 6, name: 'BNB/USD', salePrice: 4, buyPrice: 5, status:'plain'},
        {id: 7, name: 'USDC/USD', salePrice: 7, buyPrice: 8, status:'plain'},
    ];

    constructor() {
        if (!WebsocketAPI._instance) {
            WebsocketAPI._instance = this;
        }
        return WebsocketAPI._instance;
    }
    subscribeOnAssets(callbackForData){
        if(!this.isSubscribe){
            this.isSubscribe = true;
            this.startChangingAssetsPrices();
            this.dataSendInterval = setInterval(()=>{
                // let rand = Math.floor(Math.random() * 7) + 1;


                callbackForData(this.assetsList);
            }, 200)
        }
    }
    unsubscribeFromAssets(){
        if(this.dataSendInterval){clearInterval(this.dataSendInterval)}
        this.isSubscribe = false;
    }
    startChangingAssetsPrices(){
        this.dataChangingInterval = setInterval(()=>{
            // console.log('1');
            this.assetsList = this.assetsList.map(e => {
                let newPrice = e.buyPrice;
                if(Math.floor(Math.random() * 2)){
                    if(Math.floor(Math.random() * 2)){
                        newPrice += Math.floor(Math.random() * 10);
                        return {...e, salePrice: newPrice-1, buyPrice: newPrice+1, status:"up"}
                    }else{
                        newPrice -= Math.floor(Math.random() * 10);
                        return {...e, salePrice: newPrice-1, buyPrice: newPrice+1, status:"down"}
                    }
                }else{
                    return {...e, status:'plain'};
                }

            })
        },2000);
    }

}
export default WebsocketAPI;