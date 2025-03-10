const express = require("express");
const app = express();
const PORT = 3040;
const WebSocket = require('ws');

const server = app.listen(PORT, () => {
    console.log("server running");
});

const Wss = new WebSocket.Server({ server });

Wss.on('connection', (ws) => {
    console.log("client connection");

    ws.on('message', (message) => {
        console.log('Receive', message);

        const receiveMessage = message.toString();

        Wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(receiveMessage);
            }
        });
    });

    ws.on('close', () => {
        console.log('client dc');
    });
});

