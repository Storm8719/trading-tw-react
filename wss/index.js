// const WebSocketLib = require('ws');
// const EventEmitter = require('events');

import WebSocket, { WebSocketServer } from 'ws';
import assetRandomDataGenerator from "./asset-generator";

const wss = new WebSocketServer({
    port: 3010,
})

wss.on('connection', (ws, data) => {
    console.log('conncted!');
    ws.on('message', function message(data, isBinary) {

        console.log(JSON.parse(data));
    });
});




const r = new assetRandomDataGenerator();
r.changePriceMaxStep = 1000;
r.highestPrice = 50000;

setInterval(()=>{
    console.log(r.getRandomData());
},50);


//{"s":"ok","t":[1663002120,1663002180,1663002240,1663002300,1663002360,1663002420,1663002480,1663002540,1663002600,1663002660],"c":["0.68886","0.689","0.68899","0.68924","0.6892","0.68944","0.68957","0.68964","0.68965","0.68975"],"o":["0.68919","0.68886","0.68901","0.68898","0.68925","0.68919","0.68939","0.68958","0.68965","0.68968"],"h":["0.68923","0.6891","0.68913","0.68925","0.68926","0.68945","0.6897","0.68973","0.68974","0.6898"],"l":["0.68886","0.68882","0.68894","0.68898","0.68912","0.68919","0.68939","0.68949","0.68954","0.68968"]}