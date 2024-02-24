import http from "http";
import express from "express";
import WebSocketServer from "./servidor/serverSocket.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { Server } from "socket.io";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const ws = new WebSocketServer();

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
// Configura cors para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(express.json());

// Ruta "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/babylon", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "babylon.html"));
});

const io = new Server(httpServer);
// io.listen(httpServer);

ws.start(io);
// Iniciar el servidor
httpServer.listen(5173, () => {
  console.log("Server is running on port 5173");
});
