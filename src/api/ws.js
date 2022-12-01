class WebsocketAPI{
    _ws = null;
    wsAvailable = false;
    messagesQueue = [];
    subscribeEventListeners = {
        candle:[],
        orderbook:[],
    };

    constructor() {
        if (!WebsocketAPI._instance) {
            WebsocketAPI._instance = this;
            this.initConnection();
        }
        return WebsocketAPI._instance;
    }

    initConnection() {
        this._ws = new WebSocket('ws://localhost:3111');
        this._ws.onopen = () => {
            this.wsAvailable = true;
            console.log("WS connection opened");
            this.messagesQueue =  this.messagesQueue.filter((message) => {
                this._ws.send(message);
                return false;
            })
        }
        this._ws.onclose = () => {
            console.log("WS connection closed");
            this.wsAvailable = false;
        }

        this._ws.onmessage = (message) => {
            this.routeMessageFromApi(message);
        }
    }

    send(message){
        if (this.wsAvailable){
            this._ws.send(message);
        }else{
            this.messagesQueue.push(message)
        }
    }

    subscribeOnCandles(figi, callbackForCandlesReceive){
        if(!figi) return;
        this.send(`{"event": "candle:subscribe", "figi": "${figi}", "interval": "1min"}`);
        this.subscribeEventListeners.candle.push({figi, callback:callbackForCandlesReceive, unsubscribe:()=>{
                this.send(`{"event": "candle:unsubscribe", "figi": "${figi}", "interval": "1min"}`);
            }});
    }

    unsubscribeFromCandles(figi){
        this.subscribeEventListeners.candle = this.subscribeEventListeners.candle.filter((listener) => {
            if(listener.figi === figi){
                listener.unsubscribe();
                return false;
            }
            return true;
        })
    }

    subscribeOnOrderbook(figi, callbackForOrderbookReceive){
        if(!figi) return;
        this.send(`{"event": "orderbook:subscribe", "figi": "${figi}", "depth": 20}`);
        this.subscribeEventListeners.orderbook.push({figi, callback:callbackForOrderbookReceive, unsubscribe:()=>{
                this.send(`{"event": "orderbook:unsubscribe", "figi": "${figi}", "depth": 20}`);
            }});
    }

    unsubscribeFromOrderbook(figi){
        this.subscribeEventListeners.orderbook = this.subscribeEventListeners.orderbook.filter((listener) => {
            if(listener.figi === figi){
                listener.unsubscribe();
                return false;
            }
            return true;
        })
    }



    routeMessageFromApi(message){
        const data = JSON.parse(message.data);
        // console.log(data)
        switch (data.event){
            case "candle":
                this.subscribeEventListeners.candle.map((listener) => {
                    if(listener.figi === data.payload.figi){
                        listener.callback(data.payload);
                    }
                });
                break;
            case "orderbook":
                this.subscribeEventListeners.orderbook.map((listener) => {
                    if(listener.figi === data.payload.figi){
                        listener.callback(data.payload);
                    }
                });
                break;
        }
    }

}
export default WebsocketAPI;