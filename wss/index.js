import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({ port: 3111 });
console.log("Ws gateway started on port 3111");

wss.on('connection', (ws) => {
    console.log("Client connected");
    let apiWsAvailable = false;
    let messagesQueue = [];

    const apiWs = new WebSocket("wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws","http", {
        headers:{
            "Authorization": "Bearer "
        }
    });
    apiWs.onopen = () => {
        console.log("API WS connection opened");
        apiWsAvailable = true;
        messagesQueue = messagesQueue.filter((message) => {
            apiWs.send(message);
            return false;
        })
    }
    apiWs.onclose = () => {
        apiWsAvailable = false;
        console.log("API WS connection closed");
    }
    apiWs.onmessage = (message) => {
        ws.send(message.data);
    }

    ws.onmessage = (message) =>  {
        if(apiWsAvailable) {
            apiWs.send(message.data);
        }else{
            messagesQueue.push(message.data);
        }
    };
    ws.onclose = () => {
        console.log("Client disconnected");
        apiWs.close();
    }

});