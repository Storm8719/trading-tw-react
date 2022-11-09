import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({ port: 3111 });

wss.on('connection', (ws) => {
    console.log("Client connected");
    // console.log(ws);

    const apiWs = new WebSocket("wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws","http", {
        headers:{
            "Authorization": "Bearer "
        }
    });
    apiWs.onopen = () => {
        console.log("API WS connection opened");
    }
    apiWs.onclose = () => {
        console.log("API WS connection closed");
    }
    apiWs.onmessage = (message) => {
        ws.send(message.data);
    }

    ws.onmessage = (message) =>  {
        apiWs.send(message.data);
    };
    ws.onclose = () => {
        console.log("Client disconnected");
        apiWs.close();
    }

});