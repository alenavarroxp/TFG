/* eslint-disable no-undef */
export class Pointer {
  constructor(scene) {
    this.scene = scene;
    this.meshes = null;
    this.pointer = null;
  }

  createPointer(position) {
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "pointer.glb",
      this.scene,
      (newMeshes) => {
        this.meshes = newMeshes;
        this.pointer = newMeshes[0];
        this.pointer.position = new BABYLON.Vector3(
          position._x,
          position._y,
          position._z
        );
        this.pointer.scaling.set(0.05, 0.05, 0.05);
        this.pointer.name = "pointer";

        this.scene.registerBeforeRender(() => {
          if (this.pointer)
            this.pointer.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
        });
      }
    );
  }

  updateY(position) {
    if (this.pointer)
      this.pointer.position = new BABYLON.Vector3(
        position._x,
        position._y,
        position._z
      );
  }

  dispose() {
    if (this.pointer) {
      this.pointer.dispose();
      this.pointer = null;
    }
  }
}
