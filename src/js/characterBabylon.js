/* eslint-disable no-undef */
import "babylonjs-loaders";
export class Character {
  constructor(id, position, rotation, user, scene, callback) {
    this.scene = scene;
    this.id = id;
    this.user = user;
    this.mesh = null;
    this.meshes = null;
    this.capsule = null;
    this.displayName = null;
    this.animations = {}; // Diccionario para almacenar animaciones
    this.mixer = null;
    this.isMoving = false;
    this.speed = 0;
    this.MAX_SPEED = 0.035;
    this.MIN_SPEED = 0.025;
    this.SPEED_CHANGE = 0.025;
    this.isJumping = false;
    this.jumpSpeed = 0;
    this.isColliding = false;
    this.oldPosition = new BABYLON.Vector3();
    this.distanceFromPlayer = 0.35;
    this.staticCollision = false;
    this.reward = null;
    this.headAccessory = null;
    this.accessoryName = null;
    this.hexColor = null;

    // console.log("USER en crear personaje", this.user);
    // Carga el modelo GLB utilizando SceneLoader.ImportMesh

    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "character.glb",
      scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.meshes = newMeshes;
        this.mesh = newMeshes[0];

        scene.animationGroups.forEach((animation) => {
          this.animations[animation.name] = animation;
          animation.stop();
        });

        var animating = true;
        const idleAnimation = scene.getAnimationGroupByName(
          "CharacterArmature|Idle"
        );

        if (animating)
          idleAnimation.start(
            true,
            1.0,
            idleAnimation.from,
            idleAnimation.to,
            false
          );
        // Posición y rotación
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        this.mesh.scaling.set(0.05, 0.05, 0.05);
        this.mesh.name = id;
        this.speed = this.SPEED_CHANGE;

        // Cambiar el color de las partes del personaje
        // eslint-disable-next-line no-undef
        const characterMaterial = new BABYLON.StandardMaterial(
          "characterMaterial",
          scene
        );
        // eslint-disable-next-line no-undef
        characterMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
          !this.hexColor
            ? this.user.isProfessor
              ? "#00FF47"
              : "#0094FF"
            : this.hexColor
        );

        const partsToColor = [
          "Body_primitive0",
          "Body_primitive2",
          "Ears",
          "Arms_primitive0",
          "Head_primitive0",
        ];
        this.mesh.getChildMeshes().forEach((object) => {
          if (partsToColor.includes(object.name)) {
            object.material = characterMaterial;
          }
        });

        // this.mesh.checkCollisions = true;
        this.mesh.applyGravity = true;

        this.showBoundingCapsule(scene, this.mesh);

        this.createDisplayName(scene, this.mesh);

