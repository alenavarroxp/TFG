import { CAD } from "./cad.js";

export class System {
  constructor() {
    this.cad = new CAD();
    this.conectar();
  }

  async conectar() {
    await this.cad.conectar(function () {
      console.log("Conectado correctamente a la base de datos");
    });
  }

  async buscarUsuario(obj) {
    console.log("Buscando usuario...", obj)
    let usuario = await this.cad.buscar(obj);
    return usuario;
  }

  async insertarUsuario(obj) {
    console.log("Insertando usuario...", obj);
    await this.cad.insertar(obj, function () {
      console.log("Usuario insertado correctamente");
    });
  }


}
