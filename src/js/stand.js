/* eslint-disable no-undef */
export class Stand {
  constructor(scene) {
    this.scene = scene;
    this.meshes = null;
    this.stand = null;
    this.exclamation = null;
  }

  createStand(position, fileName, elements) {
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      fileName + ".glb",
      this.scene,
      (newMeshes) => {
        this.meshes = newMeshes;
        this.stand = newMeshes[0];
        this.stand.position = new BABYLON.Vector3(
          position._x,
          position._y,
          position._z
        );

        this.stand.scaling.set(0.0125, 0.0125, 0.0125);
        this.stand.name = fileName;

        this.meshes.forEach((mesh) => {
          mesh.showBoundingBox = true;
          mesh.checkCollisions = true;
          mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
            mesh,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.9 },
            this.scene
          );
          if (mesh.name === "Object_4") elements.push(mesh);
        });
      }
    );
  }

  createExclamation() {
    if (this.exclamation) return;

    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "exclamation.glb",
      this.scene,
      (newMeshes) => {
        this.exclamation = newMeshes[0];
        this.exclamation.position = new BABYLON.Vector3(
          this.stand.position.x,
          this.stand.position.y + 0.275,
          this.stand.position.z
        );

        this.exclamation.scaling.set(0.025, 0.025, 0.025);
        this.exclamation.isVisible = false;

        const exclamationMaterial = new BABYLON.StandardMaterial(
          "exclamationMaterial",
          this.scene
        );
        // eslint-disable-next-line no-undef
        exclamationMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
          "#FFD700"
        );

        newMeshes.forEach((mesh) => {
          //Cambiar el color del material
          console.log("mesh.name: ", mesh.name);
          mesh.material = exclamationMaterial;
        });

        this.scene.registerBeforeRender(() => {
          if (this.exclamation)
            this.exclamation.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
        });
      }
    );
  }
}
