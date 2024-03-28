import * as BABYLON from "babylonjs";
export class Escenario {
  constructor() {
    this.scene = null;
    this.map = null;
    this.meshes = null;
    this.elements = [];
  }

  initMap(scene, camera, callback) {
    this.scene = scene;
    this.map = this.createMap(camera, callback);
  }

  createMap(camera, callback) {
    let fileName = "aldea_simp_remove.glb";

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
        this.map.name = "escenario";

        this.debugMeshes(this.meshes);

        var houseNames = [
          "a_casas.002",
          "a_casas.016",
          "a_casas.020",
          "a_casas.021",
          "a_casas.056",
        ];
        var visibleMeshNames = [];

        houseNames.forEach((houseName) => {
          for (var i = 0; i <= 8; i++) {
            visibleMeshNames.push(houseName + "_primitive" + i);
          }
        });

        // Agrega los demás nombres de mallas
        visibleMeshNames.push(
          "a_muralla_primitive0",
          "a_muralla_primitive1",
          "a_muralla_primitive2",
          "b_heno.002_primitive0",
          "b_heno.002_primitive1",
          "b_pozos.003_primitive0",
          "b_pozos.003_primitive1",
          "b_pozos.003_primitive2",
          "b_pozos.003_primitive3",
          "b_pozos.003_primitive4",
          "b_pozos.003_primitive5",
          "b_vallas.001"
        );

        this.meshes.forEach((mesh) => {
          if (visibleMeshNames.includes(mesh.name)) {
            // console.log("Mesh name: ", mesh.name);
            mesh.showBoundingBox = true;

            //Si el mesh.name termina en primitive4 o primitive 3 lo añade
            if (
              mesh.name.includes("primitive4") ||
              mesh.name.includes("primitive3") ||
              mesh.name.includes("b_vallas.001") ||
              mesh.name.includes("b_heno.002_primitive0") ||
              mesh.name.includes("b_pozos.003_primitive0")
            ) {
              if (
                mesh.name.includes("b_pozos.003_primitive3") ||
                mesh.name.includes("b_pozos.003_primitive4")
              )
                return;
              mesh.checkCollisions = true;
              mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, restitution: 0.9 },
                this.scene
              );

              this.elements.push(mesh);
            }
          } else {
            mesh.visibility = 0;
          }
        });

        if (callback) {
          callback(this);
        }
      }
    );
  }

  debugMeshes(meshes) {
    this.meshes = meshes.filter((mesh) => {
      return (
        mesh.name !== "0_base" &&
        mesh.name !== "0_suelo" &&
        mesh.name !== "a_agua" &&
        mesh.name !== "a_muralla_primitive0"
      );
    });
  }
}
