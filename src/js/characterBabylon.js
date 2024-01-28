import "babylonjs-loaders";

export class Character {
  constructor(id, position, rotation, color, scene, callback) {
    this.id = id;
    this.mesh = null;
    this.meshes = null;
    this.animations = {}; // Diccionario para almacenar animaciones
    this.mixer = null;
    this.isMoving = false;

    // Carga el modelo GLB utilizando SceneLoader.ImportMesh
    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "character.glb",
      scene,
      (newMeshes, particleSystems, skeletons) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        console.log("newMeshes", newMeshes);
        this.meshes = newMeshes;
        this.mesh = newMeshes[0];
        console.log("this.mesh", this.mesh);
        console.log("scene", scene);

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
        this.speed = 0.025;

        // Cambiar el color de las partes del personaje
        const characterMaterial = new BABYLON.StandardMaterial(
          "characterMaterial",
          scene
        );
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

        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

        this.meshes.forEach((mesh) => {
          mesh.checkCollisions = true;
        });

        if (callback) {
          callback(this);
        }
      }
    );
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

  moveForward(characters, scene) {
    const newPosition = this.mesh.position.clone();
    newPosition.z += this.speed;

    if (!this.checkCollisions(newPosition, characters)) {
      this.mesh.position.z = newPosition.z;
      this.smoothRotate(Math.PI, scene); // Rotar 180 grados para ir hacia adelante
    }
  }

  moveBackward(characters, scene) {
    const newPosition = this.mesh.position.clone();
    newPosition.z -= this.speed;

    if (!this.checkCollisions(newPosition, characters)) {
      this.mesh.position.z = newPosition.z;
      this.smoothRotate(0, scene); // Rotar 0 grados para ir hacia atrás
    }
  }

  moveLeft(characters, scene) {
    const newPosition = this.mesh.position.clone();
    newPosition.x -= this.speed;

    if (!this.checkCollisions(newPosition, characters)) {
      this.mesh.position.x = newPosition.x;
      this.smoothRotate(Math.PI / 2, scene); // Rotar -90 grados para ir a la izquierda
    }
  }

  moveRight(characters, scene) {
    const newPosition = this.mesh.position.clone();
    newPosition.x += this.speed;

    if (!this.checkCollisions(newPosition, characters)) {
      this.mesh.position.x = newPosition.x;
      this.smoothRotate(-Math.PI / 2, scene); // Rotar 90 grados para ir a la derecha
    }
  }

  move(keys, characters, scene) {
    let computedRotation = this.mesh.rotation.z;
    let computedMovement = new BABYLON.Vector3();

    if (keys["A"]) {
      computedRotation -= this.speed;
    } else if (keys["D"]) {
      computedRotation += this.speed;
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

    this.mesh.position = new BABYLON.Vector3(
      this.mesh.position.x + computedMovement.x,
      this.mesh.position.y + computedMovement.y,
      this.mesh.position.z + computedMovement.z
    );
  }

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

  moveCamera(camera, scene) {
    const lerpFactor = 0.5;
    const distanceFromPlayer = 1.2; // Ajusta esto para cambiar la distancia de la cámara al jugador

    // Calcula la posición deseada de la cámara
    const cameraOffset = new BABYLON.Vector3(
      -distanceFromPlayer * Math.sin(this.mesh.rotation.z + Math.PI),
      0.75,
      -distanceFromPlayer * Math.cos(this.mesh.rotation.z + Math.PI)
    );
    const targetPosition = this.mesh.position.add(cameraOffset);

    const ray = new BABYLON.Ray(
      this.mesh.position,
      this.mesh.position.add(cameraOffset),
      distanceFromPlayer
    );
    const hit = scene.pickWithRay(ray);
    if (!hit.hit) {
      // Aplica la interpolación (lerp) para suavizar el seguimiento del jugador
      camera.position = BABYLON.Vector3.Lerp(
        camera.position,
        targetPosition,
        lerpFactor
      );
    
      // Mira al jugador
      camera.setTarget(this.mesh.position);
    }
  }
}
