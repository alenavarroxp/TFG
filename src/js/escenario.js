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
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "escenario" + number + ".glb",
      this.scene,
      (newMeshes, particleSystems, skeletons) => {
        this.meshes = newMeshes;
        this.map = newMeshes[0];
        this.map.position.set(0, 0, 0);
        this.map.scaling.set(1, 1, 1);
        this.map.name = "escenario" + number;

        this.map.checkCollisions = true;
        this.meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
        });
        console.log("meshes", this.meshes);
      }
    );
  }

  changeMap(number) {
    this.map.dispose();
    this.map = this.createMap(number);
  }
}
