/* eslint-disable no-undef */
import "babylonjs-loaders";
export class Character {
  constructor(id, position, rotation, color, scene, callback) {
    this.id = id;
    this.mesh = null;
    this.meshes = null;
    this.ellipsoid = null;
    this.animations = {}; // Diccionario para almacenar animaciones
    this.mixer = null;
    this.isMoving = false;
    this.speed = 0;
    this.MAX_SPEED = 0.035;
    this.MIN_SPEED = 0.025;
    this.SPEED_CHANGE = 0.025;
    this.isJumping = false;
    this.jumpSpeed = 0;


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
        console.log("POSITION CAHRATCTER", position, rotation);
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
          color
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
        this.mesh.checkCollisions = true;
        this.mesh.applyGravity = true;

        this.meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
        });

        console.log("MESH", this.mesh);

        this.showBoundingBox(scene, this.mesh);

        if (callback) {
          callback(this);
        }
      }
    );
  }

  showBoundingBox(scene, mesh) {
    //Construir una capsula alrededor del personaje
    this.ellipsoid = new BABYLON.MeshBuilder.CreateCapsule(
      "ellipsoid",
      {
        capSubdivisions: 5,
        subdivisions: 5,
        radius: 0.05,
        height: 0.15,
      },
      scene
    );
    var ellipsoidMaterial = new BABYLON.StandardMaterial(
      "ellipsoidMaterial",
      scene
    );
    ellipsoidMaterial.wireframe = true;
    this.ellipsoid.material = ellipsoidMaterial;

    this.ellipsoid.position = new BABYLON.Vector3(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z
    );

    scene.registerBeforeRender(() => {
      this.ellipsoid.position = new BABYLON.Vector3(
        mesh.position.x,
        mesh.position.y + 0.075,
        mesh.position.z
      );
    });
  }

  playAnimation(animationName) {
    if (this.animations[animationName]) {
      const action = this.animations[animationName];
      if (this.currentAction == action) return;

      // Detener la animación actual antes de reproducir la nueva
      if (this.currentAction) {
        this.currentAction.stop();
      }

      action.start(true, 1.0, action.from, action.to, false);
      this.animationName = animationName;
      this.currentAction = action; // Guardar la referencia a la acción actual
    }
  }

  move(keys, characters, scene) {
    let computedRotation = this.mesh.rotation.z;
    // eslint-disable-next-line no-undef
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
      // eslint-disable-next-line no-undef
      computedMovement = new BABYLON.Vector3(-xMovement, 0, -zMovement);
    } else if (keys["S"]) {
      // eslint-disable-next-line no-undef
      computedMovement = new BABYLON.Vector3(xMovement, 0, zMovement);
    }

    // eslint-disable-next-line no-undef
    this.mesh.position = new BABYLON.Vector3(
      this.mesh.position.x + computedMovement.x,
      this.mesh.position.y + computedMovement.y,
      this.mesh.position.z + computedMovement.z
    );
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

  checkCollisions(newPosition, characters) {
    // Verificar colisiones con el plano
    if (newPosition.y < 0) {
      return true; // Colisión con el suelo, no permitir mover más abajo
    }

    // Verificar colisiones con otros personajes
    for (const character of characters) {
      if (character.id !== this.id) {
        const distanceVector = newPosition.subtract(character.mesh.position);
        const distance = distanceVector.length();

        // Detener el movimiento si hay colisión con otro personaje
        if (distance < 1.5) {
          return true;
        }
      }
    }

    return false; // No hay colisiones
  }

  moveCamera(camera, keys) {
    const lerpFactor = 0.3;
    const distanceFromPlayer = 0.35; // Ajusta esto para cambiar la distancia de la cámara al jugador

    if (keys["W"] || keys["A"] || keys["S"] || keys["D"]) {
      const cameraOffset = new BABYLON.Vector3(
        -distanceFromPlayer * Math.sin(this.mesh.rotation.z + Math.PI),
        0.175,
        -distanceFromPlayer * Math.cos(this.mesh.rotation.z + Math.PI)
      );
      const targetPosition = this.mesh.position.add(cameraOffset);

      // Aplica la interpolación (lerp) para suavizar el seguimiento del jugador
      // eslint-disable-next-line no-undef
      camera.position = BABYLON.Vector3.Lerp(
        camera.position,
        targetPosition,
        lerpFactor
      );
    }
    // Mira al jugador
    camera.position = BABYLON.Vector3.Lerp(
      camera.position,
      this.mesh.position,
      lerpFactor
    );
    camera.setTarget(this.mesh.position);
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

      // Aplicar un impulso en el eje Y para simular el salto
      // eslint-disable-next-line no-undef
      var jumpImpulse = new CANNON.Vec3(0, 25, 0); // Ajusta este valor según sea necesario
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
    this.ellipsoid.dispose();
  }

}
