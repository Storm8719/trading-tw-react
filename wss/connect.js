import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:3010', {
    perMessageDeflate: false
});


ws.on('open', function open() {
    ws.send(JSON.stringify({id:11,data:'eeeeeee---'}));
    setTimeout(()=>{
        ws.send(JSON.stringify({id:1,data:'random'}));
    },1000);
});


// setTimeout(()=>{
//
// },1000)