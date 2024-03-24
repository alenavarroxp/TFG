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
      socket.broadcast.emit("recuperarActividades");

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

      socket.on("newActivity", (obj) => {
        const objActivity = {
          [obj.id]: {
            location: obj.location,
          },
        };
        socket.broadcast.emit("newActivity", objActivity);
      });

      socket.on("moveCharacter", (obj) => {
        socket.broadcast.emit("moveCharacter", obj);
      });

      socket.on("recuperarPersonajes", (id) => {
        console.log("Recuperando personajes...");
        socket.broadcast.emit("recuperarPersonajes", id);
      });

      socket.on("recuperarActividades", () => {
        console.log("Recuperando actividades...");
        socket.broadcast.emit("recuperarActividades");
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

      socket.on("getCurrentLocation", (position) => {
        socket.emit("returnLocation", { position: position, option: 1 });
      });

      socket.on("chooseLocation", () => {
        socket.emit("chooseLocation");
      });

      socket.on("returnChooseLocation", (position) => {
        socket.emit("returnLocation", { position: position, option: 2 });
      });

      socket.on("clearPointer", () => {
        socket.emit("clearPointer");
      });

      socket.on("returnPointer", (obj) => {
        socket.emit("returnPointer", { id: obj.id, position: obj.position });
      });

      socket.on("createPointer", (obj) => {
        console.log("Creando puntero... PROFESOR", obj);
        socket.emit("createPointer", obj);
        socket.broadcast.emit("newActivity", obj);
      });

      socket.on("NoMove", () => {
        socket.emit("NoMove");
      });
    });
  };
}
