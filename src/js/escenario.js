
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
    console.log("NUMBER", number);
    let fileName = "escenario" + number + (number == 1 ? ".gltf" : ".glb");

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

        this.map.checkCollisions = true;
        this.meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
          //   mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
          //     mesh,
          //     BABYLON.PhysicsImpostor.MeshImpostor,
          //     { mass: 0, restitution: 0.9 },
          //     this.scene
          //   );
        });
        console.log("meshes", this.meshes);
      }
    );
  }
  
}
