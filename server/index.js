import express from "express";
import { Server } from "socket.io";
import http from "http";
import { configDotenv } from "dotenv";
import cors from "cors";
import path from "path";

configDotenv();
const PORT = process.env.PORT || 3001;

const app = express();;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin : "https://react-chat-app-n10q.onrender.com",
        methods: ["GET", "POST"]
    }
});

app.use(cors());


// ---------- Deployment ------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
     });

}

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
