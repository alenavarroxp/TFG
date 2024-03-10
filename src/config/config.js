export const SERVER_NAME = window.location.hostname;
export const SERVER_URL = import.meta.env.SERVER_URL || SERVER_NAME === "localhost" ? `http://${SERVER_NAME}:5173` :`https://${SERVER_NAME}`;