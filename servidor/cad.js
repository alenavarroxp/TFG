import { MongoClient } from "mongodb";
export class CAD {
  constructor() {
    this.usuarios = {};
  }

  conectar = async function (callback) {
    try {
      let cad = this;
      let client = new MongoClient(
        "mongodb+srv://root:toor@tfg-cluster.mmbrsju.mongodb.net/?retryWrites=true&w=majority&appName=TFG-Cluster"
      );

      await client.connect();

      const database = client.db("tfgsystem");
      cad.usuarios = database.collection("usuarios");
      callback(database);
    } catch (error) {
      console.error("Error al conectar a la base de datos", error);
    }
  };

  buscar = async function (filtro) {
    if(!this.usuarios || !this.usuarios.findOne()) return null;
    let usuario = await this.usuarios.findOne(filtro);
    return usuario;
  };

  insertar = async function (usuario, callback) {
    try {
      let userInserted = await this.usuarios.insertOne(usuario);
      if (userInserted) {
        console.log("Usuario insertado correctamente");
      }
      callback(userInserted);
    } catch (error) {
      console.error("Error al insertar el usuario", error);
    }
  };

  actualizar = async function (usuario, callback) {
    try {
      console.log("CAD usuario", usuario);

      let userUpdated = await this.usuarios.updateOne(
        { _id: usuario._id },
        { $set: usuario }
      );
      callback(userUpdated);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };
}
