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
    let fileName = "escenario" + number + (number == 1 ? ".gltf" : ".glb");

    //QUIERO CREAR UNA PARED VERTICAL Y PONERLE COLISIONES
    let box = BABYLON.MeshBuilder.CreateBox(
      "box",
      { height: 10, width: 10, depth: 10 },
      this.scene
    );
    box.position.set(0, 0, 0);
    box.checkCollisions = true;
    box.physicsImpostor = new BABYLON.PhysicsImpostor(
      box,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.9 },
      this.scene
    );

    // BABYLON.SceneLoader.ImportMesh(
    //   "",
    //   "/models/", // en el servidor es solo models/
    //   fileName,
    //   this.scene,
    //   (newMeshes, particleSystems, skeletons) => {
    //     console.log("newMeshes", newMeshes);
    //     console.log("particleSystems", particleSystems);
    //     console.log("skeletons", skeletons);
    //     this.meshes = newMeshes;
    //     this.map = newMeshes[0];
    //     this.map.position.set(0, 0, 0);
    //     this.map.scaling.set(0.1, 0.1, 0.1);
    //     this.map.name = "escenario" + number;

    //     this.map.checkCollisions = true;
    //     let numbers = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67];

    //     this.meshes.forEach((mesh) => {
    //       // Comprueba si el objeto es una instancia de BABYLON.Mesh o una subclase de BABYLON.Mesh
    //       if (mesh instanceof BABYLON.Mesh) {
    //         console.log("ENCONTRADO", mesh);
    //       }
    //     });

    //     console.log("meshes", this.meshes);
    //   }
    // );

    // let mergedMesh = BABYLON.Mesh.MergeMeshes(
    //   this.meshes,
    //   true,
    //   true,
    //   null,
    //   false,
    //   true
    // );
    // mergedMesh.checkCollisions = true;
    // mergedMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
    //   mergedMesh,
    //   BABYLON.PhysicsImpostor.MeshImpostor,
    //   { mass: 0, restitution: 0.9 },
    //   this.scene
    // );
  }

  changeMap(number) {
    this.map.dispose();
    this.map = this.createMap(number);
  }
}
