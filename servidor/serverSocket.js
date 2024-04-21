export default function WebSocketServer() {
  this.users = {};
  this.usersWorld = {};
  this.activities = {};

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
        console.log("USERS", this.users);
        console.log("USERS WORLD", this.usersWorld);
        delete this.users[socket.id];

        if (this.usersWorld[socket.id]) {
          delete this.usersWorld[socket.id];
        }

        socket.broadcast.emit("disconnected", socket.id);
      });

      socket.on("changeCamera", () => {
        socket.emit("changeCamera");
      });

      socket.on("newCharacter", (obj) => {
        obj.users = this.users;
        obj.id = socket.id;
        socket.broadcast.emit("newCharacter", obj);
      });

      socket.on("newActivity", (obj) => {
        console.log("Nueva actividad...", obj);
        const activity = this.activities[obj.id];
        console.log("NEW ACTIVITIES", activity);
        if (!activity) {
          const objActivity = {
            [obj.id]: {
              location: obj.location,
            },
          };
          this.activities[obj.id] = objActivity;
        }
        const objSend = {
          [obj.id]: this.activities[obj.id],
        };
        socket.broadcast.emit("newActivity", objSend);
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

      socket.on("move", () => {
        socket.emit("move");
      });

      socket.on("jump", () => {
        socket.emit("jump");
      });

      socket.on("modalActivity", (obj) => {
        socket.emit("modalActivity", obj);
      });

      socket.on("updateActivity", (obj) => {
        this.activities[obj.id] = obj.test;
      });

      socket.on("getActivity", (obj) => {
        console.log("GET ACTIVITY", this.activities[obj.id]);
        const getObj = {
          id: obj.id,
          activity: this.activities[obj.id],
        };
        socket.emit("getActivity", getObj);
      });

      socket.on("setActivity", (obj) => {
        if (
          this.activities[obj.id].location._x != obj.location._x ||
          this.activities[obj.id].location._y != obj.location._y ||
          this.activities[obj.id].location._z != obj.location._z
        ) {
          console.log(
            "UBICACIONES DISTINTAS",
            this.activities[obj.id].location,
            obj.location
          );
          socket.emit("updatePointer", { id: obj.id, location: obj.location });
        }
        const objActivity = {
          course: obj.course,
          subject: obj.subject,
          creador: obj.creador,
          location: obj.location,
          questions: obj.questions,
        };
        this.activities[obj.id] = objActivity;
        console.log("ACTIVITIES UPDATE", this.activities);
      });

      socket.on("startActivity", (obj) => {
        socket.emit("startActivity", obj);
      });

      socket.on("feedbackScene", (score) => {
        socket.emit("feedbackScene",score);
      });

      socket.on("debug", () => {
        socket.emit("debug");
        // socket.emit("feedbackScene");
      });
    });
  };
}
