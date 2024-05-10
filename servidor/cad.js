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
    let usuario = await this.usuarios.findOne(filtro);
    return usuario;
  };

  insertar = async function (usuario, callback) {
    try {
      let admin = await this.usuarios.insertOne(usuario);
      if (admin) {
        console.log("Usuario insertado correctamente");
      }
      callback(admin);
    } catch (error) {
      console.error("Error al insertar el usuario", error);
    }
  };
}
