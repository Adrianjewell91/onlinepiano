const express = require('express');
const port = 3000;

const WebSocket = require('ws');

const server = express().use(express.static('public'))
    .listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log(ws);
    ws.on('message', function incoming(message) {
        console.log('received message: %s', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});