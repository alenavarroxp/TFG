export default function WebSocketServer() {
  this.users = {};
  this.usersWorld = {};
  this.start = function (io) {
    io.on("connection", (socket) => {
      console.log("Se ha conectado el usuario: " + socket.id);
      socket.emit("init");
      this.users[socket.id] = socket.id;
      console.log("USERS", this.users);
      socket.broadcast.emit("recuperarPersonajes", socket.id);

      socket.on("init", () => {
        socket.emit("init");
      });
      socket.on("disconnect", () => {
        console.log("Se ha desconectado el usuario", socket.id);
        delete this.users[socket.id];

        if (this.usersWorld[socket.id]) {
          delete this.usersWorld[socket.id];
        }

        socket.broadcast.emit("disconnected", socket.id);
      });

      socket.on("newCharacter", (obj) => {
        obj.users = this.users;
        obj.id = socket.id;
        socket.broadcast.emit("newCharacter", obj);
      });

      socket.on("moveCharacter", (obj) => {
        socket.broadcast.emit("moveCharacter", obj);
      });

      socket.on("recuperarPersonajes", (id) => {
        console.log("Recuperando personajes...");
        socket.broadcast.emit("recuperarPersonajes", id);
      });

      socket.on("newUserWorld", (obj) => {
        this.usersWorld[socket.id] = {
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        };
        console.log("USERS ACTUALIZADOS", this.usersWorld);
      });

      socket.on("getUsers", () => {
        socket.emit("getUsers", this.usersWorld);
      });

      socket.on("currentLocation", (socketId) => {
        console.log("Obteniendo ubicación actual...");
        socket.emit("getCurrentLocation", socketId);
      });

      socket.on("getCurrentLocation",(position)=>{
        socket.emit("returnLocation", position);
      })

      socket.on("chooseLocation", () => {
        socket.emit("chooseLocation");
      });

      socket.on("returnChooseLocation", (position) => {
        socket.emit("returnLocation", position);
      });
      
      socket.on("clearPointer", () => {
        console.log("BORRANDO POINTER")
        socket.emit("clearPointer");
      });
    });
  };
}
