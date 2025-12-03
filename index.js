const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log("a user connected",socket.id);

    socket.on("message", (data) => {
        console.log("message received:", data);


        io.emit("reply", data);
        //socket.emit("reply", "Message received by server");  // to send back to the same client only
    });
});


server.listen(3000, () => console.log("API connected on post 3000"))


// ws://localhost:3000/socket.io/?EIO=4&transport=websocket