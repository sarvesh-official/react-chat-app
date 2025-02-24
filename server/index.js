import express from "express";
import { Server } from "socket.io";
import http from "http";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();
const PORT = process.env.PORT || 3001;

const app = express();;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());


io.on("connection",(socket) => {
    console.log("a user connected");
   
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




