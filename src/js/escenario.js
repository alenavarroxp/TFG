import * as BABYLON from "babylonjs";
export class Escenario {
  constructor() {
    this.scene = null;
    this.map = null;
    this.meshes = null;
  }

  initMap(scene, number) {
    this.scene = scene;
    this.map = this.createMap(number);
  }

  createMap(number) {
    let fileName = "aldea.glb";

    // Limpiar cualquier escenario anterior
    if (this.map) {
      this.map.dispose();
    }

    // Cargar nuevo escenario
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      fileName,
      this.scene,
      (newMeshes) => {
        this.meshes = newMeshes;
        this.map = newMeshes[0];
        this.map.position.set(0, 0, 0);
        this.map.scaling.set(0.1, 0.1, 0.1);
        this.map.name = "escenario" + number;
        console.log("map", this.map);

        this.debugMeshes(this.meshes);

        this.meshes.forEach((mesh) => {
          mesh.showBoundingBox = true;
          mesh.checkCollisions = true;
          
        });
      }
    );
  }

  debugMeshes(meshes) {
    this.meshes = meshes.filter((mesh) => {
      return mesh.name !== "0_base" && mesh.name !== "0_suelo" && mesh.name !== "a_agua" && mesh.name !== "a_muralla_primitive0";
    });
  }
}