        if (callback) {
          callback(this);
        }
      }
    );
  }

  createDisplayName(scene, mesh) {
    // Crear un plano para mostrar el nombre del personaje
    this.displayName = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { size: 0.2 },
      scene
    );

    // Crear una textura dinámica
    var dynamicTexture = new BABYLON.DynamicTexture(
      "dynamic texture",
      512,
      scene,
      true
    );
    dynamicTexture.hasAlpha = true;

    // Crear un contexto 2D a partir de la textura dinámica
    var ctx = dynamicTexture.getContext();

    // Limpia el contexto
    ctx.clearRect(0, 0, 512, 512);

    // Configurar el estilo del texto
    ctx.font = "bold 50px Verdana"; // Reducir el tamaño del texto del nombre
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dibujar el texto del nombre en el contexto
    ctx.fillText(this.user.userName, 256, 240); // Ajustar la posición del texto del nombre

    // Configurar el estilo del texto del rol
    ctx.font = "italic 40px Arial";
    ctx.fillStyle = "white";

    // Dibujar el texto del rol en el contexto
    var role = this.user.isProfessor ? "Profesor" : "Estudiante";
    ctx.fillText(role, 256, 285); // Ajustar la posición del texto del rol

    // Actualizar la textura
    dynamicTexture.update();

    // Crear un material a partir de la textura
    var planeMaterial = new BABYLON.StandardMaterial("plane material", scene);
    planeMaterial.diffuseTexture = dynamicTexture;
    planeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    planeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    planeMaterial.backFaceCulling = false;
    planeMaterial.diffuseTexture.hasAlpha = true;

    // Aplicar el material al plano
    this.displayName.material = planeMaterial;

    // Mantener el plano enfocado hacia la cámara
    scene.registerBeforeRender(() => {
      if (!this.headAccessory && this.mesh && this.displayName)
        this.displayName.position = new BABYLON.Vector3(
          mesh.position.x,
          mesh.position.y + 0.2,
          mesh.position.z
        );

      var camera = scene.activeCamera;
      if (camera && this.displayName) {
        this.displayName.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.displayName.rotation.y = camera.rotation.y;
        this.displayName.rotation.x = camera.rotation.x;
        this.displayName.rotation.z = camera.rotation.z;
      }
    });
  }

  showBoundingCapsule(scene, mesh) {
    //Construir una capsula alrededor del personaje
    this.capsule = new BABYLON.MeshBuilder.CreateCapsule(
      "ellipsoid",
      {
        capSubdivisions: 5,
        subdivisions: 5,
        radius: 0.06,
        height: 0.15,
      },
      scene
    );
    //VER CAPSULA
    // var ellipsoidMaterial = new BABYLON.StandardMaterial(
    //   "ellipsoidMaterial",
    //   scene
    // );
    // ellipsoidMaterial.wireframe = true;
    // this.capsule.material = ellipsoidMaterial;
    this.capsule.checkCollisions = true;
    this.capsule.isVisible = false;

    scene.registerBeforeRender(() => {
      if (this.mesh && this.capsule)
        this.capsule.position = new BABYLON.Vector3(
          mesh.position.x,
          mesh.position.y + 0.075,
          mesh.position.z
        );
    });
  }

  stopAnimation() {
    if (this.currentAction) {
      this.currentAction.stop();
    }
  }

  playAnimation(animationName) {
    if (this.animations[animationName]) {
      const action = this.animations[animationName];
      if (this.currentAction == action) return;

      // Detener la animación actual antes de reproducir la nueva
      this.stopAnimation();

      action.start(true, 1.0, action.from, action.to, false);
      this.animationName = animationName;
      this.currentAction = action; // Guardar la referencia a la acción actual
    }
  }

  move(keys, characters, escenario, scene, activities, socket) {
    if (!this.mesh) return;

    let computedRotation = this.mesh.rotation.z;
    let computedMovement = new BABYLON.Vector3();

    if (keys["A"]) {
      computedRotation -= this.SPEED_CHANGE;
    } else if (keys["D"]) {
      computedRotation += this.SPEED_CHANGE;
    }

    this.smoothRotate(computedRotation, scene);

    const fullCircle = 2 * Math.PI;
    if (computedRotation > fullCircle) {
      computedRotation = fullCircle - computedRotation;
    } else if (computedRotation < 0) {
      computedRotation = fullCircle + computedRotation;
    }

    const movementSpeedFactor = 0.3; // Reduce este valor para hacer el movimiento más lento
    const zMovement =
      this.speed * Math.cos(this.mesh.rotation.z) * movementSpeedFactor;
    const xMovement =
      this.speed * Math.sin(this.mesh.rotation.z) * movementSpeedFactor;

    if (keys["W"]) {
      computedMovement = new BABYLON.Vector3(-xMovement, 0, -zMovement);
    } else if (keys["S"]) {
      computedMovement = new BABYLON.Vector3(xMovement, 0, zMovement);
    }

    const newPosition = this.mesh.position.add(computedMovement);
    const collisionResult = this.checkCollisions(
      scene,
      newPosition,
      this.oldPosition,
      characters,
      escenario,
      activities
    );

    if (!collisionResult) {
      // No hay colisión, el personaje puede moverse libremente
      this.oldPosition = this.mesh.position.clone(); // Actualizamos la posición anterior
      this.mesh.position = newPosition;
    } else if (collisionResult === "scenary_collision") {
      const avoidancePosition = BABYLON.Vector3.Lerp(
        newPosition,
        this.oldPosition,
        0.5
      );
      this.mesh.position = avoidancePosition;
      // TODO: Check "Y" COLLISION (Probably modifying keys)

      keys["W"] = false;
      keys["A"] = false;
      keys["D"] = false;
    } else if (collisionResult.collisionType === "activity_collision") {
      // console.log("Colisión con actividad");
      const avoidancePosition = BABYLON.Vector3.Lerp(
        newPosition,
        this.oldPosition,
        2
      );
      this.mesh.position = avoidancePosition;

      socket.emit("modalActivity", collisionResult.activityId);
      socket.emit("NoMove");
    }

    if (this.headAccessory) {
      this.moveAccessory();
    }
  }

  moveAccessory() {
    this.scene.registerBeforeRender(() => {
      if (this.headAccessory && this.mesh) {
        switch (this.accessoryName) {
          case "sheriffAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.1275,
              this.mesh.position.z
            );
            break;
          case "wizardAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.12,
              this.mesh.position.z
            );
            break;
          case "pirateAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.14,
              this.mesh.position.z
            );
            break;
          default:
            break;
        }
        this.headAccessory.rotation = new BABYLON.Vector3(
          this.mesh.rotation.x,
          this.mesh.rotation.z + Math.PI,
          this.mesh.rotation.y
        );
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  smoothRotate(targetRotation, scene) {
    this.meshes.forEach((mesh) => {
      const currentRotation = mesh.rotation.z;
      const shortestDistance = this.shortestAngleDistance(
        currentRotation,
        targetRotation
      );
      const lerpedRotation = this.lerpAngle(
        currentRotation,
        currentRotation + shortestDistance,
        1
      );

      mesh.rotation.z = lerpedRotation;
    });
  }
  shortestAngleDistance(a, b) {
    const maxAngle = 360; // El máximo valor para ángulos en grados
    const angleDiff = (b - a + maxAngle) % maxAngle;
    return angleDiff > 180 ? angleDiff - maxAngle : angleDiff;
  }

  lerpAngle(a, b, t) {
    const angleDiff = b - a;

    // Ajustar el ángulo a un rango [-PI, PI]
    if (angleDiff > Math.PI) {
      b -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
      b += 2 * Math.PI;
    }

    // Realizar la interpolación lineal
    return a + t * (b - a);
  }

  checkCollisions(
    scene,
    newPosition,
    oldPosition,
    characters,
    escenario,
    activities
  ) {
    // Verificar colisiones con otras cápsulas de personajes
    for (const character of characters) {
      if (!character.capsule) continue;
      if (character.id !== this.id && character.capsule.position) {
        const distanceVector = newPosition.subtract(character.capsule.position);
        const distance = distanceVector.length();
        // Detener el movimiento si hay colisión con otro personaje
        if (distance < 0.12) {
          return true;
        }
      }
    }

    for (const activity of activities) {
      if (activity.element.pointer.intersectsMesh(this.capsule, true)) {
        // console.log("Colisión con actividad", activity);
        return { collisionType: "activity_collision", activityId: activity.id };
      }
    }
    // Verificar colisiones con el escenario pero solo si el personaje se está moviendo. No quiero que me lo deje atrapado en el intersectsMesh
    for (const mesh of escenario.elements) {
      if (mesh.intersectsMesh(this.capsule, true)) {
        return "scenary_collision";
      }
    }
    return false; // No hay colisiones
  }

  moveCamera(scene, camera, keys, escenario) {
    if (!this.mesh) return;

    const moveKeysPressed = keys["W"] || keys["A"] || keys["S"] || keys["D"];

    if (moveKeysPressed) {
      const cameraOffset = new BABYLON.Vector3(
        -this.distanceFromPlayer * Math.sin(this.mesh.rotation.z + Math.PI),
        0.175,
        -this.distanceFromPlayer * Math.cos(this.mesh.rotation.z + Math.PI)
      );
      const targetPosition = this.mesh.position.add(cameraOffset);

      // eslint-disable-next-line no-undef
      if (!this.checkCollisionsCamera(targetPosition, escenario)) {
        camera.position = BABYLON.Vector3.Lerp(
          camera.position,
          targetPosition,
          0.3
        );
        camera.lowerRadiusLimit = 0.85;
        camera.upperRadiusLimit = 0.85;
      } else {
        camera.lowerRadiusLimit = 0.5;
        camera.upperRadiusLimit = 0.5;
      }
    }

    // Mira al jugador
    if (this.checkCollisionsCamera(camera.position, escenario)) {
      this.staticCollision = true;
      // console.log("cameralowerRadiusLimit", camera.upperRadiusLimit);
    } else {
      camera.position = BABYLON.Vector3.Lerp(
        camera.position,
        this.mesh.position,
        0.45
      );
      camera.lowerRadiusLimit = 0.85;
      camera.upperRadiusLimit = 0.85;
    }

    if (this.staticCollision) {
      camera.position = BABYLON.Vector3.Lerp(
        camera.position,
        new BABYLON.Vector3(
          this.mesh.position.x,
          this.mesh.position.y + 5,
          this.mesh.position.z
        ),
        0.1
      );
      setTimeout(() => {
        this.staticCollision = false;
      }, 600);
    }
    camera.setTarget(this.mesh.position);
  }

  checkCollisionsCamera(position, escenario) {
    if (!this.mesh || !position) return false;
    const direction = this.mesh.position.subtract(position).normalize();
    const maxDistance = this.mesh.position.subtract(position).length();
    const ray = new BABYLON.Ray(position, direction, maxDistance);

    const intersectedMeshes = ray.intersectsMeshes(escenario.elements);

    return intersectedMeshes.length > 0;
  }

  increaseSpeed() {
    if (this.speed < this.MAX_SPEED) this.speed += this.SPEED_CHANGE;
  }

  decreaseSpeed() {
    if (this.speed > this.MIN_SPEED) this.speed -= this.SPEED_CHANGE;
  }

  jump() {
    if (!this.isJumping) {
      // Evitar que el personaje salte mientras ya está en el aire
      this.isJumping = true;

      var jumpImpulse = new CANNON.Vec3(0, 30, 0); // Ajusta este valor según sea necesario
      this.mesh.physicsImpostor.physicsBody.applyImpulse(
        jumpImpulse,
        this.mesh.physicsImpostor.physicsBody.position
      );

      // Restablecer el estado del salto después de un tiempo (ajusta según la duración del salto)
      setTimeout(() => {
        this.isJumping = false;
      }, 500); // Restablecer después de 1 segundo (ajusta según sea necesario)
    }
  }

  eliminarMeshes() {
    this.meshes.forEach((mesh) => {
      mesh.dispose();
    });
    this.capsule.dispose();
    this.displayName.dispose();
  }

  doFeedbackAnimation(score) {
    let animations = [];
    if (score >= 5) {
      animations.push("CharacterArmature|Idle_Gun");
      animations.push("CharacterArmature|Idle_Gun");
      animations.push("CharacterArmature|Idle_Gun");
      animations.push("CharacterArmature|Idle_Gun");
    } else {
      animations.push("CharacterArmature|No");
      animations.push("CharacterArmature|Death");
      animations.push("CharacterArmature|Duck");
      animations.push("CharacterArmature|Idle");
    }

    let i = 0;
    setInterval(() => {
      if (animations[i] == "CharacterArmature|Idle_Gun") {
        this.createReward();
      }
      this.playAnimation(animations[i]);
      i++;
      if (i >= animations.length) {
        i = 0; // Reset the index to start from the beginning
      }
    }, 2000);
  }

  createReward = () => {
    if (this.reward) return;
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "coin.glb",
      this.scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.reward = newMeshes[0];
        this.reward.position = new BABYLON.Vector3(
          this.mesh.position.x + 0.035,
          this.mesh.position.y + 0.07,
          this.mesh.position.z - 0.05
        );
        this.reward.scaling.set(0.04, 0.04, 0.04);

        this.scene.registerBeforeRender(() => {
          if (this.reward)
            this.reward.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
        });
      }
    );
  };

  deleteMeshes() {
    if (this.meshes) {
      this.meshes.forEach((mesh) => {
        mesh.dispose();
      });
      this.meshes = null;
    }
    if (this.mesh) {
      this.mesh.dispose();
      this.mesh = null;
    }

    if (this.animations) {
      this.animations = {};
    }
  }

  changeColor = (hexColor, scene) => {
    this.deleteMeshes();
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "character.glb",
      scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.hexColor = hexColor;
        this.meshes = newMeshes;
        this.mesh = newMeshes[0];

        scene.animationGroups.forEach((animation) => {
          this.animations[animation.name] = animation;
          animation.stop();
        });

        var animating = true;
        const idleAnimation = scene.getAnimationGroupByName(
          "CharacterArmature|Idle"
        );

        if (animating)
          idleAnimation.start(
            true,
            1.0,
            idleAnimation.from,
            idleAnimation.to,
            false
          );
        // Posición y rotación
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);
        this.mesh.scaling.set(0.05, 0.05, 0.05);
        this.mesh.name = "customizedCharacter";

        // Cambiar el color de las partes del personaje
        // eslint-disable-next-line no-undef
        const characterMaterial = new BABYLON.StandardMaterial(
          "characterMaterial",
          scene
        );
        // eslint-disable-next-line no-undef
        characterMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
          hexColor
        );

        const partsToColor = [
          "Body_primitive0",
          "Body_primitive2",
          "Ears",
          "Arms_primitive0",
          "Head_primitive0",
        ];
        this.mesh.getChildMeshes().forEach((object) => {
          if (partsToColor.includes(object.name)) {
            object.material = characterMaterial;
          }
        });
      }
    );
  };

  changeAccessory = (accessoryName, scene) => {
    if (this.headAccessory) {
      console.log("ELIMINAR ACCESORIO");
      this.headAccessory.dispose();
    }

    if (this.headAccessory && this.headAccessory.name === accessoryName) {
      console.log("ELIMINAR ACCESORIO (null)");
      this.headAccessory = null;
      return;
    }

    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      `${accessoryName}.glb`,
      scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.accessoryName = accessoryName;
        this.headAccessory = newMeshes[0];
        this.headAccessory.name = accessoryName;
        switch (accessoryName) {
          case "sheriffAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.1275,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.04, 0.04, 0.04);
            break;
          case "wizardAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.12,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.0265, 0.022, 0.0265);
            break;
          case "pirateAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.14,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.0115, 0.0115, 0.0115);
            break;
          default:
            break;
        }

        scene.registerBeforeRender(() => {
          if (this.headAccessory && this.mesh)
            this.displayName.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.22,
              this.mesh.position.z
            );
        });
      }
    );
  };

  reloadColor = (hexColor) => {
    // eslint-disable-next-line no-undef
    const characterMaterial = new BABYLON.StandardMaterial(
      "characterMaterial",
      this.scene
    );
    // eslint-disable-next-line no-undef
    characterMaterial.diffuseColor = new BABYLON.Color3.FromHexString(hexColor);

    const partsToColor = [
      "Body_primitive0",
      "Body_primitive2",
      "Ears",
      "Arms_primitive0",
      "Head_primitive0",
    ];
    this.mesh.getChildMeshes().forEach((object) => {
      if (partsToColor.includes(object.name)) {
        object.material = characterMaterial;
      }
    });
  };

  reloadAccessory = (accessoryName) => {
    if (this.accessoryName === accessoryName) return;
    if (this.headAccessory) {
      this.headAccessory.dispose();
    }

    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      `${accessoryName}.glb`,
      this.scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.accessoryName = accessoryName;
        this.headAccessory = newMeshes[0];
        this.headAccessory.name = accessoryName;
        switch (accessoryName) {
          case "sheriffAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.1275,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.04, 0.04, 0.04);
            break;
          case "wizardAccessory":
            tthis.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.12,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.0265, 0.022, 0.0265);
            break;
          case "pirateAccessory":
            this.headAccessory.position = new BABYLON.Vector3(
              this.mesh.position.x,
              this.mesh.position.y + 0.14,
              this.mesh.position.z
            );
            this.headAccessory.scaling.set(0.0115, 0.0115, 0.0115);
            break;
          default:
            break;
        }

        this.moveAccessory();
      }
    );
  };
}
