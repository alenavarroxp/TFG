/* eslint-disable no-undef */
export class Stand {
  constructor(scene) {
    this.scene = scene;
    this.meshes = null;
    this.stand = null;
    this.exclamation = null;
    this.display = null;
    this.standPlane = null;
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

          // Comprueba si mesh.material es null
          if (mesh.material) {
            // Reducir la reflectividad
            mesh.material.ambientColor = new BABYLON.Color3(0, 0, 0);
            mesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
            mesh.material.metallic = 0;
            mesh.material.roughness = 1;
          }

          if (mesh.name === "Object_4") elements.push(mesh);
          if (mesh.name === "Object_5") this.display = mesh;
        });

        this.createDisplayInfo("No tienes actividades pendientes");
      }
    );

    //Quiero que metas un plano arriba del stand que cubra toda su superficie de arriba
    this.createPlaneSurface(position);
  }

  createPlaneSurface(position) {
    this.standPlane = BABYLON.MeshBuilder.CreateBox(
      "standPlane",
      { width: 0.175  , height: 0.225, depth: 0.25 },
      this.scene
    );

    this.standPlane.position = new BABYLON.Vector3(
      position._x,
      position._y + 0.1,
      position._z
    );

    this.standPlane.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    this.standPlane.physicsImpostor = new BABYLON.PhysicsImpostor(
      this.standPlane,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0 },
      this.scene
    );

    this.standPlane.isVisible = false;
  }

  createDisplayInfo(text) {
    // Eliminar el plano existente si ya existe
    if (this.displayInfo) {
      this.displayInfo.dispose(); // Eliminar el plano existente
    }

    // Crear un plano según las dimensiones del this.display
    this.displayInfo = BABYLON.MeshBuilder.CreatePlane(
      "displayInfo",
      { width: 0.135, height: 0.115 },
      this.scene
    );

    // Crear una textura dinámica
    var dynamicTexture = new BABYLON.DynamicTexture(
      "dynamic texture",
      512,
      this.scene,
      true
    );
    dynamicTexture.hasAlpha = true;

    // Crear un contexto 2D a partir de la textura dinámica
    var ctx = dynamicTexture.getContext();

    // Limpia el contexto
    ctx.clearRect(0, 0, 512, 512);

    // Configurar el estilo del texto
    ctx.font = "bold 45px Helvetica"; // Reducir el tamaño del texto del nombre
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dibujar el texto en el contexto
    // Ajustar el texto y dibujarlo
    const maxWidth = 500; // Ancho máximo para el texto, para mantener un margen
    const lines = this.wrapText(text, ctx, maxWidth);
    const lineHeight = 50; // Aumentar la altura de línea para dar más separación
    const startingY = 256 - ((lines.length - 1) * lineHeight) / 2; // Centrar verticalmente

    lines.forEach((line, index) => {
      ctx.fillText(line, 256, startingY + index * lineHeight);
    });

    // Actualizar la textura
    dynamicTexture.update();

    // Crear un material a partir de la textura
    var planeMaterial = new BABYLON.StandardMaterial(
      "plane material",
      this.scene
    );
    planeMaterial.diffuseTexture = dynamicTexture;
    planeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    planeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    planeMaterial.backFaceCulling = false;
    planeMaterial.diffuseTexture.hasAlpha = true;

    // Aplicar el material al plano
    this.displayInfo.material = planeMaterial;

    // Mantener el plano enfocado hacia la cámara
    this.displayInfo.position = new BABYLON.Vector3(
      this.stand.position.x,
      this.stand.position.y + 0.177,
      this.stand.position.z
    );

    this.displayInfo.rotation = new BABYLON.Vector3(
      //37.5 grados
      Math.PI / 3.43,
      Math.PI / 2 + Math.PI,
      0
    );
  }

  wrapText(text, ctx, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
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
