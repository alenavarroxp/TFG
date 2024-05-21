import { UserModel } from "./models/userModel.js";

export default function WebSocketServer() {
  this.users = {};
  this.usersWorld = {};
  this.activities = {};
  this.messages = [];

  this.start = function (io, system) {
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

      socket.on("getUser", async (obj) => {
        let user = await system.buscarUsuario(obj);
        if (user) {
          socket.emit("getUser", user);
        } else {
          socket.emit("getUser", null);
        }
      });

      socket.on("disconnect", () => {
        console.log("Se ha desconectado el usuario", socket.id);
        console.log("USERS", this.users);
        console.log("USERS WORLD", this.usersWorld);
        delete this.users[socket.id];

        if (this.usersWorld[socket.id]) {
          delete this.usersWorld[socket.id];
        }

        //Eliminar si el usuario tenía mensajes
        this.messages = this.messages.filter(
          ({ message }) =>
            message.emisorId !== socket.id && message.receptorId !== socket.id
        );
        console.log("MENSJAES ELIMINADOS", this.messages);

        io.emit("getUsers", this.usersWorld);
        socket.broadcast.emit("disconnected", socket.id);
      });

      socket.on("changeCamera", () => {
        socket.emit("changeCamera");
      });

      socket.on("newCharacter", async (obj) => {
        obj.users = this.users;
        obj.id = socket.id;

        const searchUser = {
          userName: obj.user.userName,
          isProfessor: obj.user.isProfessor,
        };
        //
        let usuario = await system.buscarUsuario(searchUser);
        let userIns = null;
        if (usuario) {
          userIns = usuario;
        } else {
          const newUser = new UserModel({
            userName: obj.userName || null,
            isProfessor: obj.isProfessor,
            position: obj.position || null,
            rotation: obj.rotation || null,
            color: obj.color || null,
            accessoryName: obj.accessoryName || null,
            purse: 150,
            colors: obj.color ? [obj.color] : [],
            accessories: obj.accessoryName ? [obj.accessoryName] : [],
          });
          await system.insertarUsuario(newUser);

          let newUserToCreate = {
            id: socket.id,
            userName: obj.userName,
            isProfessor: obj.isProfessor,
            position: obj.position,
            rotation: obj.rotation,
            color: obj.color,
            accessoryName: obj.accessoryName,
          };
          userIns = newUserToCreate;
        }
        userIns.id = socket.id;
        socket.broadcast.emit("newCharacter", userIns);
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

      socket.on("newUserWorld", async (obj) => {
        this.usersWorld[socket.id] = {
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        };

        io.emit("getUsers", this.usersWorld);
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
        socket.emit("feedbackScene", score);
      });

      socket.on("debug", () => {
        socket.emit("debug");
        // socket.emit("feedbackScene");
      });

      socket.on("renderCustomizeScene", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });
        if (usuario) {
          socket.emit("colorAndAccessoryBBDD", {
            color: usuario.color,
            accessoryName: usuario.accessoryName,
          });
        }
        socket.emit("renderCustomizeScene");
      });

      socket.on("customizeCharacter", (obj) => {
        socket.emit("customizeCharacter", obj);
      });

      socket.on("saveCustomizeCharacter", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });
        console.log("USUARIO", usuario);
        console.log("OBJETO", obj);
        if (usuario) {
          usuario.color = obj.color ? obj.color : usuario.color;
          usuario.accessoryName = obj.accessoryName;
          await system.actualizarUsuario(usuario);
          socket.emit("saveCustomizeCharacter", obj);
          socket.broadcast.emit("reloadAvatar", { id: socket.id, obj: obj });
        } else {
          console.log("Usuario no encontrado");
        }
      });

      socket.on("reloadCustomizeCharacter", (obj) => {
        console.log("socket.id", socket.id, "con obj", obj);
        socket.emit("reloadCustomizeCharacter", obj);
      });

      socket.on("saveCharacter", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });

        if (usuario) {
          usuario.color = obj.color;
          usuario.accessoryName = obj.accessoryName;
          await system.actualizarUsuario(usuario);
        }
      });

      socket.on("selectedChatUser", (user) => {
        console.log("selectedChatUser", user);
        socket.emit("selectedChatUser", user);

        const key1 = `${user.emisorId}-${user.receptor.id}`;
        const key2 = `${user.receptor.id}-${user.emisorId}`;
        const filterMessages = this.messages.filter(
          (item) => item.key === key1 || item.key === key2
        );

        console.log("filterMessages", filterMessages);
        io.to(user.emisorId).emit("lastMessages", filterMessages);
      });

      socket.on("chatMessage", (obj) => {
        const message = {
          id: obj.id,
          emisorId: obj.emisorId,
          receptorId: obj.receptorId,
          emisor: obj.emisor,
          receptor: obj.receptor,
          message: obj.message,
          date: obj.date,
        };
        const key = `${obj.emisorId}-${obj.receptorId}`;

        this.messages.push({ key: key, message: message });

        console.log("MESNAGES", this.messages);
        const idReceptor = obj.receptorId;
        io.to(idReceptor).emit("notificationMessage", obj);
        io.emit("chatMessage", obj);
      });

      socket.on("getLastMessages", (obj) => {
        const key1 = `${obj.emisorId}-${obj.receptor.id}`;
        const key2 = `${obj.receptor.id}-${obj.emisorId}`;
        const filterMessages = this.messages.filter(
          (item) => item.key === key1 || item.key === key2
        );
        console.log("filterMessages", filterMessages);
        io.to(obj.emisorId).emit("lastMessages", filterMessages);
      });

      socket.on("getLastMessage", (obj) => {
        console.log;
        const key1 = `${obj.emisorId}-${obj.receptor.id}`;
        const key2 = `${obj.receptor.id}-${obj.emisorId}`;
        const filterMessages = this.messages.filter(
          (item) => item.key === key1 || item.key === key2
        );
        console.log("filterMessages", filterMessages);
        io.to(obj.emisorId).emit("lastMessages", filterMessages);
      });

      socket.on("exitChat", (obj) => {
        console.log("exitChat", obj);
        socket.emit("exitChat", obj);
      });

      socket.on("getMoney", async (obj) => {
        console.log("obj", obj);
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });

        if (usuario) {
          socket.emit("getMoney", usuario.purse);
        } else {
          console.log("Usuario no encontrado");
        }
      });

      socket.on("buyItem", () => {
        socket.emit("buyItem");
      });

      socket.on("saveColor", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.user.userName,
          isProfessor: obj.user.isProfessor,
        });

        console.log("objsaveColor", obj);

        if (usuario) {
          usuario.purse -= obj.color.precio;
          usuario.colors.push(obj.color.color);
          await system.actualizarUsuario(usuario);
          socket.emit("updatePurse", usuario.purse);
          socket.emit("changeTag", obj.color.color);
        }
      });

      socket.on("canShop", (obj) => {
        socket.emit("canShop", obj);
      });

      socket.on("shop", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.user.userName,
          isProfessor: obj.user.isProfessor,
        });

        if (usuario) {
          if (usuario.purse >= obj.precio) {
            socket.emit("shop");
          } else socket.emit("NoMoney");
        }
      });

      socket.on("getColors", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });

        if (usuario) {
          socket.emit("getColors", usuario.colors);
        }
      });

      socket.on("saveAccessory", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.user.userName,
          isProfessor: obj.user.isProfessor,
        });

        console.log("objsaveAccessory", obj);

        if (usuario) {
          usuario.purse -= obj.accessory.precio;
          usuario.accessories.push(obj.accessory.id);
          await system.actualizarUsuario(usuario);
          socket.emit("updatePurse", usuario.purse);
          socket.emit("changeTagAccessory", obj.accessory);
        }
      });

      socket.on("getAccessories", async (obj) => {
        let usuario = await system.buscarUsuario({
          userName: obj.userName,
          isProfessor: obj.isProfessor,
        });

        if (usuario) {
          socket.emit("getAccessories", usuario.accessories);
        }
      });

      socket.on("endActivity", () => {
        socket.emit("endActivity");
      });

      socket.on("plusPurse", async (obj) => {
        console.log("objPurse", obj);
        let usuario = await system.buscarUsuario({
          userName: obj.user.userName,
          isProfessor: obj.user.isProfessor,
        });

        if (usuario) {
          if (obj.score >= 5) {
            usuario.purse += obj.score;
            await system.actualizarUsuario(usuario);
          }
          socket.emit("updatePurse", {
            purse: obj.score,
            totalPurse: usuario.purse,
          });
        }
      });

      socket.on("deleteActivity", (obj) => {
        console.log("DELETE ACTIVITY CON ID", obj.id);
        socket.emit("deleteActivity", obj.id);
      });
    });
  };
}
