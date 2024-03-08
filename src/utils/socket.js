import { io } from "socket.io-client";
import { SERVER_URL } from "../config/config.js";


export const socket = io(SERVER_URL);